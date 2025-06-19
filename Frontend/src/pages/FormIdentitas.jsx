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
    const res = await axios.post("http://localhost:5000/api/pengguna", formData);
    console.log("Berhasil kirim identitas:", res.data);

    localStorage.setItem("identitas_user", JSON.stringify(formData));
    localStorage.setItem("user_id", res.data.user_id); // ✅ FIXED: gunakan res.data

    navigate("/Trimester");
  } catch (err) {
    console.error("Gagal mengirim data identitas:", err);
  }
};

  return (
    <div>
      <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
        <h2 className='fw-bold mb-4'>Diagnosis Penyakit</h2>
        <p className='text-muted' style={{ maxWidth: "600px" }}>
          Sebelum diagnosa penyakit ibu hamil, mohon isi form identitas terlebih
          dahulu untuk membantu kami memberikan diagnosis yang lebih akurat dan
          spesifik. Kami akan menjaga semua kerahasiaan informasi yang anda
          berikan dan hanya akan kami gunakan untuk kepentingan diagnosis.
        </p>
      </div>

      <div className='p-4'>
        <h2 className='fw-bold mb-3'>Form Identitas</h2>

        {errors.submit && (
          <div className='alert alert-danger' role='alert'>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control rounded-pill shadow-sm'
              name='nama'
              placeholder='Nama Lengkap'
              value={formData.nama}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.nama && (
              <small style={{ color: "red" }}>{errors.nama}</small>
            )}
          </div>

          <div className='mb-3'>
            <input
              type='text'
              className='form-control rounded-pill shadow-sm'
              name='no_hp'
              placeholder='no_hp'
              value={formData.no_hp}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.no_hp && (
              <small style={{ color: "red" }}>{errors.no_hp}</small>
            )}
          </div>

          <div className='mb-3'>
            <input
              type='text'
              className='form-control rounded-pill shadow-sm'
              name='pekerjaan'
              placeholder='Pekerjaan'
              value={formData.pekerjaan}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.pekerjaan && (
              <small style={{ color: "red" }}>{errors.pekerjaan}</small>
            )}
          </div>

          <div className='mb-3'>
            <input
              type='text'
              className='form-control rounded-pill shadow-sm'
              name='alamat'
              placeholder='Alamat'
              value={formData.alamat}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.alamat && (
              <small style={{ color: "red" }}>{errors.alamat}</small>
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
