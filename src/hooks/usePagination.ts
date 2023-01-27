import React, { useState } from "react";

function usePagination() {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeItemsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    page,
    handleChangePage,
    handleChangeItemsPerPage,
    itemsPerPage,
  };
}

export default usePagination;
