import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notgir = () => {
  const [dersler, setDersler] = useState([]);
  const [notlar, setNotlar] = useState({});

  // Harf notunu hesapla fonksiyonu
  const calculateLetterGrade = (vize, final) => {
    const ortalama = (vize * 0.4) + (final * 0.6);
    if (ortalama >= 90) {
      return 'AA';
    } else if (ortalama >= 85) {
      return 'BA';
    } else if (ortalama >= 80) {
      return 'BB';
    } else if (ortalama >= 70) {
      return 'CB';
    } else if (ortalama >= 60) {
      return 'CC';
    } else if (ortalama >= 55) {
      return 'DC';
    } else if (ortalama >= 50) {
      return 'DD';
    } else if (ortalama >= 40) {
      return 'FD';
    } else {
      return 'FF';
    }
  };

  useEffect(() => {
    axios.get(`http://192.168.17.165:3000/notlar/${localStorage.getItem('tc')}`)
      .then(response => {
        setDersler(response.data.dersler || []);
        const yeniNotlar = {};
        response.data.dersler.forEach(ders => {
          ders.ogrenciler.forEach(ogrenci => {
            yeniNotlar[ogrenci.id] = yeniNotlar[ogrenci.id] || {};
            yeniNotlar[ogrenci.id][ders.ad] = {
              vize: parseFloat(ogrenci.notlar[0]?.not1 || 0),
              final: parseFloat(ogrenci.notlar[0]?.not2 || 0)
            };
          });
        });
        setNotlar(yeniNotlar);
      })
      .catch(error => {
        console.error('Veri alınırken bir hata oluştu:', error);
      });
  }, []);

  const handleSaveNotlar = (dersAdi, ogrenciId) => {
    // ogrenciId ve dersAdi'nin doğruluğunu kontrol edin
    if (!ogrenciId || !dersAdi || !notlar[ogrenciId] || !notlar[ogrenciId][dersAdi]) {
      console.error('Öğrenci veya ders bilgileri bulunamadı:', ogrenciId, dersAdi);
      return;
    }

    // Öğrenci ve ders bilgileri varsa işlemi devam ettirin
    const vize = notlar[ogrenciId][dersAdi]?.vize || 0;
    const final = notlar[ogrenciId][dersAdi]?.final || 0;
    const harfNotu = calculateLetterGrade(vize, final);

    axios.post(`http://192.168.17.165:3000/notlar/notgir/22222222222`, {
      vize: vize,
      final: final,
      harfNotu: harfNotu,
      dersAdi: dersAdi,
      ogrenciId: ogrenciId,
      proje: 0
    })
    .then(response => {
      console.log('Notlar başarıyla kaydedildi:', response.data);
    })
    .catch(error => {
      console.error('Notlar kaydedilirken bir hata oluştu:', error);
    });
  };


  const handleNotChange = (ogrenciId, dersAdi, field, value) => {
    const updatedNotlar = { ...notlar };
    updatedNotlar[ogrenciId] = {
      ...updatedNotlar[ogrenciId],
      [dersAdi]: {
        ...updatedNotlar[ogrenciId]?.[dersAdi],
        [field]: parseFloat(value) || 0
      }
    };
    setNotlar(updatedNotlar);
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
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/Teacher">
              <div className="sidebar-brand-text mx-3">UBYS </div>
            </a>
            <hr className="sidebar-divider my-0" />
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">Öğretmen</div>
            <li className="nav-item">
              <hr />
              <div data-parent="#accordionSidebar">
                <div>
                  <a className="nav-link" href="/Notgir">Not girme</a>
                  <hr />
                  <a className="btn btn-primary" href="/Login">Çıkış yap</a>
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
              </nav>
              <div>
                <h1>Not Giriş Ekranı</h1>
                {dersler.map(ders => (
                  <div key={ders.ad}>
                    <h2>{ders.ad} Dersi</h2>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Öğrenci Adı</th>
                          <th>Öğrenci Soyadı</th>
                          <th>Öğrenci Numarası</th>
                          <th>Vize Notu</th>
                          <th>Final Notu</th>
                          <th>Kaydet</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ders.ogrenciler.map(ogrenci => (
                          <tr key={ogrenci.id}>
                            <td>{ogrenci.ad}</td>
                            <td>{ogrenci.soyad}</td>
                            <td>{ogrenci.id}</td>
                            <td>
                              <input
                                type="number"
                                value={notlar[ogrenci.id]?.[ders.ad]?.vize || ''}
                                onChange={e => handleNotChange(ogrenci.id, ders.ad, 'vize', e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={notlar[ogrenci.id]?.[ders.ad]?.final || ''}
                                onChange={e => handleNotChange(ogrenci.id, ders.ad, 'final', e.target.value)}
                              />
                            </td>
                            <td>
                              <button onClick={() => handleSaveNotlar(ders.ad, ogrenci.id)}>Kaydet</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Notgir;
