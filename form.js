const form = document.getElementById('new-post');

// const f = new Date().toISOString().replace('T', ' ').slice(0, 16);
// console.log(f);

// const a = new Date().toString();
// console.log(a);

// const d = new Date().toString().slice(16, 21);
// console.log(d);

// let s = new Date().toLocaleString();
// console.log(s);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const title = document.getElementById('title').value;
  const message = document.getElementById('message').value;

  const day = new Date().toISOString().slice(0, 10);
  const time = new Date().toString().slice(16, 21);
  const date = `${day} ${time}`

  document.getElementById('date').value = date;

  fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title, message, date})
  })

  window.location.href = "./index.html";
})