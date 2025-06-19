import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='container py-5'>
      <div className='row align-items-'>
        <div className='col-md-6 mb-4 mb-md-0'>
          <h1 className='fw-bold'>
            Sumber Informasi <br />
            Terpercaya Untuk <br />
            Ibu Hamil
          </h1>
          <p className='mt-3'>
            Temukan Diagnosa Penyakit Pada Ibu Hamil,
            <br />
            Informasi tentang kehamilan dan artikel
            <br />
            bermanfaat untuk menjaga kesehatan ibu hamil
          </p>
          <button
            className='btn btn-danger px-4 mt-3'
            onClick={() => navigate("/Formidentitas")}
          >
            Periksa Sekarang
          </button>
        </div>
        <div className='col-md-6 text-center'>
          <img
            src='/images/home.png'
            alt='Ibu Hamil'
            className='img-fluid w-100'
            style={{ maxHeight: "600px" }}
          />
        </div>

        <section className='diagnosa-step mb-5'>
          <h2 className='text-center'>Bagaimana cara diagnosa</h2>
          <div className='row mt-5'>
            <div className='col-md-4'>
              <div className='card p-3'>
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src='images/card.png'
                    alt='Data Diri'
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: "8px",
                    }}
                  />
                  Masukan Data Diri
                </h4>
                <p>
                  Identitas ibu hamil sangat penting dan harus diisi dengan
                  cermat saat pendaftaran.
                </p>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='card p-3'>
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src='images/dokumen+.png'
                    alt='Identifikasi Gejala'
                    style={{
                      width: "70px",
                      height: "70px",
                      marginRight: "8px",
                    }}
                  />
                  Identifikasi Gejala
                </h4>
                <p>
                  Sistem akan menanyakan gejala-gejala yang dialami ibu hamil
                  sebagai identifikasi awal.
                </p>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='card p-3'>
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src='images/dokumen.png'
                    alt='Hasil Diagnosa'
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "8px",
                    }}
                  />
                  Hasil Diagnosa
                </h4>
                <p>
                  Sistem akan memberikan hasil diagnosa lengkap dan saran
                  penanganan yang tepat.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className='mb-7'>
          <div className='row align-item-center'>
            <div className='col-md-6 text-start'>
              <h2 className='fw-bold mb-4'>Mom's Care</h2>
              <p className='mb-5 text-muted'>
                Mom's Care adalah platform digital yang dirancang khusus untuk
                membantu ibu hamil dalam menjaga kesehatan mereka. Dengan
                menggunakan teknologi terkini, Bunda Hati memberikan informasi
                yang akurat dan terpercaya.
              </p>
              <ul className='list-unstyled'>
                <li className='mb-3'>
                  ✅ <strong>Analisis Faktor Resiko</strong>
                </li>
                <li className='mb-3'>
                  ✅ <strong>Algoritma AI yang Bagus</strong>
                </li>
                <li className='mb-3'>
                  ✅ <strong>Algoritma AI yang Bagusar</strong>
                </li>
              </ul>
            </div>

            <div className='col-md-6 text-center'>
              <img
                src='/images/doctor.png'
                alt='dokter'
                className='img-fluid'
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
