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
        <div class="flex gap-12 mt-8">
          <div class="font-light">
            ${data.id}
          </div>
          <div class="flex content-between gap-8 max-w-5xl w-full">
            <div class="w-full">
              <h3 class="font-semibold text-gray-600">${data.title}</h3>
              <div class="font-light text-sm mb-2 text-gray-500">${data.date}</div>
              <div class="font-light">${data.message}</div>
            </div>
            <div>
              <a href="./edit-post.html" class="font-light text-xs text-gray-400 underline hover:text-gray-500">Edit</a>
            </div>
          </div>
        </div>`
      });
    })

}