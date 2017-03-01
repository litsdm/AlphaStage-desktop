import fetch from 'isomorphic-fetch';

export default function uploadFileDirectly(method, url, file, done) {
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
