import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

function FormIdentitas() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    no_hp: "",
    pekerjaan: "",
    alamat: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Hapus error saat user mulai mengetik
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Mohon diisi";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/pengguna",
        formData
      );
      console.log("Berhasil kirim identitas:", res.data);

      localStorage.setItem("identitas_user", JSON.stringify(formData));
      localStorage.setItem("user_id", res.data.user_id);

      navigate("/Trimester");
    } catch (err) {
      console.error("Gagal mengirim data identitas:", err);
      setErrors({
        submit: "Terjadi kesalahan saat mengirim data. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
        <h2 className='fw-bold mb-3'>Diagnosis Penyakit</h2>
        <p className='text-muted' style={{ maxWidth: "600px" }}>
          Sebelum melakukan diagnosis penyakit pada ibu hamil, mohon isi form
          identitas terlebih dahulu. Data ini akan membantu sistem memberikan
          hasil diagnosis yang lebih akurat dan tetap kami jaga kerahasiaannya.
        </p>
      </div>

      {/* Form Section */}
      <div className='container py-5'>
        <h3 className='fw-bold mb-4'>Form Identitas</h3>

        {errors.submit && (
          <div className='alert alert-danger'>{errors.submit}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <input
              type='text'
              name='nama'
              placeholder='Nama Lengkap'
              className='form-control rounded-pill shadow-sm'
              value={formData.nama}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.nama && (
              <small className='text-danger'>{errors.nama}</small>
            )}
          </div>

          <div className='mb-3'>
            <input
              type='text'
              name='no_hp'
              placeholder='No. HP'
              className='form-control rounded-pill shadow-sm'
              value={formData.no_hp}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.no_hp && (
              <small className='text-danger'>{errors.no_hp}</small>
            )}
          </div>

          <div className='mb-3'>
            <input
              type='text'
              name='pekerjaan'
              placeholder='Pekerjaan'
              className='form-control rounded-pill shadow-sm'
              value={formData.pekerjaan}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.pekerjaan && (
              <small className='text-danger'>{errors.pekerjaan}</small>
            )}
          </div>

          <div className='mb-3'>
            <input
              type='text'
              name='alamat'
              placeholder='Alamat'
              className='form-control rounded-pill shadow-sm'
              value={formData.alamat}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.alamat && (
              <small className='text-danger'>{errors.alamat}</small>
            )}
          </div>

          <button
            type='submit'
            className='btn btn-danger px-4 py-2 rounded-pill'
            disabled={isLoading}
          >
            {isLoading ? "Menyimpan..." : "Selanjutnya"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default FormIdentitas;
