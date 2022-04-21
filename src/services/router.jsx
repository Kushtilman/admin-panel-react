import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";

import Login from "../components/login/login";
import UserList from "../components/user-list/user-list";
import AdminInfo from "../components/admin-info/admin-info";
import Page404 from "../components/page-404/page-404";
import HomePage from "../components/home-page/home-page";
import UserView from "../components/user-view/user-view";
import UserCreate from "../components/user-create/user-create";
import RequireAuth from "../hocs/requireAuth";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage/>}/>
      <Route path="user-list" element={
        <RequireAuth>
          <UserList/>
        </RequireAuth>
      }>
        <Route path="[?:sort, :type, :page, :limit]" element={
          <RequireAuth>
            <UserList/>
          </RequireAuth>
        }/>
      </Route>
      }
      <Route path="user-list/:id" element={
        <RequireAuth>
          <UserView/>
        </RequireAuth>
      }/>
      <Route path="create-user" element={
        <RequireAuth>
          <UserCreate/>
        </RequireAuth>
      }/>
      <Route path="user-list/edit-user/:id" element={
        <RequireAuth>
          <UserCreate/>
        </RequireAuth>
      }/>
      <Route path="admin-info" element={
        <RequireAuth>
          <AdminInfo/>
        </RequireAuth>
      }/>
      <Route path="login" element={<Login/>}/>
      <Route path="404" element={<Page404/>}/>
      <Route path="*" element={<Navigate to="404"/>}/>
    </Routes>
  );
};

export default Router;
