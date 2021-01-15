import fetch from 'isomorphic-fetch';
import { API_URL_BACKEND } from './index';
import queryString from 'query-string';

export function apiFetch(endpoint, options = {}, query = false) {
  let qs;

  if (query) {
    qs = queryString.stringify(query);
  }

  const getPromise = async () => {
    try {
      const fetchOptions = apiOptions(options);
      const fetchEndpoint = apiEndpoint(endpoint, qs);
      const response = await fetch(fetchEndpoint, fetchOptions);
      if(response.status === 401){
        throw new Error("Credenciales incorrectas");
      }
      return response.json();
    } catch (e) {
      throw e;
    }
  };

  return getPromise();
}

export function apiEndpoint(endpoint, qs) {
  let query = '';

  if (qs) {
    query = `?${qs}`;
  }

  return `${API_URL_BACKEND}${endpoint}${query}`;
}

export function apiOptions(options = {}) {
  const accessToken = localStorage.accessToken
  const {
    method = 'GET',
    headers = {
      'Content-Type': 'application/json'
    },
    body = false
  } = options;
  
  headers.accessToken = accessToken
  
  const newOptions = {
    method,
    headers
  };

  if (body) {
    newOptions.body = headers['Content-Type'] ? JSON.stringify(body) : body;
  }

  return newOptions;
}
