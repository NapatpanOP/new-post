document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const personSelect = document.getElementById('personSelect');

  const config = {
    headers: {
      'Accept': 'application/json',
    },
  }

  persons() 

  function persons() {
    fetch('http://localhost:3000/persons', config)
      .then(response => response.json())
      .then(data => {
        data.forEach(person => {
          // console.log(person);
          const option = document.createElement('option');
          option.value = person.name;
          option.textContent = person.name;
          personSelect.appendChild(option);
        });
      });
  }

  fetch(`http://localhost:3000/posts/${postId}`, config)
      .then(response => response.json())
      .then(data => {
        document.getElementById('title').value = data.title;
        document.getElementById('message').value = data.message;
      });

  const editPost = document.getElementById('edit-post');

  editPost.addEventListener('submit', (even) => {
    even.preventDefault();

    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;

    const day = new Date().toISOString().slice(0, 10);
    const time = new Date().toString().slice(16, 21);
    const date = `${day} ${time}`

    const dateFull = new Date().toISOString()

    document.getElementById('date').value = date;

    const personName= personSelect.value;

    fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, message, date, personName, dateFull})
    })
    window.location.href = "./index.html";
  })
})