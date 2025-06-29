# 🧠 Sistem Pakar Kehamilan

Sistem pakar berbasis web untuk mendiagnosa penyakit pada ibu hamil menggunakan metode **Forward Chaining**, dengan antarmuka modern dan mudah digunakan.

**JIKA INGIN MELIHAT STRUKTUR FOLDER NYA, TAMBAHKAN 1S DI LINK GITHUBNYA. MISALNYA https://github1s.com/Eritriharyanto/sistem-pakar-modifed**


## 📁 Struktur Proyek

```bash
Backend/
├── .gitignore
├── app.py              # untuk menjalankan backend
├── migrations.sql      # isi dari pembuatan database
├── requirements.txt    # perintah instal sebelum menjalankan database
```

```bash
Frontend/
├── /node_modules
├── /public
├── /src
    ├── /assets
    ├── /components
        ├── Footer.jsx
        ├── Navbar.jsx
    ├── /pages
        ├── Artikel_1.jsx
        ├── Artikel_2.jsx
        ├── Artikel.jsx
        ├── Diagnosa_1.jsx
        ├── FormIdentitas.jsx
        ├── Hasil.jsx
        ├── Home.jsx
        ├── Kalender_Kehamilan.jsx
        ├── NoPage.jsx
        ├── Trimester.jsx
    ├── App.css
    ├── App.jsx
    ├── main.jsx
```

## Fitur
- ✅ Input data identitas pengguna
- ✅ Pemilihan trimester kehamilan (1, 2, atau 3)
- ✅ Input gejala-gejala yang dialami
- ✅ Diagnosis penyakit berdasarkan gejala dan trimester
- ✅ Solusi dan saran yang ditampilkan otomatis
- ✅ Hasil dapat diunduh sebagai PDF


## 🛠️ Teknologi yang Digunakan

### Frontend (React.js + Vite)
- React 18+
- Axios
- jsPDF (untuk cetak PDF)
- Bootstrap / AOS untuk tampilan
- Routing dengan React Router

### Backend (Python Flask)
- Flask
- MySQL Connector
- REST API
- CORS Enabled

## Cara Menjalankan
### Frontend
```bash
cd Frontend
npm install
npm run dev
```
### Backend
```bash
cd Backend
pip install -r requirements.txt
python app.py
```

## 🗃️ Database
```bash
gejala
penyakit
trimester
pengguna
diagnosa
diagnosis_gejala
aturan
```
## Metode Forward Cahining
```bash
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
```

## Endpoint Gejala Per Trimester
``` python
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
```

## Gabungan Gejala dan Penyakit per Trimester
``` python
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
```

## Manambakan Kode di Diagnosa_1.jsx Agar bisa Mengambil Gejala dan Penyakit per Trimester
```jsx
const fetchGejalaData = async () => {
  try {
    setIsLoading(true);
    const trimesterId = localStorage.getItem("trimester_id");

    const response = await axios.get(
      `http://localhost:5000/api/gejala/trimester/${trimesterId}`
    );
    setGejalaData(response.data);
  } catch (error) {
    console.error("Error fetching gejala data:", error);
    setError("Gagal memuat data gejala");
  } finally {
    setIsLoading(false);
  }
};
```