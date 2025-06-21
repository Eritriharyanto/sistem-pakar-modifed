import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import jsPDF from "jspdf";
import axios from "axios";

const DiagnosisResult = () => {
  const navigate = useNavigate();
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if diagnosis_id exists
    const diagnosisId = localStorage.getItem("diagnosa_id");

    if (!diagnosisId) {
      navigate("/FormIdentitas");
      return;
    }

    // Fetch diagnosis result
    fetchDiagnosisResult(diagnosisId);
  }, [navigate]);

  const fetchDiagnosisResult = async (diagnosisId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/diagnosa/${diagnosisId}`
      );
      setDiagnosisData(response.data);
    } catch (error) {
      console.error("Error fetching diagnosis result:", error);
      setError("Gagal memuat hasil diagnosis");
    } finally {
      setIsLoading(false);
    }
  };

  const getSolutionText = (penyakitName) => {
    const solutions = {
      "Hiperemesis Gravidarum": [
        "Minum air sedikit-sedikit tapi sering untuk mencegah dehidrasi",
        "Konsumsi makanan hambar seperti biskuit kering",
        "Hindari makanan berlemak, pedas, atau berbau tajam",
        "Istirahat cukup dan hindari aktivitas berat",
        "Segera konsultasi ke dokter jika tidak bisa makan atau minum sama sekali",
      ],
      "Abortus Imminens": [
        "Istirahat total (bed rest)",
        "Hindari aktivitas fisik berat dan hubungan seksual",
        "Segera periksa ke dokter untuk evaluasi kondisi kehamilan",
        "Kelola stres dan perbanyak dukungan emosional",
      ],
      "Kehamilan Ektopik": [
        "Segera ke fasilitas kesehatan jika ada gejala mencurigakan",
        "Penanganan medis cepat diperlukan (operasi/laparoskopi)",
        "Lakukan pemeriksaan HCG dan USG transvaginal",
      ],
      Preeklampsia: [
        "Rutin kontrol tekanan darah dan pemeriksaan urine",
        "Istirahat cukup dan hindari stres",
        "Batasi konsumsi garam dan makanan berlemak",
        "Konsultasi rutin dengan dokter kandungan",
      ],
      "Anemia Kehamilan": [
        "Konsumsi makanan kaya zat besi seperti hati ayam, daging merah, dan sayuran hijau",
        "Minum suplemen zat besi sesuai anjuran dokter",
        "Konsumsi vitamin C untuk membantu penyerapan zat besi",
        "Hindari teh/kopi saat makan karena menghambat penyerapan zat besi",
      ],
      "Infeksi Saluran Kemih": [
        "Minum air putih yang banyak (minimal 8 gelas per hari)",
        "Jangan menahan buang air kecil",
        "Bersihkan area kewanitaan dari depan ke belakang",
        "Hindari sabun kewanitaan berpewangi",
        "Segera konsultasi ke dokter untuk pengobatan yang aman",
      ],
      "Plasenta Previa": [
        "Istirahat total jika mengalami perdarahan",
        "Hindari aktivitas fisik dan hubungan seksual",
        "Lakukan USG secara berkala untuk memantau posisi plasenta",
        "Konsultasikan dengan dokter mengenai persiapan persalinan",
      ],
      "Mola Hidatidosa": [
        "Segera lakukan pemeriksaan USG jika dicurigai mola",
        "Lakukan tindakan kuretase oleh tenaga medis",
        "Lakukan pemantauan kadar HCG secara rutin setelah tindakan",
        "Tunda kehamilan berikutnya hingga dokter menyatakan aman",
      ],
      "Diabetes Melitus Gestasional": [
        "Kontrol kadar gula darah secara rutin",
        "Atur pola makan sehat dan rendah gula",
        "Lakukan olahraga ringan seperti jalan kaki secara teratur",
        "Konsultasi dengan dokter atau ahli gizi mengenai menu harian",
      ],
      "Abortus Inkomplit": [
        "Segera periksa ke dokter jika terjadi perdarahan hebat",
        "Dilakukan kuretase atau evakuasi sisa jaringan dalam rahim",
        "Minum antibiotik jika diresepkan dokter untuk mencegah infeksi",
        "Istirahat total dan pantau tanda-tanda syok",
      ],
    };

    return (
      solutions[penyakitName] || [
        "Konsultasi dengan dokter untuk penanganan yang tepat",
        "Jaga pola makan yang sehat dan bergizi",
        "Istirahat yang cukup",
        "Minum air putih yang cukup",
        "Hindari stres berlebihan",
      ]
    );
  };

  const handleDownload = () => {
    if (!diagnosisData) return;

    const { diagnosa, gejala } = diagnosisData;
    const solutions = getSolutionText(diagnosa.nama_penyakit);

    const doc = new jsPDF();
    const margin = 20;
    const maxLineWidth = 170;
    const lineHeight = 8;
    let y = margin;

    // Load logo image
    const logo = new Image();
    logo.src = "/images/logo.png"; // asumsi logo disimpan di public/logo.png

    logo.onload = () => {
      // Tambahkan logo di tengah atas
      const logoWidth = 30;
      const logoHeight = 60;
      const pageWidth = doc.internal.pageSize.getWidth();
      const centerX = (pageWidth - logoWidth) / 2;
      doc.addImage(logo, "PNG", centerX, y, logoWidth, 20);
      y += 30;

      // Judul
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("HASIL DIAGNOSIS PENYAKIT IBU HAMIL", pageWidth / 2, y, {
        align: "center",
      });
      y += lineHeight * 1.5;

      const addSectionTitle = (title) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(title, margin, y);
        y += lineHeight;
        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += lineHeight / 2;
      };

      const addText = (text, bold = false) => {
        doc.setFont("helvetica", bold ? "bold" : "normal");
        const lines = doc.splitTextToSize(text, maxLineWidth);
        lines.forEach((line) => {
          doc.text(line, margin, y);
          y += lineHeight;
          if (y > 280) {
            doc.addPage();
            y = margin;
          }
        });
      };

      // Identitas Pasien
      addSectionTitle("IDENTITAS PASIEN");
      addText(`Nama Lengkap: ${diagnosa.nama}`);
      addText(`Nomor HP: ${diagnosa.no_hp}`);
      addText(`Pekerjaan: ${diagnosa.pekerjaan}`);
      addText(`Alamat: ${diagnosa.alamat}`);
      addText(`Trimester: ${diagnosa.nama_trimester}`);
      y += lineHeight;

      // Gejala
      addSectionTitle("GEJALA YANG DIALAMI");
      gejala.forEach((g) => addText(`- ${g.nama_gejala}`));
      y += lineHeight;

      // Diagnosis
      addSectionTitle("HASIL DIAGNOSIS");
      addText(diagnosa.nama_penyakit, true);
      y += lineHeight;

      // Deskripsi
      addSectionTitle("DESKRIPSI");
      addText(diagnosa.deskripsi);
      y += lineHeight;

      // Solusi
      addSectionTitle("SOLUSI DAN SARAN");
      solutions.forEach((sol, index) => addText(`${index + 1}. ${sol}`));
      y += lineHeight;

      // Tanggal
      addText(
        `Tanggal Diagnosis: ${new Date(
          diagnosa.tanggal_diagnosa
        ).toLocaleDateString("id-ID")}`
      );

      doc.save(`diagnosis-${diagnosa.nama}-${new Date().getTime()}.pdf`);
    };
  };

  if (isLoading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: "400px" }}
      >
        <div className='spinner-border text-danger' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container my-5'>
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      </div>
    );
  }

  if (!diagnosisData) {
    return (
      <div className='container my-5'>
        <div className='alert alert-warning' role='alert'>
          Data diagnosis tidak ditemukan
        </div>
      </div>
    );
  }

  const { diagnosa, gejala } = diagnosisData;
  const solutions = getSolutionText(diagnosa.nama_penyakit);

  return (
    <div className='container my-5'>
      <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
        <h2 className='fw-bold mb-4'>Diagnosis Penyakit</h2>
        <p className='text-muted' style={{ maxWidth: "600px" }}>
          Berikut adalah hasil diagnosis berdasarkan gejala yang Anda alami.
          Hasil ini bersifat sementara dan disarankan untuk tetap berkonsultasi
          dengan dokter spesialis untuk pemeriksaan lebih lanjut.
        </p>
      </div>

      <section className='border-top pt-5'>
        <h3 className='fw-bold'>Hasil Diagnosa</h3>

        <div className='mt-4'>
          <h5 style={{ backgroundColor: "#fef4e9", padding: "1rem" }}>
            Identitas
          </h5>
          <table className='table table-borderless'>
            <tbody>
              <tr>
                <th scope='row'>Nama Lengkap</th>
                <td>{diagnosa.nama}</td>
              </tr>
              <tr>
                <th scope='row'>Nomor HP / Usia Kandungan</th>
                <td>{diagnosa.no_hp}</td>
              </tr>
              <tr>
                <th scope='row'>Pekerjaan</th>
                <td>{diagnosa.pekerjaan}</td>
              </tr>
              <tr>
                <th scope='row'>Alamat</th>
                <td>{diagnosa.alamat}</td>
              </tr>
              <tr>
                <th scope='row'>Trimester</th>
                <td>{diagnosa.nama_trimester}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='mt-4'>
          <h5 style={{ backgroundColor: "#fef4e9", padding: "1rem" }}>
            Gejala yang Dialami
          </h5>
          <ul className='ps-4'>
            {gejala.map((g, index) => (
              <li key={index}>{g.nama_gejala}</li>
            ))}
          </ul>
        </div>

        <div className='mt-4'>
          <h5 style={{ backgroundColor: "#fef4e9", padding: "1rem" }}>
            Penyakit
          </h5>
          <div className='ps-2'>
            <h6 className='fw-bold'>{diagnosa.nama_penyakit}</h6>
            <p className='text-muted'>{diagnosa.deskripsi}</p>
          </div>
        </div>

        <div className='mt-4'>
          <h5 style={{ backgroundColor: "#fef4e9", padding: "1rem" }}>
            Solusi dan Saran
          </h5>
          <ul>
            {solutions.map((solution, index) => (
              <li key={index}>{solution}</li>
            ))}
          </ul>
          <div className='alert alert-info mt-3' role='alert'>
            <strong>Catatan:</strong> Hasil diagnosis ini bersifat sementara
            berdasarkan gejala yang dilaporkan. Disarankan untuk tetap
            berkonsultasi dengan dokter spesialis untuk pemeriksaan dan
            penanganan yang lebih tepat.
          </div>
        </div>

        <div className='d-flex justify-content-between mt-4'>
          <button
            type='button'
            className='btn btn-danger rounded-pill px-4'
            onClick={() => navigate("/Diagnosa_1")}
            disabled={isLoading}
          >
            Kembali ke diagnosa
          </button>

          <button
            className='btn btn-danger rounded-pill px-4'
            onClick={handleDownload}
          >
            Download Hasil
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DiagnosisResult;
