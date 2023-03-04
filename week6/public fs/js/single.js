'use strict';
const url = 'https://localhost:8000';

const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const file_id = getQParam('id');

var file_insert;
var source_insert;

const getFile = async (id) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  const response = await fetch(url + '/file/' + id, fetchOptions);

  console.log("sigle.js response: ");
  console.log(response);

  const file = await response.json();

  console.log("sigle.js file: ");
  console.log(file);

  if (file.file_type == 0) {
    file_insert = document.querySelector('img');
    file_insert.src = url + '/uploads/' + file.filename;
    file_insert.style = "display:inherit";
    //file_insert.classList.add('resp');
  }
  else if (file.file_type == 1) {
    file_insert = document.querySelector('video');
    source_insert = document.querySelectorAll('source')[0];
    source_insert.src = url + '/uploads/' + file.filename;
    file_insert.style = "display:inherit";
    source_insert.style = "display:inherit";
    //file_insert.classList.add('resp');
  }
  else if (file.file_type == 2) {
    file_insert = document.querySelector('audio');
    source_insert = document.querySelectorAll('source')[0];
    source_insert.src = url + '/uploads/' + file.filename;
    file_insert.style = "display:inherit";
    source_insert.style = "display:inherit";
    //file_insert.classList.add('resp');
  }
  else{
    console.log("Something went wrong with getFile function.");
    return;
  }

};

getFile(file_id);
