import React, { useEffect } from "react";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const Artikel_1 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className='container py-5'>
      <h2 className='fw-bold mb-4 text-center' data-aos='fade-down'>
        Tanda-Tanda Hamil Anak Kembar dan Komplikasi yang Bisa Terjadi
      </h2>

      <img
        src='/images/baby.png'
        alt='baby'
        className='img-fluid rounded mb-4 d-block mx-auto'
        style={{ maxHeight: "300px", objectFit: "cover" }}
        data-aos='zoom-in'
      />

      <p data-aos='fade-up'>
        Hamil anak kembar sebenarnya dapat diketahui secara pasti melalui
        pemeriksaan USG. Meski demikian, ada beberapa tanda yang bisa dilihat
        untuk memperkirakan apakah Anda sedang mengalami kehamilan kembar.
        Selain itu, penting juga bagi Anda untuk mewaspadai komplikasi yang bisa
        terjadi saat hamil kembar.
      </p>

      <h4 className='fw-bold mt-5' data-aos='fade-right'>
        Tanda Hamil Anak Kembar
      </h4>
      <p data-aos='fade-up'>
        Hamil anak kembar lebih umum terjadi pada wanita berusia 30–40 tahun.
        Alasannya adalah karena pada rentang usia ini, wanita berpeluang untuk
        melepas lebih dari 1 sel telur ketika ovulasi.
      </p>
      <p data-aos='fade-up'>
        Dibanding wanita yang hamil tunggal, wanita yang hamil kembar biasanya
        akan:
      </p>

      <ul data-aos='fade-up'>
        <li>Memiliki ukuran perut lebih besar sejak awal kehamilan</li>
        <li>Mengalami mual dan muntah (morning sickness) yang lebih parah</li>
        <li>Mengalami kenaikan berat badan yang lebih banyak</li>
        <li>Merasa lebih lelah</li>
        <li>Mengalami sakit punggung lebih awal dan intens</li>
        <li>Merasa gerakan janin lebih dini, biasanya trimester kedua</li>
      </ul>

      <p data-aos='fade-up'>
        Kadar hormon hCG juga lebih tinggi pada kehamilan kembar. Namun, hanya
        USG yang dapat memastikan, terutama saat usia kehamilan 10–14 minggu.
        Beberapa kondisi seperti superfetasi dapat menyerupai kehamilan kembar.
      </p>

      <h4 className='fw-bold mt-5' data-aos='fade-right'>
        Komplikasi yang Mengintai Hamil Anak Kembar
      </h4>
      <p data-aos='fade-up'>
        Hamil anak kembar cenderung memiliki risiko komplikasi yang lebih
        tinggi, antara lain:
      </p>

      <h5 className='fw-bold' data-aos='fade-right'>
        1. Preeklamsia
      </h5>
      <p data-aos='fade-up'>
        Komplikasi yang ditandai dengan tekanan darah tinggi dan protein dalam
        urin setelah 20 minggu kehamilan. Gejalanya meliputi pembengkakan, sakit
        kepala berat, gangguan penglihatan, nyeri perut, mual, dan sesak napas.
      </p>

      <h5 className='fw-bold' data-aos='fade-right'>
        2. Diabetes Gestasional
      </h5>
      <p data-aos='fade-up'>
        Diabetes pada masa kehamilan karena kurangnya insulin. Gejala meliputi
        haus, buang air kecil berlebihan, kelelahan, dan infeksi kandung kemih.
        Risiko pada kehamilan kembar bisa mencapai 4–10%.
      </p>

      <h5 className='fw-bold' data-aos='fade-right'>
        3. Anemia
      </h5>
      <p data-aos='fade-up'>
        Kebutuhan zat besi lebih tinggi saat hamil kembar, sehingga risiko
        anemia meningkat. Gejalanya meliputi lelah, pucat, dan mudah lemas.
      </p>

      <h5 className='fw-bold' data-aos='fade-right'>
        4. Twin to Twin Transfusion Syndrome (TTTS)
      </h5>
      <p data-aos='fade-up'>
        TTTS terjadi pada bayi kembar identik yang berbagi plasenta. Satu bayi
        mendapat darah lebih banyak, sementara yang lain kekurangan. Hal ini
        bisa menyebabkan gangguan jantung atau anemia.
      </p>

      <p data-aos='fade-up'>
        Deteksi dini sangat penting. Kehamilan kembar membutuhkan perhatian
        lebih, termasuk pemenuhan nutrisi, cairan yang cukup, dan kontrol rutin
        ke dokter kandungan.
      </p>

      <p data-aos='fade-up'>
        Pada beberapa kasus, kehamilan kembar juga dapat menyebabkan gangguan
        otot perut (diastasis recti).
      </p>

      <p data-aos='fade-up'>
        Pastikan untuk selalu memantau kondisi tubuh dan janin, serta
        konsultasikan secara rutin kepada dokter kehamilan untuk hasil terbaik.
      </p>

      <div className='text-muted mt-5' data-aos='fade-up'>
        <p>Terakhir diperbarui: 30 Oktober 2024</p>
        <p>Ditinjau oleh: dr. Kevin Adrian</p>
        <a
          href='https://www.alodokter.com/tanda-tanda-hamil-anak-kembar-dan-komplikasi-yang-bisa-terjadi'
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

export default Artikel_1;
