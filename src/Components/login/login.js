import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
    const navigate  = useNavigate ();
    const [tc, setTc] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://192.168.17.165:3000/auth/login', {
                tc: tc,
                password: password
            },{withCredentials:true,auth:true});
            // Başarılı giriş işlemi
            localStorage.setItem("tc",tc)
            
            // Yönlendirme
            if(response.data.role === 'USER'){
                    navigate('/Ogr');}
            if(response.data.role === 'LECTURER'){
                    navigate('/Teacher');}
            if(response.data.role === 'ADVISOR'){
                    navigate('/Danisman');}
            if(response.data.role === 'MANAGER'){
                    navigate('/Idareci');}

            console.log(response.data.access_token)
            localStorage.setItem('token', response.data.access_token);
        } catch (error) {
            // Hata durumunda
            console.error('Giriş yapılamadı:', error);
            setError('Giriş yapılamadı. Lütfen tekrar deneyin.');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">UBYS</h1>
                                            {error && <p className="text-danger">{error}</p>}
                                        </div>
                                        <form className="user" onSubmit={handleLogin}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-user"
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Kimlik Numarası"
                                                    value={tc}
                                                    onChange={(e) => setTc(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-user"
                                                    id="exampleInputPassword"
                                                    placeholder="Şifre"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-user btn-block">
                                                Giriş Yap
                                            </button>
                                            <hr/>
                                        </form>
                                        <hr/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
