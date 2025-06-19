import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Artikel = () => {
  return (
    <div className=''>
      <h2 className='fw-bold mb-4'>Arikel</h2>

      {/*artikel 1*/}
      <div className='row mb-4 align-items-start'>
        <div className='col-md-3'>
          <img
            src='/images/baby.png'
            alt='baby'
            className='img-fluid rounded'
            style={{ maxHeight: "150px", objectFit: "cover" }}
          />
        </div>
        <div className='col-md-9'>
          <h5 className='fw-bold'>
            Tanda-Tanda Hamil Anak Kembar dan Komplikasi yang Bisa Terjadi
          </h5>
          <p className='text-muted mb-1' style={{ maxWidth: "600px" }}>
            Hamil anak kembar sebenarnya dapat diketahui secara pasti melalui
            pemeriksaan USG. Meski demikian, ada beberapa...
          </p>
          <Link
            to='/artikel/1'
            className='text-primary fw-semibold text-decoration-none'
          >
            Baca Selengkapnya
          </Link>
        </div>
      </div>

      {/*artikel 2*/}
      <div className='row mb-4 align-items-start'>
        <div className='col-md-3'>
          <img
            src='/images/makanan.png'
            alt='makanan'
            className='img-fluid rounded'
            style={{ maxHeight: "150px", objectFit: "cover" }}
          />
        </div>
        <div className='col-md-9'>
          <h5 className='fw-bold'>
            Sejumlah Rekomendasi Makanan Sehat untuk Ibu Hamil
          </h5>
          <p className='text-muted mb-1' style={{ maxWidth: "600px" }}>
            Rekomendasi Makanan Sehat untuk Ibu Hamil · 1. Karbohidrat · 2.
            Buah-buahan · 3. Sayur · 4. Makanan Tinggi Protein · 5. Produk Susu
            · 6. Daging Tanpa ...
          </p>
          <Link
            to='/artikel/2'
            className='text-primary fw-semibold text-decoration-none'
          >
            Baca Selengkapnya
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Artikel;
