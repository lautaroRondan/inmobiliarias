import React, { useState, useEffect } from 'react';
import MapView from '../Map/MapView';
import ListProperty from './ListProperty';
import data from '../../assets/data.json';
import Pagination from './Pagination';
import useFetch from '../Hooks/useFetch';
import departmentIcon from "../../assets/department_location_icon.svg";
import houseIcon from "../../assets/house_location_icon.svg";
import landIcon from "../../assets/land_location_icon.svg";


const Home = () => {
  const { sendRequest } = useFetch();
  const [loading, setLoading] = useState(true)
  const [defaultLocation, setDefaultLocation] = useState({
    currentLocation: { lat: -33.4137493295515, lng: -70.5819047619479 },
    zoom: 12,
  });

  const [myLocation, setMyLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    getLocations();
    geoLocations();
  }, []);

  useEffect(() => {
    // Actualizar la ubicación predeterminada cuando cambie la ubicación del usuario
    if (myLocation.latitude && myLocation.longitude) {
      const currentLocation = {
        lat: myLocation.latitude,
        lng: myLocation.longitude,
      };
      setDefaultLocation({
        currentLocation,
        zoom: 13,
      });
    }
  }, [myLocation]);

  // Obtener los detalles de las propiedades mediante una petición GET
  const getLocations = async () => {
    const response = await sendRequest('list-property', 'GET')
    if (response && response.datos && response.datos.status === 'success') {
      setLocations(response.datos.properties);
      setTotalPages(Math.ceil(response.datos.properties.length / pageSize)); // Calcular el número total de páginas
      console.log(response.datos.properties.length )
      setLoading(response.cargando)
    }
  };

  // Obtener la ubicación del usuario actual
  const geoLocations = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setMyLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error('Error Code = ' + error.code + ' - ' + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }

  // Realizar una búsqueda de propiedades
  const searchProperties = async (e) => {
    e.preventDefault();

    let search = {
      city: e.target.city.value,
      kindOfProperty: e.target.kindOfProperty.value,
      operation: e.target.operation.value,
    };

    const response = await sendRequest('search-property', 'POST', search)
   
    if (response && response.datos && response.datos.status === 'success') {
      setLocations(response.datos.properties);
      // Calcular el número total de páginas
      setTotalPages(Math.ceil(response.datos.properties.length / pageSize));
      // Reiniciar la página actual a la primera página
      setCurrentPage(1);
      setLoading(response.cargando)
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Obtener las propiedades de la página actual en función de la paginación
  const getCurrentPageProperties = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return locations.slice(startIndex, endIndex);
  };

  // se podria hacer un componente con buen estilo para que el footer no aparezca arriba
  if(loading){
    return <h1>Cargando...</h1>
  }

  return (
    <>
      <div className="content">
        <div className="form-container">
          {/* Opciones de operación */}
          <form onSubmit={searchProperties}>
            <input type="text" name="city" placeholder="¿Dónde quieres mudarte?" />

            <select name="kindOfProperty">
              {data.kindOfProperty.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <select name="operation">
              {data.operation.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <button type="submit" value="Buscar" >Buscar</button>
          </form>
        </div>
        {/* Contenedor de listado de propiedades */}
        <div className="listings-container">
          <ListProperty propertiesList={getCurrentPageProperties()} />
        </div>

        {/* Paginación */}
        
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        
      </div>
      {/* Contenedor de mapa */}
      <div className='property-container'>
        <div className="map-container">
          <MapView defaultLocation={defaultLocation} locations={locations} />
        </div>
        <div>
          <p className="property-info-map"><img src={departmentIcon} width='10%' height='10%' /> Departamentos</p>
          <p className="property-info-map"><img src={houseIcon} width='10%' height='10%' /> Casas</p>
          <p className="property-info-map"><img src={landIcon} width='10%' height='10%' /> Terrenos</p>
        </div>
      </div>
    </>
  );
};

export default Home;
