const socket = io('http://localhost:801');

const form = document.getElementById('send_message_form');
const messageInput = document.getElementById('send_message');
const messageContainer = document.querySelector('.main_message_container');
var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

 
const name = prompt("Enter your name to join...");
socket.emit('new-user-joined', name );

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'center');
});

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name =>{
    append(`${name} left the chat`, 'center');
});
