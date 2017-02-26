import fetch from 'isomorphic-fetch';

let token = localStorage.getItem('id_token') || null

export function callUploadApi(endpoint, method = 'get', payload) {
  return fetch(`http://www.alphastagegames.com/${endpoint}`, {
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

export function uploadGameBuild(url, method = 'put', file) {
  return fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` },
    method,
    body: file,
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
