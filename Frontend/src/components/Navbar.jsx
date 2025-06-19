import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-light border-bottom px-4'>
        <Link className='navbar-brand d-flex align-items-center' to='/'>
          <img
            src='/images/logo.png'
            alt='Logo'
            width='40'
            height='40'
            className='me-2'
          />
          <span
            className='fw-bold'
            style={{ fontSize: "20px", color: "#EE9CA7" }}
          >
            Mom's{" "}
            <span style={{ fontSize: "20px", color: "#A1C4FD" }}>Care</span>
          </span>
        </Link>

        {/* Hamburger menu toggle button */}
        <button
          className='navbar-toggler'
          type='button'
          onClick={toggleNavbar}
          aria-controls='navbarNav'
          aria-expanded={isOpen ? "true" : "false"}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* Collapse content */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id='navbarNav'
        >
          <ul className='navbar-nav ms-auto gap-4 text-center'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/FormIdentitas'>
                Diagnosis Penyakit
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/Kalender_kehamilan'>
                Kalender Kehamilan
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/Artikel'>
                Artikel
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
