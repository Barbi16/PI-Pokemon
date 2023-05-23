import React from "react";
import style from "./Paginate.module.css";

const Paginate = ({ totalPages, currentPage, onPageChange, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    console.log(pageNumbers.length)
    if(currentPage < pageNumbers.length){
        setCurrentPage(nextPage);
    }

  }
  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    if(currentPage > 1){
        setCurrentPage(prevPage);
    }

  }

  return (
    <div className={style.paginateContainer}>
        <button onClick={handlePrevPage}> ❮ </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? style.activePageButton : style.pageButton}
        >
          {number}
        </button>
      ))}
          <button onClick={handleNextPage}> ❯ </button>
    </div>
  );
};

export default Paginate;