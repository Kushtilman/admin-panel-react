import React, {useEffect, useState} from 'react';
import UserItem from '../user-item/user-item';
import {Table} from 'react-bootstrap';
import {deleteUser, getAllUsers} from '../../services/api-service';
import Loading from '../loading/loading';
import TablePaginationDemo from '../pagination/pagination';
import {useSearchParams} from 'react-router-dom';
import Search from '../search/search';
import './user-list.scss';

const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // const search = (search) => {
  //   setSearchValue(search);
  //   const updateSearchParams = new URLSearchParams(searchParams.toString());
  //   if (search === '') {
  //     updateSearchParams.delete('search')
  //   } else {
  //     updateSearchParams.set('search', search)
  //     updateSearchParams.set('page', 1);
  //   }
  //   setSearchParams(updateSearchParams.toString());
  //   setPage(1);
  // }

  const page = searchParams.get('page') || 0;
  const rowsPerPage = searchParams.get('limit') || 5;
  const searchTerm = searchParams.get('search') || '';
  // const sort = searchParams.get('sort') || 'ASC';
  // const type = searchParams.get('type') || 'id' || 'userName' || 'email';

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sort, setSort] = useState('ASC');
  const [type, setType] = useState('id');
  const [modal, setModal] = useState(false);
  // const [count, setCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getAllUsers(`admin?sort=${type},${sort}`)
      .then((data) => {
        setUsers(data.data);
        setIsLoading(false);
      });
  }, [type, sort]);

  // sorting
  // const handleSort = (newType) => {
  //   console.log('setSearchParams', setSearchParams({[newType]: sort}));
  //   console.log('type', type);
  //   if (type !== newType) {
  //     setSort('ASC');
  //   } else if (type === newType) {
  //     if (sort === 'DESC') {
  //       setSort('ASC');
  //     } else {
  //       setSort('DESC');
  //     }
  //   } else {
  //     setSort('ASC');
  //   }
  //   setSearchParams({[newType]: sort});
  //   console.log('setSearchParams', setSearchParams({[newType]: sort}));
  // };

  // sorting
  const handleSort = (newType) => {
    setType(newType);
    if (type !== newType) {
      setSort('ASC');
    } else if (type === newType) {
      if (sort === 'DESC') {
        setSort('ASC');
      } else {
        setSort('DESC');
      }
    } else {
      setSort('ASC');
    }
    setSearchParams({sort: sort});
  };

  // pagination
  const handleChangePage = (e, newPage) => {
    if (newPage) {
      setSearchParams({page: newPage});
    } else {
      setSearchParams({});
    }
  };

  const handleChangeRowsPerPage = (e) => {
    const limit = e.target.value;
    if (limit) {
      setSearchParams({limit});
    } else {
      setSearchParams({});
    }
  };

  // search
  const searchUsers = users.filter((user) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearch = (e) => {
    const search = e.target.value;
    if (search) {
      setSearchParams({search});
    } else {
      setSearchParams({});
    }
  };

  // delete user
  const removeUser = (id) => {
    setIsLoading(true);
    deleteUser(`admin/${id}`)
      .then(() => {
        getAllUsers(`admin?sort=${type},${sort}`)
          .then((data) => {
            setUsers(data.data);
            setIsLoading(false);
            setModal(false);
          });
      });
  };

  return (
    <div className="container">
      {isLoading ?
        <Loading/> :
        <>
          <Search searchTerm={searchTerm} handleSearch={handleSearch}/>

          <Table className="user-list" striped bordered hover>
            <thead>
              <tr>
                <th>id
                  <button className="btn">
                    <span
                      className="icon icon-arrow"
                      onClick={() => handleSort('id')}
                    >
                    </span>
                  </button>
                </th>
                <th>username
                  <button className="btn">
                    <span
                      className="icon icon-arrow"
                      onClick={() => handleSort('userName')}
                    >
                    </span>
                  </button>
                </th>
                <th>e-mail
                  <button className="btn">
                    <span
                      className="icon icon-arrow"
                      onClick={() => handleSort('email')}
                    >
                    </span>
                  </button>
                </th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>{searchUsers.length ?
              (rowsPerPage > 0 ?
                searchUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                searchUsers).map((user) =>
                <UserItem
                  removeUser={removeUser}
                  user={user}
                  key={user.id}
                  visible={modal}
                  setVisible={setModal}
                />) :
              <tr className="no-users">
                <td colSpan="4">No Users!</td>
              </tr>
            }
            </tbody>
          </Table>

          <TablePaginationDemo
            users={searchUsers}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={+page}
            rowsPerPage={+rowsPerPage}
            // count={count}
          />
        </>
      }
    </div>
  );
};

export default UserList;
