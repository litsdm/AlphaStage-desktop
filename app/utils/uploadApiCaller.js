import fetch from 'isomorphic-fetch';

export function callUploadApi(endpoint, method = 'get', payload) {
  return fetch(`http://localhost:8080/${endpoint}`, {
    //headers: { 'content-type': 'multipart/form-data; boundary=blob' },
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

export function callDownloadApi(endpoint, method = 'get', body) {
  return fetch(`http://localhost:8080/${endpoint}`, {
    //headers: { 'content-type': 'multipart/form-data; boundary=blob' },
    method,
    body: JSON.stringify(body),
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
