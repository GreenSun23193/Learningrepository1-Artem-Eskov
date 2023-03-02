'use strict';
const url = 'https://localhost:8000';

const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const file_id = getQParam('id');

const modForm = document.querySelector('#modFileForm');
const userList = document.querySelector('.add-owner');

const user = JSON.parse(sessionStorage.getItem('user'));

if (user.role > 0) userList.remove();

const getFile = async (id) => {
  const fetchOptions = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  const response = await fetch(url + '/file/' + id, fetchOptions);
  const file = await response.json();
  const inputs = modForm.querySelectorAll('input');
  inputs[0].value = file.description;
  if (user.role === 0) modForm.querySelector('select').value = file.owner;
};

const createUserOptions = (users) => {
  userList.innerHTML = '';
  users.forEach((user) => {
    const option = document.createElement('option');
    option.value = user.user_id;
    option.innerHTML = user.name;
    option.classList.add('light-border');
    userList.appendChild(option);
  });
  getFile(file_id);
};

const getUsers = async () => {
  try {
    const options = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user', options);
    const users = await response.json();
    createUserOptions(users);
  } catch (e) {
    console.log(e.message);
  }
};

modForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(modForm);
  for (const [prop, value] of Object.entries(data)) {
    if (value === '') {
      delete data[prop];
    }
  }
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };

  console.log(fetchOptions);
  const response = await fetch(url + '/file/' + file_id, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
  location.href = 'front.html';
});

if (user.role === 0) {
  getUsers();
} else {
  getFile(file_id);
}
