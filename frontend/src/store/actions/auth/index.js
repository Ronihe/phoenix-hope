import { callAPI } from '../../../services/api';
import { setToken, clearToken, getToken } from '../../../services/token';
import jwtDecode from 'jwt-decode';
import * as t from '../actionTypes';

export function authRequest(type, username, password) {
  return async dispatch => {
    try {
      dispatch({ type: t.USER_AUTH_REQUEST });
      let { token } = await callAPI('POST', '/auth/login', false, {
        username: username,
        password
      });
      dispatch(authSuccess('user', token));
    } catch (error) {
      dispatch(authFail('user', error));
      return Promise.reject();
    }
  };
}

export function authSuccess(type, token) {
  setToken(token);
  return { type: t.USER_AUTH_SUCCESS };
}

export function authFail(type, error) {
  return { type: t.USER_AUTH_FAIL, error };
}

export function stayLoggedIn() {
  let token = getToken();
  try {
    let decoded = jwtDecode(token);
    if (decoded.username) {
      return { type: t.USER_TOKEN_FOUND, username: decoded.username };
    } else if (decoded.handle) {
      // login for companies --> not yet implemented
    } else {
      return { type: t.NO_TOKEN_FOUND };
    }
  } catch (err) {
    return { type: t.NO_TOKEN_FOUND };
  }
}

export function logout() {
  // clear the token from localStorage
  clearToken();
  return { type: t.LOGOUT };
}
