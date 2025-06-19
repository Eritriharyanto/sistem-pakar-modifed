import React, { useState, useRef } from "react";
import Footer from "../components/Footer";

export default function Kalender_kehamilan() {
  const [rotation, setRotation] = useState(0);
  const isRotating = useRef(false);
  const lastAngle = useRef(0);
  const centerRef = useRef(null);

  const getAngle = (e) => {
    const rect = centerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const handleMouseDown = (e) => {
    isRotating.current = true;
    lastAngle.current = getAngle(e);
  };

  const handleMouseMove = (e) => {
    if (!isRotating.current) return;

    const angle = getAngle(e);
    const delta = angle - lastAngle.current;
    setRotation((prev) => prev + delta);
    lastAngle.current = angle;
  };

  const handleMouseUp = () => {
    isRotating.current = false;
  };

  return (
    <div className=''>
      <h2 className='fw-bold mb-4'>Kalender Kehamilan</h2>

      <div
        className='d-flex justify-content-center align-items-center vh-100 bg-white'
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={centerRef}
          className='position-relative'
          style={{ width: "450px", height: "450px" }}
        >
          {/* Gambar luar */}
          <img
            src='/images/kalender_bagian_luar.png'
            alt='Kalender Luar'
            className='img-fluid position-absolute top-0 start-0 w-100 h-100'
          />

          {/* Gambar dalam */}
          <img
            src='/images/kalender_bagian_dalam.png'
            alt='Kalender Dalam'
            onMouseDown={handleMouseDown}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isRotating.current
                ? "none"
                : "transform 0.2s ease-out",
              cursor: isRotating.current ? "grabbing" : "grab",
              zIndex: 10,
            }}
            className='img-fluid position-absolute top-0 start-0 w-100 h-100'
          />
        </div>
      </div>
      <p>
        <strong>Keterangan:</strong> Silahkan putar lingkaran tersebut dengan
        mouse (pada layar destop) atau dengan jari (pada layar smartphone) Anda.
        Arahkan tanda panah berwarna merah (menstruasi terakhir) sesuai tanggal
        menstruasi terakhir Anda. Kemudian baca hasilnya, sesuai informasi yang
        terdapat dalam lingkaran Kalender Kehamilan tersebut.
      </p>
      <Footer />
    </div>
  );
}
