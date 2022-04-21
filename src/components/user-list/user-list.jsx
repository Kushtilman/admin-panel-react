import React, {useEffect, useState} from 'react';
import UserItem from "../user-item/user-item";
import {Table} from 'react-bootstrap';
import {deleteUser, getAllUsers} from '../../services/api-service';

import './user-list.scss';
import Loading from "../loading/loading";
import TablePaginationDemo from "../pagination/pagination";
import {useSearchParams} from "react-router-dom";
import Search from "../search/search";

const UserList = () => {
  // const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParams = searchParams.get("sort") || '';
  console.log("sortParams", sortParams)

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sort, setSort] = useState('ASC');
  const [type, setType] = useState('id');
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getAllUsers(`admin?sort=${sort}&type=${type}&limit=${page}`)
      .then((data) => {
        setUsers(data.data)
        setIsLoading(false);
      })
  }, [type, sort, page])

  //pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSearchParams({page: newPage + 1});
  };

  const handleChangeRowsPerPage = (event) => {
    const page = event.target.value;
    setRowsPerPage(parseInt(page));
    setSearchParams({limit: page});
  };

  //sorting
  const handleSort = (newType) => {
    setType(newType);
    if (type !== newType) {
      setSort('ASC')
    } else if (type === newType) {
      if (sort === 'DESC') {
        setSort('ASC')
      } else {
        setSort('DESC')
      }
    } else {
      setSort('ASC')
    }
    setSearchParams({sort: sort});
  }

  //delete user
  const removeUser = (id) => {
    setIsLoading(true);
    deleteUser(`admin/${id}`)
      .then(() => {
        getAllUsers(`admin?sort=${type},${sort}`)
          .then((data) => {
            setUsers(data.data)
            setIsLoading(false);
            setModal(false);
          })
      })
  };

  //search
  const searchUsers = users.filter(user => {
    return user.userName.toLowerCase().includes(search.toLowerCase())
  });

  return (
    <div className='container'>
      {isLoading
        ? <Loading/>
        : <>
          <Search
            setSearch={setSearch}
          />

          <Table className='user-list' striped bordered hover>
            <thead>
            <tr>
              <th>id
                <button className='btn'>
                  <span
                    className="icon icon-arrow"
                    onClick={() => handleSort('id')}>{searchParams.get("id")}
                  </span>
                </button>
              </th>
              <th>username
                <button className='btn'>
                  <span
                    className="icon icon-arrow"
                    onClick={() => handleSort('userName')}>
                  </span>
                </button>
              </th>
              <th>e-mail
                <button className='btn'>
                  <span
                    className="icon icon-arrow"
                    onClick={() => handleSort('email')}>
                  </span>
                </button>
              </th>
              <th>actions</th>
            </tr>
            </thead>
            <tbody>{searchUsers.length
              ? (rowsPerPage > 0
                ? searchUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : searchUsers).map((user) =>
                <UserItem
                  removeUser={removeUser}
                  user={user}
                  key={user.id}
                  visible={modal}
                  setVisible={setModal}
                />)
              : <tr className='no-users'>
                  <td colSpan='4'>No Users!</td>
                </tr>
            }
            </tbody>
          </Table>

          <TablePaginationDemo
            users={searchUsers}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
          />

          <button onClick={handleChangeRowsPerPage()}>+</button>
        </>
      }
    </div>
  );
};

export default UserList;
