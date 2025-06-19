from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime
import logging

app = Flask(__name__)
CORS(app)

# Konfigurasi database
DB_CONFIG = {
  'host': 'localhost',
  'user': 'root',
  'password': 'qwertyuiop890',
  'database': 'sitem_pakar',
  'charset': 'utf8mb4'
}

logging.basicConfig(level=logging.DEBUG)

def get_db_connection():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except mysql.connector.Error as e:
        app.logger.error(f"Database connection error: {e}")
        return None

# Algoritma Forward Chaining
def forward_chaining(gejala_terpilih, trimester_id):
    try:
        connection = get_db_connection()
        if not connection:
            return None
            
        cursor = connection.cursor(dictionary=True)
        
        query = """
        SELECT a.id_penyakit, a.id_gejala, p.nama_penyakit, p.deskripsi, p.kode
        FROM aturan a
        JOIN penyakit p ON a.id_penyakit = p.id
        WHERE a.id_trimester = %s
        """
        cursor.execute(query, (trimester_id,))
        rules = cursor.fetchall()

        penyakit_rules = {}
        for rule in rules:
            penyakit_id = rule['id_penyakit']
            if penyakit_id not in penyakit_rules:
                penyakit_rules[penyakit_id] = {
                    'nama': rule['nama_penyakit'],
                    'deskripsi': rule['deskripsi'],
                    'kode': rule['kode'],
                    'gejala_required': [],
                    'match_count': 0
                }
            penyakit_rules[penyakit_id]['gejala_required'].append(rule['id_gejala'])

        best_match = None
        highest_percentage = 0
        
        for penyakit_id, penyakit_data in penyakit_rules.items():
            gejala_required = set(penyakit_data['gejala_required'])
            gejala_matched = gejala_required.intersection(set(gejala_terpilih))
            if len(gejala_matched) > 0:
                match_percentage = (len(gejala_matched) / len(gejala_required)) * 100
                if match_percentage > highest_percentage:
                    highest_percentage = match_percentage
                    best_match = {
                        'id': penyakit_id,
                        'nama': penyakit_data['nama'],
                        'deskripsi': penyakit_data['deskripsi'],
                        'kode': penyakit_data['kode'],
                        'persentase': round(match_percentage, 2),
                        'gejala_matched': len(gejala_matched),
                        'total_gejala': len(gejala_required)
                    }

        cursor.close()
        connection.close()
        return best_match
        
    except Exception as e:
        app.logger.error(f"Error in forward chaining: {e}")
        return None

@app.route('/api/pengguna', methods=['POST'])
def create_pengguna():
    try:
        data = request.get_json()
        required_fields = ['nama', 'no_hp', 'pekerjaan', 'alamat']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Field {field} is required'}), 400
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
            
        cursor = connection.cursor()
        query = """
        INSERT INTO pengguna (nama, no_hp, pekerjaan, alamat) 
        VALUES (%s, %s, %s, %s)
        """
        values = (
            data['nama'],
            data.get('no_hp', ''), 
            data['pekerjaan'],
            data['alamat']
        )
        cursor.execute(query, values)
        connection.commit()
        user_id = cursor.lastrowid

        cursor.close()
        connection.close()
        return jsonify({'message': 'User created successfully', 'user_id': user_id}), 201
        
    except Exception as e:
        app.logger.error(f"Error creating user: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/trimester', methods=['GET'])
def get_trimester():
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
            
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM trimester ORDER BY id")
        trimester_data = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(trimester_data), 200
        
    except Exception as e:
        app.logger.error(f"Error getting trimester: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/gejala', methods=['GET'])
def get_gejala():
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
            
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM gejala ORDER BY id")
        gejala_data = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(gejala_data), 200
        
    except Exception as e:
        app.logger.error(f"Error getting gejala: {e}")
        return jsonify({'error': 'Internal server error'}), 500


# ✅ Tambahan: Endpoint gejala berdasarkan trimester
@app.route('/api/gejala/trimester/<int:trimester_id>', methods=['GET'])
def get_gejala_by_trimester(trimester_id):
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = connection.cursor(dictionary=True)
        query = """
        SELECT DISTINCT g.id, g.kode_gejala, g.nama_gejala
        FROM aturan a
        JOIN gejala g ON a.id_gejala = g.id
        WHERE a.id_trimester = %s
        ORDER BY g.id
        """
        cursor.execute(query, (trimester_id,))
        gejala_trimester = cursor.fetchall()

        cursor.close()
        connection.close()
        return jsonify(gejala_trimester), 200

    except Exception as e:
        app.logger.error(f"Error getting gejala per trimester: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/diagnosa', methods=['POST'])
def create_diagnosa():
    try:
        data = request.get_json()
        if 'user_id' not in data or 'trimester_id' not in data or 'gejala' not in data:
            return jsonify({'error': 'Missing required fields'}), 400
        
        user_id = data['user_id']
        trimester_id = data['trimester_id']
        gejala_terpilih = [int(g) for g in data['gejala'] if g]
        if not gejala_terpilih:
            return jsonify({'error': 'No symptoms selected'}), 400
        
        hasil_diagnosa = forward_chaining(gejala_terpilih, trimester_id)
        if not hasil_diagnosa:
            return jsonify({'error': 'No diagnosis found'}), 404
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
            
        cursor = connection.cursor()
        query = """
        INSERT INTO diagnosa (id_pengguna, id_trimester, id_penyakit, tanggal_diagnosa) 
        VALUES (%s, %s, %s, %s)
        """
        values = (user_id, trimester_id, hasil_diagnosa['id'], datetime.now().date())
        cursor.execute(query, values)
        diagnosa_id = cursor.lastrowid

        for gejala_id in gejala_terpilih:
            cursor.execute("INSERT INTO diagnosis_gejala (id_diagnosa, id_gejala) VALUES (%s, %s)", (diagnosa_id, gejala_id))

        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({
            'message': 'Diagnosis created successfully',
            'diagnosa_id': diagnosa_id,
            'hasil': hasil_diagnosa
        }), 201
        
    except Exception as e:
        app.logger.error(f"Error creating diagnosis: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# ... (semua kode sebelumnya tetap sama, tidak diubah)

@app.route('/api/diagnosa/<int:diagnosa_id>', methods=['GET'])
def get_diagnosa(diagnosa_id):
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = connection.cursor(dictionary=True)
        query = """
        SELECT d.*, p.nama, p.no_hp, p.pekerjaan, p.alamat,
               pe.nama_penyakit, pe.deskripsi, pe.kode,
               t.nama_trimester
        FROM diagnosa d
        JOIN pengguna p ON d.id_pengguna = p.id
        JOIN penyakit pe ON d.id_penyakit = pe.id
        JOIN trimester t ON d.id_trimester = t.id
        WHERE d.id = %s
        """
        cursor.execute(query, (diagnosa_id,))
        diagnosa_data = cursor.fetchone()
        if not diagnosa_data:
            return jsonify({'error': 'Diagnosis not found'}), 404

        query_gejala = """
        SELECT g.nama_gejala, g.kode_gejala
        FROM diagnosis_gejala dg
        JOIN gejala g ON dg.id_gejala = g.id
        WHERE dg.id_diagnosa = %s
        """
        cursor.execute(query_gejala, (diagnosa_id,))
        gejala_data = cursor.fetchall()

        cursor.close()
        connection.close()
        return jsonify({'diagnosa': diagnosa_data, 'gejala': gejala_data}), 200
        
    except Exception as e:
        app.logger.error(f"Error getting diagnosis: {e}")
        return jsonify({'error': 'Internal server error'}), 500


# ✅ PENAMBAHAN BARU: Gabungan penyakit & gejala per trimester
@app.route('/api/penyakit-gejala/trimester/<int:trimester_id>', methods=['GET'])
def get_penyakit_dan_gejala_by_trimester(trimester_id):
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT 
            p.id AS id_penyakit,
            p.kode AS kode_penyakit,
            p.nama_penyakit,
            p.deskripsi,
            g.id AS id_gejala,
            g.kode_gejala,
            g.nama_gejala
        FROM aturan a
        JOIN penyakit p ON a.id_penyakit = p.id
        JOIN gejala g ON a.id_gejala = g.id
        WHERE a.id_trimester = %s
        ORDER BY p.id, g.id
        """
        cursor.execute(query, (trimester_id,))
        data = cursor.fetchall()

        hasil = {}
        for row in data:
            pid = row['id_penyakit']
            if pid not in hasil:
                hasil[pid] = {
                    'id': pid,
                    'kode': row['kode_penyakit'],
                    'nama_penyakit': row['nama_penyakit'],
                    'deskripsi': row['deskripsi'],
                    'gejala': []
                }
            hasil[pid]['gejala'].append({
                'id': row['id_gejala'],
                'kode': row['kode_gejala'],
                'nama': row['nama_gejala']
            })

        cursor.close()
        connection.close()
        return jsonify(list(hasil.values())), 200

    except Exception as e:
        app.logger.error(f"Error getting penyakit dan gejala per trimester: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/api/test', methods=['GET'])
def test_connection():
    return jsonify({'message': 'API is working!', 'timestamp': datetime.now().isoformat()}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
