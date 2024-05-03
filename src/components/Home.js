import React from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../carouselImages/logo2.png';
import logo from '../carouselImages/logoripi.png'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../stylesmandaz.css";

const Home = () => {
    return (
        <div className="container">
            <div className="content">
                <div className="left-content">
                    <h1 id="titulo">Bienvenido a RipipsaVista!</h1>
                    <p className="description">Explora nuestra plataforma para ver productos industriales en impactantes vistas 3D y experiencias de Realidad Aumentada. Navega nuestro catálogo y descubre sus detalles en tiempo real.</p>
                    <img src={logo2} alt="Logo Ripipsa" className="small-logo" />
                    <Link to="/menuAR" className="custom-btn">Ir a Realidad Aumentada</Link>
                </div>


                <div className="right-content">
                    <Carousel autoPlay infiniteLoop showThumbs={false} interval={2000}>
                        <div>
                            <img src={logo} alt="Slide 1" style={{maxHeight: "300px", maxWidth: "350px",objectFit: "contain"}}/>
                        </div>
                        <div>
                            <img src={logo2} alt="Slide 2" style={{maxHeight: "300px", maxWidth: "350px", objectFit: "contain"}}/>
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default Home;
