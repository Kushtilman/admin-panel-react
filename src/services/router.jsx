import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";

import Login from "../components/login/login";
import UserList from "../components/user-list/user-list";
import AdminInfo from "../components/admin-info/admin-info";
import Page404 from "../components/page-404/page-404";
import HomePage from "../components/home-page/home-page";
import UserView from "../components/user-view/user-view";
import UserCreate from "../components/user-create/user-create";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={ <HomePage/> }/>
      <Route path="login" element={ <Login /> }/>
      <Route path="user-list" element={ <UserList/> }>
        <Route path="?:sort" element={ <UserList/> }/>
      </Route>
      <Route path="user-list/:id" element={ <UserView/> }/>
      <Route path="create-user" element={ <UserCreate/> }/>
      <Route path="user-list/edit-user/:id" element={ <UserCreate/> }/>
      <Route path="admin-info" element={ <AdminInfo/> }/>
      <Route path="404" element={ <Page404/> }/>
      <Route path="*" element={ <Navigate to="404"/> }/>
    </Routes>
  );
};

export default Router;
