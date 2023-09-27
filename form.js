const form = document.getElementById('new-post');

const c = new Date();
console.log(c);
const d = new Date().toISOString();
console.log(typeof d);

const f = new Date().toISOString().replace('T', ' ').slice(0, 16);
console.log(f);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const title = document.getElementById('title').value;
  const message = document.getElementById('message').value;

  const date = new Date();
  // const day = new Date().toISOString().slice(0, 10);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // const time = `${day} ${hours}:${minutes}`
  const time = `${year}-${month}-${day} ${hours}:${minutes}`

  document.getElementById('time').value = time;

  fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title, message, time})
  })

  window.location.href = "./index.html";
})