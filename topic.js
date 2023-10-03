const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const title = document.getElementById('title');
const personName = document.getElementById('name');
const date = document.getElementById('date');
const message = document.getElementById('message');
const comments = document.getElementById('comments');
const commentInput = document.getElementById('commentInput');
let commentCount = 0;

// console.log(postId);
  
const config = {
  headers: {
    'Accept': 'application/json',
  },
}

fetch(`http://localhost:3000/posts/${postId}`, config)
    .then(response => response.json())
    .then(data => {
      title.innerHTML = data.title;
      personName.innerHTML = data.personName;
      date.innerHTML = data.date;
      message.innerHTML = data.message;
    });

fetch(`http://localhost:3000/comments?postId=${postId}`, config)
.then(response => response.json())
.then(data => {
  // console.log(data);
  commentCount = data.length;
  data.forEach(comment => {
    comments.innerHTML += `
      <div class="font-light mb-4">
        ${comment.comment}
      </div>`;
  });
});

commentInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const comment = commentInput.value;
    
    if (comment.trim() !== '') {
      sendComment(comment, postId);
      commentInput.value = '';
    }
  }
});

function sendComment(comment, postId) {
  const data = {
    commentCount: commentCount + 1,
    comment: comment,
    postId: postId
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