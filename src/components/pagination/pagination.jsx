import React from 'react';
import TablePagination from '@mui/material/TablePagination';

import './pagination.scss';

const TablePaginationDemo = ({
     users,
     handleChangePage,
     handleChangeRowsPerPage,
     page,
     rowsPerPage
   }) => {


  return (
    <TablePagination
      rowsPerPageOptions={ [5, 10, 25] }
      component="div"
      count={ users.length }
      page={ page }
      onPageChange={ handleChangePage }
      rowsPerPage={ rowsPerPage }
      onRowsPerPageChange={ handleChangeRowsPerPage }
    />
  );
}

export default TablePaginationDemo;