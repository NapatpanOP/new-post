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
    .then((data) => {
      // console.log(data);
      data.sort((a, b) => b.date.localeCompare(a.date));
      
      data.forEach((post, index) => {
        // console.log(data);
        newPosts.innerHTML += `
        <div class="flex gap-12 mt-8">
          <div class="font-light">
            ${index + 1}
          </div>
          <div class="flex content-between gap-8 max-w-5xl w-full">
            <div class="w-full">
              <h3 class="font-semibold text-gray-600">${post.title}</h3>
              <div class="font-light text-sm mb-2 text-gray-500">${post.date}</div>
              <div class="font-light">${post.message}</div>
            </div>
            <div class="flex gap-4">
              <a href="./edit-post.html?id=${post.id}" id="edit-post" class="font-light text-xs text-gray-400 underline hover:text-gray-500">Edit</a>
              <button id="deleteBtn" class="font-light text-xs text-gray-400 bg-transparent h-fit underline hover:text-gray-500" type="button" onclick="btnDelete(event)" data-id="${post.id}">Delete</button>
            </div>
          </div>
        </div>`
      });
    })
}

function btnDelete(event) {
  const postId = event.target.dataset.id;
  
  if (btnDelete) {
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'DELETE'
    })
  }
}
