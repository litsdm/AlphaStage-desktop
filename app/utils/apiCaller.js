import fetch from 'isomorphic-fetch';

export const API_URL = `http://localhost:8080/api`//`http://www.alphastagegames.com/api`

let token = localStorage.getItem('id_token') || null

console.log(token);

export default function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
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
