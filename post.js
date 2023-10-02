const formPost = document.getElementById('formPost');
const personSelect = document.getElementById('personSelect');
const config = {
  headers: {
    'Accept': 'application/json',
  },
}

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

formPost.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const title = document.getElementById('title').value;
  const message = document.getElementById('message').value;

  const day = new Date().toISOString().slice(0, 10);
  const time = new Date().toString().slice(16, 21);
  const date = `${day} ${time}`

  const dateFull = new Date().toISOString();

  document.getElementById('date').value = date;

  const personName= personSelect.value;

  fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title, message, date, personName, dateFull})
  })
  window.location.href = "./index.html";
})

persons();

// const f = new Date().toISOString().replace('T', ' ').slice(0, 16);
// console.log(f);

// const a = new Date().toString();
// console.log(a);

// const d = new Date().toString().slice(16, 21);
// console.log(d);

// let s = new Date().toLocaleString();
// console.log(s);