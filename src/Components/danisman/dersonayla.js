import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dersonayla = () => {
  const [ogrenciler, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.17.165:3000/dersler/istek/2')
      .then(response => {
        const modifiedData = response.data.reduce((acc, item) => {
          // Öğrenci zaten varsa onun derslerine ekle, yoksa yeni bir öğrenci oluştur
          const existingStudentIndex = acc.findIndex(student => student.ogrenci.tc === item.ogrenci.tc);
          if (existingStudentIndex !== -1) {
            acc[existingStudentIndex].dersler.push({ dersAdi: item.ders.dersAdi });
          } else {
            acc.push({
              ogrenci: {
                ad: item.ogrenci.ad,
                soyad: item.ogrenci.soyad,
                tc: item.ogrenci.tc
              },
              dersler: [{ dersAdi: item.ders.dersAdi }]
            });
          }
          return acc;
        }, []);
        setStudents(modifiedData);
      })
      .catch(error => {
        console.error('Öğrenci bilgileri alınırken bir hata oluştu:', error);
      });
  }, []);

  const handleOnayla = (tc) => {
    // Seçilen öğrencinin derslerini onaylama isteği gönderme
    axios.patch(`http://192.168.17.165:3000/dersler/2`, { tc, selected: true })
      .then(response => {
        console.log('Dersler başarıyla onaylandı:', response.data);
        // Başarılı bir şekilde onaylandıktan sonra gerekli işlemleri yapabilirsiniz
      })
      .catch(error => {
        console.error('Dersler onaylanırken bir hata oluştu:', error);
      });
  };

  return (
    <div>
      <>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>UBYS</title>
        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
        <link href="css/sb-admin-2.min.css" rel="stylesheet" />
        <div id="wrapper">
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/Danisman">
              <div className="sidebar-brand-text mx-3">UBYS </div>
            </a>
            <hr className="sidebar-divider my-0" />
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">Danışman</div>
            <li class="nav-item">
              <hr></hr>
              <div data-parent="#accordionSidebar">
                <div class="">
                  <a class="nav-link" href="/Dersonayla">Ders Onayla</a>
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
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars" />
                </button>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown no-arrow"></li>
                </ul>
              </nav>
              <div>
                <h1>Öğrenci Bilgileri ve Seçilen Dersler</h1>
                {ogrenciler.map((ogrenci, index) => (
                  <div key={index}>
                    <h2>Öğrenci Bilgileri</h2>
                    <p>Öğrenci Adı: {ogrenci.ogrenci.ad}</p>
                    <p>Öğrenci Soyadı: {ogrenci.ogrenci.soyad}</p>
                    <p>Öğrenci Numarası: {ogrenci.ogrenci.tc}</p>
                    {ogrenci.dersler.length > 0 ? ( // Dersler varsa
                      <div>
                        <h2>Seçilen Dersler</h2>
                        <ul>
                          {ogrenci.dersler.map((ders, id) => (
                            <li key={id}>{ders.dersAdi}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p>Öğrencinin seçili dersi bulunmamaktadır.</p>
                    )}
                    <button onClick={() => handleOnayla(ogrenci.ogrenci.tc)}>Dersleri Onayla</button>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Dersonayla;
