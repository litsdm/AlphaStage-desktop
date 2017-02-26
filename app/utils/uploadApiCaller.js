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

export function uploadGameBuild(method, url, file, done) {
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

/*export function uploadGameBuild(url, method, file) {
  return fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` },
    method,
    file,
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
}*/
