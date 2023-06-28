import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListProperty = ({ propertiesList }) => {

  const navigate = useNavigate();
  const defaultImg = "https://res.cloudinary.com/dcpliec2q/image/upload/v1687716214/inmobiliaria/imagen-no-disponible_udj8px.jpg"

 // Función para ver los detalles de una propiedad elejida
  const viewProperty = (id) => {
    navigate("/property/" + id)
  }

  const isEmpty = propertiesList.length === 0;
 // Mostrar un mensaje si no hay propiedades para mostrar
  if(isEmpty){
    return <h1>No hay propiedades</h1>
  }

  return (
    <>
      {
        propertiesList.map((list) => (
          <button
            key={list._id}
            className="property-item"
            onClick={() => viewProperty(list._id)}
          >
              <img 
                src={list.images && list.images.length > 0 ? list.images[0] : defaultImg}
                alt="Imagen de propiedad"
              />
           
            <p className="description">{list.description}</p>
            <p className="description">{'Dirección: ' + list.address + ', ' + list.city}</p>
            <p className="description">{'Tamaño: ' + list.surface + 'm²'}</p>
            <p className="description">{'Operacion: ' + list.operation}</p>
          </button>
        ))
            }
    </>
  );
};

export default ListProperty;
