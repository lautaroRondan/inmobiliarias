import React, { useState, useEffect } from 'react';
import MapView from '../Map/MapView';
import ListProperty from './ListProperty';
import { PetitionFetch } from '../Helpers/PetitionFetch';
import { Global } from '../Helpers/Global';
import data from '../../assets/data.json';
import Pagination from './Pagination';
import departmentIcon from "../../assets/department_location_icon.svg";
import houseIcon from "../../assets/house_location_icon.svg";
import landIcon from "../../assets/land_location_icon.svg";

const Search = () => {
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
    const { datos } = await PetitionFetch(Global.url + 'list-property', 'GET');
    if (datos.status === 'success') {
      setLocations(datos.properties);
      setTotalPages(Math.ceil(datos.properties.length / 8)); // Calcular el número total de páginas
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

    const { datos } = await PetitionFetch(Global.url + 'search-property', 'POST', search);
    if (datos.status === 'success') {
      setLocations(datos.properties);
      // Calcular el número total de páginas
      setTotalPages(Math.ceil(datos.properties.length / 8));
      // Reiniciar la página actual a la primera página
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Obtener las propiedades de la página actual en función de la paginación
  const getCurrentPageProperties = () => {
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    return locations.slice(startIndex, endIndex);
  };

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
            <input type="submit" value="Buscar" />
          </form>
        </div>
        {/* Contenedor de listado de propiedades */}
        <div className="listings-container">
          <ListProperty listings={getCurrentPageProperties()} />
        </div>

        {/* Paginación */}
        {totalPages > 1 &&
          <div className='pagination-container'>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        }

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

export default Search;
