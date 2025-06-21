import React, { useEffect } from "react";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const Artikel_2 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className='container py-5'>
      <h2 className='fw-bold mb-4 text-center' data-aos='fade-down'>
        Sejumlah Rekomendasi Makanan Sehat untuk Ibu Hamil
      </h2>

      <img
        src='/images/makanan.png'
        alt='makanan'
        className='img-fluid rounded mb-4 d-block mx-auto'
        style={{ maxHeight: "300px", objectFit: "cover" }}
        data-aos='zoom-in'
      />

      <p data-aos='fade-up'>
        Agar janin dapat tumbuh dan berkembang dengan baik selama kehamilan, ibu
        hamil tentunya membutuhkan nutrisi yang cukup. Perlu diketahui,
        kebutuhan makan selama hamil tidak bisa disamakan dengan kebutuhan makan
        orang pada umumnya.
      </p>
      <p data-aos='fade-up'>
        Menu makanan yang baik untuk ibu hamil perlu diatur dengan
        mempertimbangkan faktor-faktor kesehatan ibu dan janin itu sendiri.
      </p>

      <h4 className='fw-bold mt-4' data-aos='fade-right'>
        Rekomendasi Makanan Sehat untuk Ibu Hamil
      </h4>
      <p data-aos='fade-up'>
        Makanan yang baik dikonsumsi ibu hamil perlu mengandung nutrisi yang
        seimbang agar janin tumbuh sehat dalam kandungan. Berikut beberapa
        rekomendasi makanan:
      </p>

      <h5 className='fw-bold mt-3' data-aos='fade-up'>
        1. Karbohidrat
      </h5>
      <p data-aos='fade-up'>
        Karbohidrat adalah sumber energi utama yang dibutuhkan ibu hamil agar
        tetap bertenaga. Konsumsi karbohidrat yang sehat membantu mengurangi
        keinginan makan makanan tinggi kalori.
      </p>

      <h5 className='fw-bold mt-3' data-aos='fade-up'>
        2. Buah-buahan
      </h5>
      <p data-aos='fade-up'>
        Buah mengandung nutrisi tinggi dan membantu mengurangi keinginan
        konsumsi gula buatan. Sebelum dikonsumsi, cuci dan kupas kulit buah, dan
        hindari peralatan yang terkontaminasi makanan mentah.
      </p>
      <p data-aos='fade-up'>Buah yang baik untuk ibu hamil antara lain:</p>
      <ul data-aos='fade-up'>
        <li>Pisang</li>
        <li>Apel</li>
        <li>Stroberi</li>
        <li>Pir</li>
        <li>Mangga</li>
        <li>Alpukat</li>
        <li>Anggur</li>
        <li>Delima</li>
        <li>Buah kering</li>
      </ul>

      <h5 className='fw-bold mt-3' data-aos='fade-up'>
        3. Sayur
      </h5>
      <p data-aos='fade-up'>
        Sayur wajib dikonsumsi setiap hari oleh ibu hamil. Disarankan untuk
        mengonsumsi yang sudah dimasak hingga matang. Manfaat utama:
      </p>
      <ul data-aos='fade-up'>
        <li>Rendah lemak dan kalori</li>
        <li>Sumber serat alami, mencegah sembelit</li>
        <li>Kaya vitamin, asam folat, dan zat besi</li>
      </ul>
      <p data-aos='fade-up'>Sayur yang disarankan:</p>
      <ul data-aos='fade-up'>
        <li>Asparagus</li>
        <li>Brokoli</li>
        <li>Kembang kol</li>
        <li>Seledri</li>
        <li>Paprika</li>
        <li>Mentimun</li>
        <li>Jagung</li>
        <li>Labu</li>
        <li>Ubi</li>
      </ul>

      <h5 className='fw-bold mt-3' data-aos='fade-up'>
        4. Makanan Tinggi Protein
      </h5>
      <p data-aos='fade-up'>
        Protein mendukung pertumbuhan otak, jantung, dan jaringan tubuh bayi.
        Sumber protein yang baik:
      </p>
      <ul data-aos='fade-up'>
        <li>Daging ayam</li>
        <li>Daging ikan</li>
        <li>Kacang-kacangan</li>
        <li>Selai kacang</li>
        <li>Tahu dan tempe</li>
      </ul>

      <h5 className='fw-bold mt-3' data-aos='fade-up'>
        5. Produk Susu
      </h5>
      <p data-aos='fade-up'>
        Susu kaya kalsium dan protein, baik untuk ibu dan janin. Pastikan
        konsumsi produk yang sudah dipasteurisasi agar aman dari bakteri.
      </p>
      <p data-aos='fade-up'>Manfaat susu untuk ibu hamil:</p>
      <ul data-aos='fade-up'>
        <li>Menguatkan tulang janin</li>
        <li>Mendukung jaringan dan otak bayi</li>
        <li>Mengurangi risiko anemia dan preeklamsia</li>
        <li>Meningkatkan energi ibu</li>
      </ul>

      <h5 className='fw-bold mt-3' data-aos='fade-up'>
        6. Daging Tanpa Lemak
      </h5>
      <p data-aos='fade-up'>
        Daging sapi tanpa lemak mengandung zat besi, vitamin B, dan kolin. Bagus
        untuk pembentukan otak dan jaringan janin.
      </p>

      <h5 className='fw-bold mt-3' data-aos='fade-up'>
        7. Telur
      </h5>
      <p data-aos='fade-up'>
        Telur kaya protein dan kolin yang penting untuk otak dan saraf janin.
        Asam amino dalam telur mendukung pembentukan sel ibu dan bayi.
      </p>

      <h5 className='fw-bold mt-3' data-aos='fade-up'>
        8. Sereal
      </h5>
      <p data-aos='fade-up'>
        Untuk ibu hamil yang mengalami mual di pagi hari, sereal adalah pilihan
        yang ringan dan bernutrisi. Sereal mengandung vitamin B, kalsium, dan
        karbohidrat.
      </p>

      <p className='mt-4' data-aos='fade-up'>
        Makanan sehat bisa berbeda tergantung kondisi masing-masing ibu hamil.
        Untuk hasil terbaik, konsultasikan dengan dokter gizi atau kandungan.
      </p>

      <div className='text-muted mt-5' data-aos='fade-up'>
        <p>Terakhir diperbarui: 22 Agustus 2024</p>
        <p>Author: Tim Medis Siloam Hospitals</p>
        <a
          href='https://www.siloamhospitals.com/informasi-siloam/artikel/makanan-sehat-untuk-ibu-hamil'
          target='_blank'
          rel='noopener noreferrer'
        >
          Sumber lainnya
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default Artikel_2;
