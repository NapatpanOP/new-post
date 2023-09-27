document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  fetch(`http://localhost:3000/posts/${postId}`)
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

    document.getElementById('date').value = date;

    fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, message, date })
    })

    window.location.href = "./index.html";
  })
})