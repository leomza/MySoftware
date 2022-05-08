const btnIn = document.querySelector("#loginBtn");
const btnOut = document.querySelector("#logoutBtn");
const btnCreate = document.querySelector("#createBtn");

// Init function - onload index
window.onload = init();

function init() {
    try {
        const currentUrl = window.location.href;
        if (currentUrl === 'http://blog.co/index.php' || currentUrl === 'http://blog.co/') {
            checkCookie();
            getPosts();
        } else if (currentUrl === 'http://blog.co/views/admin.view.php') {
            privateRoute();
        }
    } catch (error) {
        console.error(error);
    }
}

//Check cookie when initilize the page
async function checkCookie() {
    try {
        let userInSession = await getCookie("User_Logged");

        if (userInSession) {
            btnIn.style.display = "none";
            btnOut.style.display = "block";
            btnCreate.style.display = "block";

            document.querySelector("#welcomeTitle").textContent = `Welcome back ${userInSession}!`;
        }
        return userInSession;
    } catch (error) {
        console.error(error);
    }
}

//When press button LogOut
function logOut() {
    try {
        swal({
            title: "Are you sure?",
            text: "If you logout we will miss you a lot!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((closeSession) => {
                if (closeSession) {
                    btnIn.style.display = "block";
                    btnOut.style.display = "none";
                    btnCreate.style.display = "none";
                    document.cookie = "User_Logged = ; expires = Thu, 01 Jan 1970 00:00:00 GMT"; //Remove Cookie
                    window.location.reload();
                }
            });
    } catch (error) {
        console.error(error);
    }
}

//Redirect when click in "Create Post" Button
function redirectToPost() {
    try {
        window.location.href = "views/admin.view.php";
    } catch (error) {
        console.error(error);
    }
}

//Show all posts when initilize the page
async function getPosts() {
    try {
        const allPosts = await axios.get('../rpc/data.rpc.php');
        let { data } = allPosts;
        await renderPost(data);
        insertAdminButton();
    } catch (error) {
        console.error(error);
    }
}

function renderPost(data) {
    try {
        const root = document.querySelector('#root')
        let html = data.map(element => {
            return (
                `<div id='${element.id}' class='post__container'>
                    <div>
                        <div class="post__title"> <b>${element.title.toUpperCase()}</b></div>
                        <div> ${element.body}</div>
                    </div>
                    <div class='post__image-container'><img class='post__image' src=${insertPicture(element.filename, element.id)} alt="Post picture"></div>
                    <div><b>Owner: ${element.username.toUpperCase()}</b></div>
                    <div><b>Creation: ${element.created_at}</b></div>
                    <div id="adminButtonRol">
                        <button class="icon__trash" onclick="deletePost('${element.id}')"><i class="fas fa-trash-alt"></i></button>
                        <button class="icon__edit"  id="editBtn" onclick="editPost('${element.id}','${element.title}','${element.body}','${element.filename}')"><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </div>`
            )
        }).join('');
        root.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

function insertPicture(fileName, id) {
    try {
        if (fileName === 'defaultPost.png') {
            return `./post_images/${fileName}`;
        } else {
            return `./post_images/${id}/${fileName}`;
        }
    } catch (error) {
        console.error(error);
    }
}

async function insertAdminButton() {
    try {
        const userInSession = await checkCookie();
        const allAdminButtons = document.querySelectorAll('#adminButtonRol');
        if (userInSession) {
            allAdminButtons.forEach(element => {
                element.style.display = 'flex';
            });
        } else {
            allAdminButtons.forEach(element => {
                element.style.display = 'none';
            });
        }
    } catch (error) {
        console.error(error);
    }
}

function getCookie(cname) {
    try {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    } catch (error) {
        console.error(error);
    }
}

//Get information for the Form and send it
async function handleSubmit(ev) {
    try {
        ev.preventDefault();
        const username = ev.target.elements.username.value;
        const password = ev.target.elements.password.value;
        const user = { username: username, password: password };

        const userLogged = await axios.post('./rpc/login.rpc.php', user);
        checkStatus(userLogged);
        ev.target.reset();
    } catch (error) {
        console.error(error);
    }
}

function checkStatus(userLogged) {
    try {
        let { data } = userLogged;
        if (Object.keys(data).length === 0) {
            swal("Ohh no!", "The user information is wrong!", "warning");
        }
        else {
            window.location.href = "views/admin.view.php";
        }
    } catch (error) {
        console.error(error);
    }
}


/////////////////////POSTS//////////////////////

//Get information for the Form Post and send it
async function handleSubmitPost(ev) {
    try {
        ev.preventDefault()
        const title = ev.target.elements.title.value;
        const body = ev.target.elements.body.value;

        const file = document.getElementById("image").files[0];
        let fileName;

        let userInSessionName = await getCookie("User_Logged");

        if (file) {
            fileName = file.name;

            const blogPost = { title: title, body: body, userInSessionName: userInSessionName, fileName };
            const posted = await axios.post('../rpc/admin.rpc.php', blogPost);
            let { data } = posted;
            const formData = new FormData();
            formData.append("image", file, `${file.name}`);
            formData.append("postId", data);
            const xhttp = new XMLHttpRequest();
            // Set POST method and ajax file path
            xhttp.open("POST", "../helper/upload.php", true);

            // Send request with data
            xhttp.send(formData);

        } else {
            fileName = 'defaultPost.png';
            const blogPost = { title: title, body: body, userInSessionName: userInSessionName, fileName };
            await axios.post('../rpc/admin.rpc.php', blogPost);
        }
        swal("", "Save successfully!", "info");
        document.querySelector('#previewImage').setAttribute("src", '../assets/defaultPost.png');
        ev.target.reset();
    } catch (error) {
        console.error(error);
    }
}

//Function to show the previous image in the form:
function readURL(input) {
    try {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = (e) => {
                try {
                    document.querySelector('#previewImage').setAttribute("src", `${e.target.result}`);
                } catch (error) {
                    console.error(error);
                }
                return e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    } catch (error) {
        console.error(error);
    }
}

//Check if it contains Cookie, if not go back to HomePage
async function privateRoute() {
    try {
        let userInSession = await getCookie("User_Logged");

        if (!userInSession) {
            window.location.href = "../index.php";
        }
    } catch (error) {
        console.error(error);
    }
}

//Function to show or not the password
function togglePassword(ev) {
    try {
        const inputPassword = document.getElementById("password");
        const type = inputPassword.getAttribute("type") === "password" ? "text" : "password";
        inputPassword.setAttribute("type", type);

        // Toggle the icon
        ev.target.classList.toggle("bi-eye");
    } catch (error) {
        console.error(error);
    }
}

function deletePost(postId) {
    try {
        swal({
            title: "Are you sure?",
            text: "If you delete is going to be forever!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((removePost) => {
                if (removePost) {
                    axios.delete('./rpc/deletePost.rpc.php', { data: { postId } }).then((success) => {
                        if (success) {
                            getPosts();
                        }
                    });
                }
            });
    } catch (error) {
        console.error(error);
    }
}

function editPost(postId, title, body, filename) {
    try {
        const modalToEdit = document.querySelector("#myModalEdit");
        modalToEdit.style.display = "block";

        const formEdit = document.querySelector("#formEdit");
        let html = `
            <div class="formEdit__wrapper">
                    <h3 class="form_posts_subtitle">Edit your post</h3>

                    <label for="title">Enter a title</label>
                    <input type="text" name="titleEdit" value="${title}" required>

                    <br>

                    <label for="body">Enter a body</label>
                    <textarea id="body" name="bodyEdit" cols="30" rows="10" required>${body}</textarea>

                    <br>

                    <label for="image">Enter an image</label>
                    <input type="file" id="imageEdit" name="imageEdit" onchange="readURL(this);">
                    
                    <div class="form_posts_image">
                        <img id="previewImage" src="${insertPicture(filename, postId)}">
                    </div>    


                    <button class="form_posts_submit" onclick="handleEdit('${postId}', '${filename}')">Update Post</button>
            </div>`
        formEdit.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

async function handleEdit(postId, prevImage) {
    try {
        const modalToEdit = document.querySelector("#myModalEdit");
        const title = document.querySelector('input[name="titleEdit"]').value;
        const body = document.querySelector('textarea[name="bodyEdit"]').value;
        const file = document.getElementById("imageEdit").files[0];
        let fileName;

        if (file) {
            fileName = file.name;

            const blogPost = { postId, title: title, body: body, fileName };
            await axios.post('./rpc/editPost.rpc.php', blogPost);
            const formData = new FormData();
            formData.append("imageEdit", file, `${file.name}`);
            formData.append("postId", postId);
            const xhttp = new XMLHttpRequest();
            // Set POST method and ajax file path
            xhttp.open("POST", "../helper/upload.php", true);

            // Send request with data
            xhttp.send(formData);

        } else {
            fileName = prevImage;
            const blogPost = { postId, title: title, body: body, fileName };
            await axios.post('./rpc/editPost.rpc.php', blogPost);
        }
        modalToEdit.style.display = "none";
        getPosts();
    } catch (error) {
        console.error(error);
    }
}