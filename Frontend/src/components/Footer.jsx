import React from "react";

const Footer = () => {
  return (
    <footer className=' border-top py-4 mt-5'>
      <div className='container'>
        <div className='row text-muted'>
          <div className='col-md-3 mb-3'>
            <h5 className='fw-bold' style={{ color: "#00BFFF" }}>
              Mom<span style={{ color: "lightcoral" }}>'s Care</span>
            </h5>
            <p>
              Platform Digital Yang Dirancang untuk ibu hamil dalam memantau
              kondisi kesehatan secara mudah
            </p>
          </div>
          <div className='col-md-3 mb-3'>
            <h6 className='fw-bold'>Follow Us</h6>
            <p>Instagram : @mom’s.care</p>
          </div>
          <div className='col-md-3 mb-3'>
            <h6 className='fw-bold'>Contact</h6>
            <p>+62 812 3456 7890</p>
            <p>
              Jl. Siliwangi KM 07 <br />
              Ringroad Barat, Banyuraden Gamping, <br />
              Sleman, DI Yogyakarta
            </p>
          </div>
          <div className='col-md-3 mb-3'>
            <h6 className='fw-bold'>Mommy</h6>
            <p>Sistem Pakar Untuk Mendiagnosa Penyakit Pada Ibu Hamil</p>
          </div>
        </div>
        <div className='text-center mt-4'>
          <small>
            Program Studi Informatika <br />
            Fakultas Teknik & Teknologi Informasi, Universitas Jenderal Achmad
            Yani Yogyakarta © 2025.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
