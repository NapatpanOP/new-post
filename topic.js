document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const title = document.getElementById('title');
  const name = document.getElementById('name');
  const date = document.getElementById('date');
  const message = document.getElementById('message');

  const config = {
    headers: {
      'Accept': 'application/json',
    },
  }

  fetch(`http://localhost:3000/posts/${postId}`, config)
      .then(response => response.json())
      .then(data => {
        title.innerHTML = data.title;
        name.innerHTML = data.personName;
        date.innerHTML = data.date;
        message.innerHTML = data.message;
      });
})