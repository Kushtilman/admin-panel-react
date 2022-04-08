import {constQueries, methodsCase} from '../constants/links'
import fetchIntercept from 'fetch-intercept';

const getToken = () => {
  return localStorage.getItem('accessToken')
}

const requestTemplate = async (url, method, body) => {
  const token = getToken();

  const requestMethod = {
    method,
    // cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? token.replace(/["\']/g, '') : '',
    },
    credentials: 'include'
  }

  if (body) {
    requestMethod.body = JSON.stringify(body)
  }

  const res = await fetch(`${constQueries.BASE_URL}${url}`, requestMethod);

  const originalRequest = {};

  fetchIntercept.register({
    request: function (url, config) {
      originalRequest.url = url;
      originalRequest.config = config;
      return [url, config];
    },

    requestError: function (error) {
      return Promise.reject(error);
    },

    response: async function (response) {
      if (response.status === 401) {
        const {url, config} = originalRequest;

        const resRefreshToken = await refresh('admin/refresh-token')
          .then((response) => {
            return response;
          });
        if (!resRefreshToken.success) {
          return Promise.reject(resRefreshToken);
          window.location = 'http://localhost:3000/login';
        } else {
          const accessToken = resRefreshToken.data.accessToken;
          config['headers']['Authorization'] = `Bearer ${accessToken}`;
          localStorage.setItem('accessToken', `bearer ${accessToken}`);
          return fetch(url, config);
        }
      } else {
        return response;
      }
    },

    responseError: function (error) {
      return Promise.reject(error);
    }
  });

  if (res.status !== 400) {
    return await res.json();
  }
}

export const getAllUsers = async (params = '') => await requestTemplate(params, methodsCase.get)

export const login = async (params = '', email = '', password = '') =>
  await requestTemplate(params, methodsCase.post, {email, password})

export const logout = async (params = '') => await requestTemplate(params, methodsCase.post)

export const viewUser = async (params = '') => await requestTemplate(params, methodsCase.get)

export const createUser = async (params, userName, email, password) =>
  await requestTemplate(params, methodsCase.post, {userName, email, password})

export const deleteUser = async (params = '') => await requestTemplate(params, methodsCase.delete)

export const editUser = async (params, userName, email, password) =>
  await requestTemplate(params, methodsCase.put, {userName, email, password})

export const refresh = async (params = '') => await requestTemplate(params, methodsCase.post)
