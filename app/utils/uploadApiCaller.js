import fetch from 'isomorphic-fetch';

export function callUploadApi(endpoint, method = 'get', payload) {
  let token = localStorage.getItem('id_token') || null

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

export function uploadFileDirectly(method, url, file, done) {
  let token = localStorage.getItem('id_token') || null

  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = function () {
    done(null, xhr.response);
  };
  xhr.onerror = function () {
    done(xhr.response);
  };
  xhr.send(file);
}
