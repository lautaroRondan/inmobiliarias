const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Crear un array con el número de páginas
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='pagination-container'>
    <div className="pagination">
      {/* Iterar sobre cada página y mostrar un botón */}
      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-button ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
    </div>
  );
};

export default Pagination;
  