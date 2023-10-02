const boardPosts = document.getElementById('board-posts');

showAllPosts()

function showAllPosts() {
  const config = {
    headers: {
      'Accept': 'application/json',
    },
  }

  fetch('http://localhost:3000/posts', config)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      data.sort((a, b) => b.dateFull.localeCompare(a.dateFull));

      data.forEach((post, index) => {
        // console.log(data);
        boardPosts.innerHTML += `
        <div class="flex gap-12 mt-8">
          <div class="font-light">
            ${index + 1}
          </div>
          <div class="flex content-between gap-8 max-w-5xl w-full">
            <div class="w-full">
              <h3 class="font-semibold text-gray-600">${post.title}</h3>
              <div class="flex gap-4">
                <div class="font-light text-sm mb-2 text-gray-500">By <span class="font-medium text-gray-500">${post.personName}</span></div>
                <div class="font-light text-sm mb-2 text-gray-500">${post.date}</div>
              </div>
              <div class="font-light">${post.message}</div>
            </div>
            <div class="flex gap-4 relative">
              <button class="btn-delete relative font-light text-xs text-gray-400 bg-transparent h-fit underline hover:text-gray-500" type="button" data-id="${post.id}">Delete</button>
              <div class="after:absolute after:contents[''] after:w-[1px] after:h-4 after:bg-gray-400"></div>
              <a href="./edit-post.html?id=${post.id}" id="edit-post" class="font-light text-xs text-gray-400 underline hover:text-gray-500">Edit</a>
            </div>
          </div>
        </div>`
      });

      let buttons = document.querySelectorAll('.btn-delete')

      // console.log(buttons);

      buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
          const postId = event.target.dataset.id;
          const confirmDelete = confirm("Are you sure you want to delete?");

          if(confirmDelete) {
            fetch(`http://localhost:3000/posts/${postId}`, {
              method: 'DELETE'
            })
          }

          window.location.reload()
        })
      })

    })
}