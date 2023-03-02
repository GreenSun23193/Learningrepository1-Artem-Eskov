'use strict';
const url = 'https://localhost:8000';

const ul = document.querySelector('#list');

const user = JSON.parse(sessionStorage.getItem('user'));

//const addForm = document.querySelector('#addFileFormSearch');

let search_input = document.getElementById('search_bar_front').value;

const createFileCards = (files) => {

  ul.innerHTML = '';
  files.forEach((file) => {

    const img = document.createElement('img');
    img.src = url + '/uploads/' + file.filename;
    img.alt = file.name;
    img.classList.add('resp');
    img.addEventListener('click', () => {
      location.href = 'single.html?id=' + file.file_id;
    });

    const figure = document.createElement('figure').appendChild(img);

    const h4 = document.createElement('h4');
    h4.innerHTML = file.name;

    const p1 = document.createElement('p');
    p1.innerHTML = `${file.description}`;

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h4);
    li.appendChild(figure);
    li.appendChild(p1);
    ul.appendChild(li);
    if (user.role === 0 || user.user_id === file.owner) {
      const modButton = document.createElement('a');
      modButton.innerHTML = 'Modify';
      modButton.href = `modify-file.html?id=${file.file_id}`;
      modButton.classList.add('button');

      const delButton = document.createElement('button');
      delButton.innerHTML = 'Delete';
      delButton.classList.add('button');
      delButton.addEventListener('click', async () => {
        const fetchOptions = {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        };
        try {
          const response = await fetch(
            url + '/file/' + file.file_id,
            fetchOptions
          );
          const json = await response.json();
          console.log('delete response', json);
          getFile();
        } catch (e) {
          console.log(e.message);
        }
      });

      li.appendChild(modButton);
      li.appendChild(delButton);
    }
  });
};

const getFile = async () => {
  try {
    //search_input
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      search_result: search_input,
    };
    const response = await fetch(url + '/file', fetchOptions);
    const files = await response.json();
    createFileCards(files);
  } catch (e) {
    console.log(e.message);
  }
};
getFile();
