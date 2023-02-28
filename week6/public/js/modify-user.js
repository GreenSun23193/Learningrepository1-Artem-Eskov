'use strict';
const url = 'https://localhost:8000';

const modUserForm = document.querySelector('#modUserForm');

modUserForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(modUserForm);
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

  const response = await fetch(url + '/user', fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
  location.href = 'front.html';
});
