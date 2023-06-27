import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListProperty = ({ listings }) => {

  const navigate = useNavigate();

 // Función para ver los detalles de una propiedad elejida
  const viewProperty = (id) => {
    navigate("/property/" + id)
  }

  return (
    <>
    {/* Verificar si hay propiedades para mostrar */}
      {listings.length > 0 ? (
        listings.map((list) => (
          <button
            key={list._id}
            className="property-item"
            onClick={() => viewProperty(list._id)}
          >
            {list.images && list.images.length > 0 ? (
              <img
                src={list.images[0]}
                alt="Imagen de propiedad"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/dcpliec2q/image/upload/v1687716214/inmobiliaria/imagen-no-disponible_udj8px.jpg"
                alt="Imagen de propiedad"
              />
            )}
            <p className="description">{list.description}</p>
            <p className="description">{'Dirección: ' + list.address + ', ' + list.city}</p>
            <p className="description">{'Tamaño: ' + list.surface + 'm²'}</p>
          </button>
        ))
      ) : (
        // Mostrar un mensaje si no hay propiedades para mostrar
        <h1>No hay propiedades</h1>
      )}
    </>
  );
};

export default ListProperty;
