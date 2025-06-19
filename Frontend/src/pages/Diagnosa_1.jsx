import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

function Diagnosa() {
  const navigate = useNavigate();
  const [gejalaData, setGejalaData] = useState([]);
  const [gejala, setGejala] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const trimesterId = localStorage.getItem("trimester_id");

    if (!userId || !trimesterId) {
      navigate("/FormIdentitas");
      return;
    }

    fetchGejalaData();
  }, [navigate]);

  const fetchGejalaData = async () => {
    try {
      setIsLoading(true);
      const trimesterId = localStorage.getItem("trimester_id"); // Ambil ID trimester dari localStorage

      const response = await axios.get(
        `http://localhost:5000/api/gejala/trimester/${trimesterId}` // Endpoint khusus
      );
      setGejalaData(response.data);
    } catch (error) {
      console.error("Error fetching gejala data:", error);
      setError("Gagal memuat data gejala");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (gejalaId, value) => {
    setGejala((prev) => ({ ...prev, [gejalaId]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const selectedGejala = gejalaData
      .filter((item) => gejala[item.id] === "ya")
      .map((item) => item.id);

    if (selectedGejala.length === 0) {
      setError("Mohon pilih minimal satu gejala");
      setIsLoading(false);
      return;
    }

    const userId = localStorage.getItem("user_id");
    const trimesterId = localStorage.getItem("trimester_id");

    // ✅ PERBAIKAN ADA DI SINI
    const diagnosisData = {
      user_id: parseInt(userId),
      trimester_id: parseInt(trimesterId),
      gejala: selectedGejala,
    };

    console.log("KIRIM KE BACKEND:", diagnosisData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/diagnosa",
        diagnosisData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        localStorage.setItem("diagnosa_id", response.data.diagnosa_id);
        localStorage.setItem(
          "diagnosis_result",
          JSON.stringify(response.data.hasil)
        );
        navigate("/Hasil");
      }
    } catch (error) {
      console.error("Error creating diagnosis:", error);
      setError("Terjadi kesalahan saat memproses diagnosis.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && gejalaData.length === 0) {
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

  return (
    <div className='bg-white text-dark'>
      <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
        <h2 className='fw-bold mb-4'>Diagnosis Penyakit</h2>
        <p className='text-muted' style={{ maxWidth: "600px" }}>
          Silakan pilih gejala yang dirasakan untuk membantu kami memberikan
          diagnosis yang lebih akurat dan spesifik.
        </p>
      </div>

      <main className='container py-4'>
        {error && (
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {gejalaData.map((item, i) => (
            <div
              className='row align-items-center border-bottom py-2'
              key={item.id}
            >
              <div className='col-12 col-md-6 mb-2 mb-md-0'>
                {`${i + 1}. ${item.nama_gejala}`}
              </div>
              <div className='col-6 col-md-3 text-start text-md-center'>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name={`gejala-${item.id}`}
                    value='ya'
                    checked={gejala[item.id] === "ya"}
                    onChange={() => handleChange(item.id, "ya")}
                    id={`ya-${item.id}`}
                    disabled={isLoading}
                  />
                  <label className='form-check-label' htmlFor={`ya-${item.id}`}>
                    Ya
                  </label>
                </div>
              </div>
              <div className='col-6 col-md-3 text-start text-md-center'>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name={`gejala-${item.id}`}
                    value='tidak'
                    checked={gejala[item.id] === "tidak"}
                    onChange={() => handleChange(item.id, "tidak")}
                    id={`tidak-${item.id}`}
                    disabled={isLoading}
                  />
                  <label
                    className='form-check-label'
                    htmlFor={`tidak-${item.id}`}
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>
          ))}

          <div className='d-flex justify-content-between mt-4'>
            <button
              type='button'
              className='btn btn-danger rounded-pill px-4'
              onClick={() => navigate("/Trimester")}
              disabled={isLoading}
            >
              Kembali ke Trimester
            </button>

            <button
              type='submit'
              className='btn btn-danger rounded-pill px-4'
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Proses Diagnosis"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Diagnosa;
