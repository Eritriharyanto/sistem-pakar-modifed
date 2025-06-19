import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FormIdentitas from "./pages/FormIdentitas";
import Trimester from "./pages/Trimester";
import Diagnosa_1 from "./pages/Diagnosa_1";
// import Diagnosa_2 from "./pages/Diagnosa_2";
import Hasil from "./pages/hasil";
import Artikel from "./pages/Artikel";
import Kalender_kehamilan from "./pages/Kalender_kehamilan";
import Artikel_1 from "./pages/Artikel_1";
import Artikel_2 from "./pages/Artikel_2";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <>
      <Navbar />
      <div className='container mt-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='formidentitas' element={<FormIdentitas />} />
          <Route path='Trimester' element={<Trimester />} />
          <Route path='Diagnosa_1' element={<Diagnosa_1 />} />
          <Route path='hasil' element={<Hasil />} />
          <Route path='kalender_kehamilan' element={<Kalender_kehamilan />} />
          <Route path='artikel' element={<Artikel />} />
          <Route path='artikel/1' element={<Artikel_1 />} />
          <Route path='artikel/2' element={<Artikel_2 />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </div>
    </>
  );
}
