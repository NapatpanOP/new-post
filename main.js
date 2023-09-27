const newPosts = document.getElementById('board-posts');

boardPosts()

function boardPosts() {
  const config = {
    headers: {
      'Accept': 'application/json',
    },
  }

  fetch('http://localhost:3000/posts', config)
    .then((response) => response.json())
    .then((datas) => {
      // console.log(datas);
      datas.forEach(data => {
        // console.log(data);
        newPosts.innerHTML += `
        <div class="flex gap-16 mt-8">
          <div class="font-light">
            ${data.id}
          </div>
          <div>
            <h3 class="font-semibold text-gray-600">${data.title}</h3>
            <div class="font-light text-sm mb-2 text-gray-500">${data.time}</div>
            <div class="font-light">${data.message}</div>
          </div>
        </div>`
      });
    })

}