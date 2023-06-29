import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import { Carousel } from 'react-responsive-carousel';
import defaultImage from '../../assets/imagen-no-disponible.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MapView from '../Map/MapView';
import departmentIcon from "../../assets/department_location_icon.svg";
import houseIcon from "../../assets/house_location_icon.svg";
import landIcon from "../../assets/land_location_icon.svg";
import "./Property.css"

const Property = () => {
    const { sendRequest } = useFetch();
    const [property, setProperty] = useState([]);
    const params = useParams();
    const [defaultLocation, setDefaultLocation] = useState({
        currentLocation: { lat: -33.4137493295515, lng: -70.5819047619479 },
        zoom: 12,
    });

    useEffect(() => {
        getProperty();
    }, []);

    // Obtener los detalles de la propiedad mediante una petición GET
    const getProperty = async () => {
        const response = await sendRequest('property/' + params.id, 'GET')
        console.log(response.cargando)
        if (response.datos.status === 'success') {
            setProperty(response.datos.property);
            setDefaultLocation({
                currentLocation: { lat: response.datos.property.coordinates[0], lng: response.datos.property.coordinates[1] },
                zoom: 12,
            });
        }
    };

    return (
        <>
            <div className="property-container">
                <div className="carousel-container">
                    <Carousel
                        className="carousel"
                        showArrows={true}
                        showStatus={false}
                        showIndicators={property.images && property.images.length > 1}
                    >
                        {property.images && property.images.length > 0 ? (
                            property.images.map((imageUrl, index) => (
                                <div key={index}>
                                    <img src={imageUrl} alt="Property" />
                                </div>
                            ))
                        ) : (
                            <div>
                                <img src={defaultImage} alt="Default Property" />
                            </div>
                        )}
                    </Carousel>
                </div>

                <div className="property-details">
                    {/* <h2 className="property-name">{property.name}</h2> */}
                    <h3 className="property-description">{property.description}</h3>
                    <p className="property-info">
                        <span className="info-label">Precio:</span> {property.price}
                    </p>
                    <p className="property-info">
                        <span className="info-label">Tamaño:</span> {property.surface}
                    </p>
                    <p className="property-info">
                        <span className="info-label">Dirección:</span> {property.address}</p>
                    <p className="property-info">
                        <span className="info-label">Inmobiliaria: </span>
                        {property.inmobiliaria}</p>
                    <p className="property-info">
                        <span className="info-label">Operacion: </span>
                        {property.operation}</p>
                </div>


            </div >
            <div className='property-container'>
                <MapView defaultLocation={defaultLocation} locations={property} />
                <div>
                    <p className="property-info-map"><img src={departmentIcon} width='10%' height='10%' /> Departamentos</p>
                    <p className="property-info-map"><img src={houseIcon} width='10%' height='10%' /> Casas</p>
                    <p className="property-info-map"><img src={landIcon} width='10%' height='10%' /> Terrenos</p>
                </div>
            </div>

        </>

    );
};

export default Property;