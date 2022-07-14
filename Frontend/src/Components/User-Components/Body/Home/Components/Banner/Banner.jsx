import React from "react";
import { Carousel } from "react-bootstrap";

function Banner() {
    return (
        <Carousel style={{ marginTop: "68px" }}>
            <Carousel.Item interval={800}>
                <img
                    className="d-block w-100"
                    src={process.env.PUBLIC_URL + "Images/Banners/hypertension-health-check-up-medcity.jpg"}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={800}>
                <img
                    className="d-block w-100"
                    src={process.env.PUBLIC_URL + "Images/Banners/parkinsons-movement-disorder-medcity.jpg"}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    {/* <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={800}>
                <img
                    className="d-block w-100"
                    src={process.env.PUBLIC_URL + "Images/Banners/Mothers-Day-Package.jpg"}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    {/* <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Banner;
