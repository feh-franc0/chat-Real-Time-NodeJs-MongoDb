const room = window.location.pathname.replaceAll('/', '')
console.log("room", room)
const socket = io(`localhost:3300/${room}`)
const addPostForm = document.querySelector('.add-post-form');
const nameValue = document.getElementById('user');
const messageValue = document.getElementById('inputText');
const messages = document.getElementById('messages');


function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}


const url = 'http://localhost:3300/';

let user = null

socket.on('update_messages', (messages) => {

    fetch(url)
        .then(res => res.json())
        .then(data => updateMessagesOnScreen(data))

    // updateMessagesOnScreen(messages)

})

// function updateMessagesOnScreen(messages) {
const updateMessagesOnScreen = (messages) => {
    console.log("messages do update", messages)

    const div_messages = document.querySelector('#messages');

    let list_messages = ''
    messages.forEach(message => {
        list_messages += `<div class="message">${message.name}: ${message.message}</div>`

    })
    list_messages += ''

    div_messages.innerHTML = list_messages


    scrollToBottom()

}


document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()

    const form = document.querySelector('#message_form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log("pegar o user: ", user)

        if (!user) {
            alert('Defina um usuario');
            return;
        }

        // const nomeDoMeuUsuario = document.getElementById("divMeuNome").textContent;
        const message = document.forms['message_form_name']['msg'].value;
        document.forms['message_form_name']['msg'].value = ''
        socket.emit('new_message', {
            // user: nomeDoMeuUsuario,
            user: user,
            msg: message
        })
        console.log(message)
    })


    const userForm = document.querySelector('#user_form');
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        user = document.forms['user_form_name']['user'].value;
        console.log("user", user)
        userForm.parentNode.removeChild(userForm)
        var varName = document.getElementById("divMeuNome")
        varName.textContent = user
    })

})

//* -------------------


// const url = 'http://localhost:3300/';



//* Get - Read the posts
//* Method: GET
// fetch(url)
//     .then(res => res.json())
//     .then(data => updateMessagesOnScreen(data))
// .then(data => console.log(data))



//* Create - Insert new post
//* Method : POST
addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // fetch(url, {
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameValue.value,
                message: messageValue.value,
            })
        })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            // updateMessagesOnScreen(dataArr);
            console.log(dataArr);
        })
    // .then(() => location.reload())

    //* Reset input field to empty
    // nameValue.value = '';
    messageValue.value = '';
})







// function appendMessage() {
//     const message = document.getElementsByClassName('message')[0];
//     const newMessage = message.cloneNode(true);
//     messages.appendChild(newMessage);
// }

// function getMessages() {
//     // Prior to getting your messages.
//     shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
//     /*
//      * Get your messages, we'll just simulate it by appending a new one syncronously.
//      */
//     appendMessage();
//     // After getting your messages.
//     if (!shouldScroll) {
//         scrollToBottom();
//     }
// }

// function scrollToBottom() {
//     messages.scrollTop = messages.scrollHeight;
// }

// scrollToBottom();

// setInterval(getMessages, 1000);