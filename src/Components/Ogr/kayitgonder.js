import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KayitGonder = () => {
  const [dersler, setDersler] = useState([]);
  const [secilenDersler, setSecilenDersler] = useState([]);
  const [error, setError] = useState(null);

  // API'den dersleri alma ve bileşen yüklendiğinde bir kez çalışma
  useEffect(() => {
    // API'den dersleri alma isteği
    var api = localStorage.getItem('token');
    console.log(api);
    axios.get(`http://192.168.17.165:3000/dersler/sec/${localStorage.getItem("tc")}`)
      .then(response => {
        // İstek başarılı ise dersleri güncelle
        setDersler(response.data);
        console.log(response.data);
      })
      .catch(error => {
        // Hata durumunda hata mesajını ayarla
        setError(error.message);
        console.log(error.message);
      });
  }, []);

  // Ders ekleme işlevi
  const dersEkle = (ders) => {
    const secilenDers = dersler.find(item => item.ad === ders); // Seçilen dersin detaylarını al
    if (secilenDers && !secilenDersler.some(item => item.id === secilenDers.id)) { // Ders zaten seçilmemişse ekle
      setSecilenDersler([...secilenDersler, secilenDers]);
    }
  };

  // Ders çıkarma işlevi
  const dersCikar = (ders) => {
    setSecilenDersler(secilenDersler.filter((item) => item !== ders));
  };

  // Gönder butonuna basıldığında yapılacak işlemler
  const handleGonder = () => {
    axios.post(`http://192.168.17.165:3000/dersler/kayit`, { dersler: secilenDersler, tc: localStorage.getItem('tc') }, { withCredentials: true })
      .then(response => {
        // İstek başarılı ise başarılı mesajını göster
        console.log("Dersler başarıyla gönderildi:", response.data);
        console.log(secilenDersler);
      })
      .catch(error => {
        // Hata durumunda hata mesajını göster
        console.error("Dersleri gönderirken hata oluştu:", error);
      });
  };

  // Hata durumunda hata mesajını görüntüleme

  // API'den dersler yüklenene kadar bekletme

  // Dersleri listeleme
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
              <div data-parent="#accordionSidebar">
                <div class="">
                  <a class="nav-link" href="/Notlar">Notlar</a>
                  <hr />
                  <a class="nav-link" href="/Kayitgonder">Ders Kayıt gönderme</a>
                  <hr />
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
                <h1>Ders Seçimi</h1>
                <ul>
                  {dersler.map(ders => (
                    <li key={ders.id}>
                      {ders.ad} <button onClick={() => dersEkle(ders.ad)}>Ekle</button>
                      {secilenDersler.some(item => item.id === ders.id) ? (
                        <button onClick={() => dersCikar(ders)}>Çıkar</button>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <button onClick={handleGonder}>Gönder</button>
              </div>
            </div>
          </div>
        </div>
      </>

    </div>
  );
};

export default KayitGonder;
