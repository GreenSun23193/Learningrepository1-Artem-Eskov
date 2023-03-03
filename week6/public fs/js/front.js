'use strict';
const url = 'https://localhost:8000';

const ul = document.querySelector('#list');

const user = JSON.parse(sessionStorage.getItem('user'));

let search_input = document.getElementById('search_bar_front').value;

console.log('front.js search_input: ');
console.log(search_input);

const createFileCards = (files) => {

  ul.innerHTML = '';
  files.forEach((file) => {

    var inserted_file_card;
    var video_audio_source;

    if (file.file_type == 0) {

      console.log("It's an image!");

      inserted_file_card = document.createElement('img');
      inserted_file_card.src = url + '/uploads/' + file.filename;
      inserted_file_card.alt = file.name;
      inserted_file_card.classList.add('resp');
      inserted_file_card.addEventListener('click', () => {
      location.href = 'single.html?id=' + file.file_id;
      });
    }



    else if (file.file_type == 1) {

      console.log("It's a video!");

      inserted_file_card = document.createElement('video');
      video_audio_source = document.createElement('source');
      video_audio_source.src = url + '/uploads/' + file.filename;
  
      inserted_file_card.appendChild(video_audio_source);
      inserted_file_card.width = 200;
     
      inserted_file_card.controls = true;
      inserted_file_card.classList.add('resp');
      inserted_file_card.addEventListener('click', () => {
      location.href = 'single.html?id=' + file.file_id;
      });
    }

    else if (file.file_type == 2) {

      console.log("It's an audio!");

      inserted_file_card = document.createElement('audio');
      video_audio_source = document.createElement('source');
      video_audio_source.src = url + '/uploads/' + file.filename;
  
      inserted_file_card.appendChild(video_audio_source);
      inserted_file_card.width = 200;
     
      inserted_file_card.controls = true;
      inserted_file_card.classList.add('resp');
      inserted_file_card.addEventListener('click', () => {
      location.href = 'single.html?id=' + file.file_id;
    });
    }

    else {
      console.log("Wrong file type.");
    }

    const figure = document.createElement('figure').appendChild(inserted_file_card);

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
    let search_input = document.getElementById('search_bar_front').value;

    console.log('front.js search_input: ');
    console.log(search_input);

    var [files] = [];
    if (search_input == "" || search_input == null) {
      files = [];
    }
    else {

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    console.log('front.html search_input:');
    console.log(search_input);

    const response = await fetch(url + '/file/search/' + search_input, fetchOptions);
    if (response.status == 404)
       return;

    console.log('front.js response: ');
    console.log(response);

    files = await response.json();
    }
    console.log('front.js files: ');
    console.log(files);
    createFileCards(files);
  } catch (e) {
    console.log(e.message);
  }
};
getFile();
