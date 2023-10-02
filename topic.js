document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const title = document.getElementById('title');
  const name = document.getElementById('name');
  const date = document.getElementById('date');
  const message = document.getElementById('message');
  const comments = document.getElementById('comments');
  const commentInput = document.getElementById('commentInput');

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

  fetch('http://localhost:3000/comments', config)
    .then(response => response.json())
    .then(data => {
      data.forEach(comment => {
        comments.innerHTML += `
        <div class="font-light mb-2">
          ${comment.comment}
        </div>`;
      });
    });

  commentInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const comment = commentInput.value;

      if (comment.trim() !== '') {
        sendCommentToServer(comment);
        commentInput.value = '';
      }
    }
  });

  function sendCommentToServer(comment) {

    const data = {
      comment: comment,
    };
  
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    window.location.reload()
  }
})