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
      // data.sort((a, b) => b.dateFull.localeCompare(a.dateFull));
      data.sort((a, b) => new Date(b.dateFull) - new Date(a.dateFull));

      data.forEach((post, index) => {
        // console.log(post, index);

        fetch(`http://localhost:3000/comments?postId=${post.id}`, config)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          const commentCount = data.length;
          // console.log(commentCount);
          // console.log(typeof commentCount);
          const commentCountElement = document.getElementById(`commentCountNumber${post.id}`);
            commentCountElement.innerText = commentCount;
        });

        boardPosts.innerHTML += `
        <div class="flex gap-12 mt-8">
          <div class="font-light">
            ${index + 1}
          </div>
          <div class="flex content-between gap-8 max-w-5xl w-full">
            <div class="w-full">
              <div class="flex gap-4 items-center">
                <a href="./topic.html?id=${post.id}" class="font-semibold text-gray-600 hover:underline">${post.title}</a>
                <div class="flex gap-1 items-center">
                  <i class="fa-regular fa-comment text-gray-400 text-sm"></i>
                  <div id="commentCountNumber${post.id}" class="font-light text-sm text-gray-400"></div>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="font-light text-sm mb-2 text-gray-500">By <span class="font-medium text-gray-500">${post.personName}</span></div>
                <div class="font-light text-sm mb-2 text-gray-500">${post.date}</div>
              </div>
              <div class="font-light mb-4">${post.message}</div>
            </div>
            <div class="flex gap-4 relative">
              <button class="btn-delete relative font-light text-xs text-gray-400 bg-transparent h-fit underline hover:text-gray-500" type="button" data-id="${post.id}">Delete</button>
              <div class="after:absolute after:contents[''] after:w-[1px] after:h-4 after:bg-gray-400"></div>
              <a href="./edit-post.html?id=${post.id}" class="font-light text-xs text-gray-400 underline h-fit hover:text-gray-500">Edit</a>
            </div>
          </div>
        </div>`
      });

      // Delete Function
      let buttons = document.querySelectorAll('.btn-delete');
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