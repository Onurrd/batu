import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dersata = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const teachersResponse = await axios.get('http://192.168.17.165:3000/management');
      const coursesResponse = await axios.get('http://192.168.17.165:3000/management/2');
      setTeachers(teachersResponse.data);
      setCourses(coursesResponse.data);
      // Öğretmenlerle eşleşen boş bir nesne oluşturun
      const initialSelectedTeachers = {};
      coursesResponse.data.forEach(course => {
        initialSelectedTeachers[course.id] = '';
      });
      setSelectedTeachers(initialSelectedTeachers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const assignCourseToTeacher = async (courseId) => {
    try {
      const selectedTeacherId = selectedTeachers[courseId];
      if (!selectedTeacherId) {
        console.error('Lütfen öğretmen seçin.');
        return;
      }
      // HTTP isteğini gönder
      await axios.patch(`http://192.168.17.165:3000/management/2`, {
        yenihocatcno: selectedTeacherId,
        dersid: courseId
      });
      console.log('Ders öğretmene başarıyla atandı.');
      console.log(selectedTeacherId,courseId)
    } catch (error) {
      console.error('Error assigning course to teacher:', error);
    }
  };

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
    href="/Idareci"
  >
    <div className="sidebar-brand-text mx-3">UBYS </div>
  </a>
  <hr className="sidebar-divider my-0" />
  <hr className="sidebar-divider" />
  <div className="sidebar-heading">İdareci</div>
  <li class="nav-item">
            <hr></hr>
            <div    data-parent="#accordionSidebar">
                <div class="">
                    <a class="nav-link"  href="/Dersata">Ders atama</a>
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


        </li>
      </ul>
    </nav>




    <div className="card-body">
            
    <div>
      <h1>Ders Atama Ekranı</h1>
      {teachers.length > 0 && courses.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Ders Adı</th>
                <th>Öğretmen</th>
                <th>Ata</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.ad}</td>
                  <td>
                    <select
                      value={selectedTeachers[course.id]}
                      onChange={(e) => {
                        const updatedSelectedTeachers = { ...selectedTeachers };
                        updatedSelectedTeachers[course.id] = e.target.value;
                        setSelectedTeachers(updatedSelectedTeachers);
                      }}
                    >
                      <option value="">Öğretmen Seç</option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.tc}>{teacher.ad}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button onClick={() => assignCourseToTeacher(course.id)}>Ata</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
    
          </div>


  </div>
</div>
</div>
</>

</div>
  )
}

export default Dersata