import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import './pagination.scss';
import PropTypes from 'prop-types';

const TablePaginationDemo = ({
  users,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
}) => {
  // const count = users.length % rowsPerPage.limit;

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={users.length}
      page={(page > 0 && users.length < rowsPerPage) ? 0 : page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

TablePaginationDemo.propTypes = {
  users: PropTypes.array,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
};

export default TablePaginationDemo;
