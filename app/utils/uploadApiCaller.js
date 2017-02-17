import fetch from 'isomorphic-fetch';

let token = localStorage.getItem('id_token') || null

export function callUploadApi(endpoint, method = 'get', payload) {
  return fetch(`http://localhost:8080/${endpoint}`, {
    headers: { 'Authorization': `Bearer ${token}` },
    method,
    body: payload,
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}

export function callDownloadApi(endpoint, method = 'get') {
  return fetch(`http://localhost:8080/${endpoint}`, {
    //headers: { 'content-type': 'multipart/form-data; boundary=blob' },
    method
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
