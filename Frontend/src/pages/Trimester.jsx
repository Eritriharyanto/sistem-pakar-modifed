import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

function Trimester() {
  const navigate = useNavigate();
  const [selectedTrimester, setSelectedTrimester] = useState("");
  const [trimesterData, setTrimesterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user_id exists
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      navigate("/FormIdentitas");
      return;
    }

    // Fetch trimester data
    fetchTrimesterData();
  }, [navigate]);

  const fetchTrimesterData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/trimester");
      console.log("Trimester data received:", response.data);
      setTrimesterData(response.data);
    } catch (error) {
      console.error("Error fetching trimester data:", error);
      setError("Gagal memuat data trimester");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrimesterChange = (trimesterId) => {
    // Untuk checkbox behavior - jika sudah terpilih dan diklik lagi, maka unselect
    if (selectedTrimester === trimesterId) {
      setSelectedTrimester("");
    } else {
      setSelectedTrimester(trimesterId);
    }
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTrimester) {
      setError("Mohon pilih trimester");
      return;
    }

    // Simpan trimester_id ke localStorage
    localStorage.setItem("trimester_id", selectedTrimester);

    console.log("Selected trimester:", selectedTrimester);
    navigate("/Diagnosa_1");
  };

  if (isLoading) {
    return (
      <div className='bg-white text-dark'>
        <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
          <h2 className='fw-bold mb-4'>Diagnosis Penyakit</h2>
          <p className='text-muted' style={{ maxWidth: "600px" }}>
            Sebelum diagnosa penyakit ibu hamil, mohon isi form identitas
            terlebih dahulu untuk membantu kami memberikan diagnosis yang lebih
            akurat dan spesifik. Kami akan menjaga semua kerahasiaan informasi
            yang anda berikan dan hanya akan kami gunakan untuk kepentingan
            diagnosis.
          </p>
        </div>
        <div
          className='d-flex justify-content-center align-items-center'
          style={{ height: "400px" }}
        >
          <div className='spinner-border text-danger' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='bg-white text-dark'>
      {/* Header Section */}
      <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
        <h2 className='fw-bold mb-4'>Diagnosis Penyakit</h2>
        <p className='text-muted' style={{ maxWidth: "600px" }}>
          Sebelum diagnosa penyakit ibu hamil, mohon isi form identitas terlebih
          dahulu untuk membantu kami memberikan diagnosis yang lebih akurat dan
          spesifik. Kami akan menjaga semua kerahasiaan informasi yang anda
          berikan dan hanya akan kami gunakan untuk kepentingan diagnosis.
        </p>
      </div>

      {/* Main Section */}
      <main className='container'>
        <section className='py-5 px-3'>
          <h2 className='h5 fw-bold text-center mb-4'>Usia Kehamilan</h2>

          {error && (
            <div className='alert alert-danger text-center' role='alert'>
              {error}
            </div>
          )}

          {trimesterData.length === 0 && !isLoading ? (
            <div className='alert alert-warning text-center' role='alert'>
              Tidak ada data trimester tersedia
            </div>
          ) : (
            <form
              className='mx-auto'
              style={{ maxWidth: "600px" }}
              onSubmit={handleSubmit}
            >
              {trimesterData.map((trimester) => (
                <div
                  key={trimester.id}
                  className='d-flex justify-content-between align-items-center py-2'
                >
                  <label
                    htmlFor={`trimester${trimester.id}`}
                    className='form-label mb-0 small'
                  >
                    {trimester.id}. {trimester.nama_trimester}
                  </label>
                  <input
                    type='checkbox'
                    id={`trimester${trimester.id}`}
                    name='trimester'
                    value={trimester.id}
                    className='form-check-input'
                    checked={selectedTrimester === trimester.id.toString()}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleTrimesterChange(e.target.value);
                      } else {
                        setSelectedTrimester("");
                      }
                    }}
                    disabled={isLoading}
                  />
                </div>
              ))}

              <div className='text-end mt-3'>
                <button
                  type='submit'
                  className='btn btn-danger rounded-pill px-4'
                  disabled={isLoading}
                >
                  {isLoading ? "Memproses..." : "Selanjutnya"}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className='px-3 pb-5 mx-auto' style={{ maxWidth: "600px" }}>
          <h2 className='h5 fw-bold mb-3'>Catatan</h2>
          <p className='text-muted small text-justify'>
            Usia kehamilan yang digunakan dibagi berdasarkan periode 40 minggu
            usia kehamilan atau biasa disebut dengan trimester. Trimester 1
            yaitu pada usia kehamilan 1–13 minggu, trimester 2 pada usia
            kehamilan 14–26 minggu, dan trimester 3 yaitu 27–40 minggu. Pada
            Tabel 3 merupakan data usia kehamilan berdasarkan trimester.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Trimester;
