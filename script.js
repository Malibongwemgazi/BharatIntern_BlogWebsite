// script.js
const blogPostsList = document.getElementById('blog-posts-list');
const createPostForm = document.getElementById('create-post-form');

// fetch blog posts from API
fetch('/api/posts')
    .then(response => response.json())
    .then(data => {
        data.forEach(post => {
            const postHTML = `
                <li>
                    <a href="#">${post.title}</a>
                    <p>${post.content}</p>
                </li>
            `;
            blogPostsList.innerHTML += postHTML;
        });
    })
    .catch(error => console.error(error));

// create new post
createPostForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const postData = {
        title,
        content
    };

    fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // update blog posts list
        const newPostHTML = `
            <li>
                <a href="#">${data.title}</a>
                <p>${data.content}</p>
            </li>
        `;
        blogPostsList.innerHTML += newPostHTML;
    })
   .catch(error => console.error(error));
});
