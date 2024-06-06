import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notlar = () => {
  const [notlar, setDersler] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDersler = async () => {
      try {
        const response = await axios.get(`http://192.168.17.165:3000/dersler/${localStorage.getItem("tc")}`,{withCredentials:true} );
        setDersler(response.data);
        console.log(response.data)
      } catch (error) {
        setError('Dersler alınamadı. Lütfen daha sonra tekrar deneyin.');
        console.error('Dersler alınamadı:', error);
      }
    };

    fetchDersler();
  }, []);

  return (
    <div>
        
        <>
  <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  <meta name="description" content="" />
  <meta name="author" content="" />
  <title>UBYS</title>
  <link
    href="vendor/fontawesome-free/css/all.min.css"
    rel="stylesheet"
    type="text/css"
  />
  <link
    href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
    rel="stylesheet"
  />
  <link href="css/sb-admin-2.min.css" rel="stylesheet" />
  <div id="wrapper">
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/Ogr"
      >
        <div className="sidebar-brand-text mx-3">UBYS </div>
      </a>
      <hr className="sidebar-divider my-0" />
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Öğrenci</div>
      <li class="nav-item">
                <hr></hr>
                <div    data-parent="#accordionSidebar">
                    <div class="">
                        <a class="nav-link"  href="/Notlar">Notlar</a>
                        <hr/>
                        <a class="nav-link" href="/Kayitgonder">Ders Kayıt gönderme</a>
                        <hr/>
                        <a class="btn btn-primary" href="/Login">Çıkış yap</a>
                    </div>
                </div>
            </li>   
      <hr className="sidebar-divider" />
      <hr className="sidebar-divider d-none d-md-block" />

    </ul>
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars" />
          </button>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow">

              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >

              </div>
            </li>
          </ul>
        </nav>

    <div>
    {notlar.map((ders, index) => (
  <div key={index} className="card shadow mb-4">
    <div className="card-header py-3">
      <h6 className="m-0 font-weight-bold text-primary">{ders.ad}</h6>
    </div>
    <div className="card-body">
      {ders.notlar.map((not, notIndex) => (
        <div key={notIndex}>
          <p>vize = {not.not1}</p>
          <hr />
          <p>proje = {not.proje}</p>
          <hr />
          <p>final = {not.not2}</p>
          <hr />
          <p>harfNotu = {not.harfNotu}</p>
        </div>
      ))}
    </div>
  </div>
))}
    </div>



      </div>
    </div>
  </div>
</>

    </div>
  );
};

export default Notlar;
