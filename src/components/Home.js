import React from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../stylesmandaz.css";
import logo2 from '../carouselImages/logo2.png';
import logo from '../carouselImages/logoripi.png';
import carrito from '../carouselImages/carrito.png';
import carro2 from '../carouselImages/carro2.webp';
import brazo from '../carouselImages/brazo.webp';
import desk from '../carouselImages/desk.webp';

import { Carousel } from 'react-responsive-carousel';

const Home = () => {
    return (
        <div className="container">
            <div className="content">
                <div className="welcome-section">
                    <h1 id="titulo">Bienvenido a RipipsaVista</h1>
                    <p className="description">Explora nuestra plataforma para ver productos industriales en impactantes vistas 3D y experiencias de Realidad Aumentada. Navega nuestro catálogo y descubre sus detalles en tiempo real.</p>

                    <div className="button-container">
                        <Link to="/menuAR" className="custom-btn">Ir a Realidad Aumentada</Link>
                        <Link to="/escenasGuardadas" className="custom-btn">Ir a Escenas Guardadas</Link>
                    </div>
                </div>

                <div className="carousel-section">
                    <Carousel autoPlay infiniteLoop showThumbs={false} interval={2000}>
                        <div>
                            <img src={carro2} alt="Slide 1" style={{ maxHeight: "400px", objectFit: "contain" }} />
                        </div>
                        <div>
                            <img src={carrito} alt="Slide 2" style={{ maxHeight: "400px", objectFit: "contain" }} />
                        </div>
                        <div>
                            <img src={brazo} alt="Slide 3" style={{ maxHeight: "400px", objectFit: "contain" }} />
                        </div>
                        <div>
                            <img src={desk} alt="Slide 4" style={{ maxHeight: "400px", objectFit: "contain" }} />
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default Home;
