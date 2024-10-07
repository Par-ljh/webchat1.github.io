const socket = new WebSocket('ws://localhost:3000');

let messageCount = 0;
const maxMessages = 100; 

socket.onopen = function () {
    socket.send('get chat history');
};

socket.onmessage = function (event) {
    const data = event.data;
    if (data === 'get chat history') {
        socket.send('request chat history');
    } else if (data.startsWith('chat history:')) {
        const history = data.split(':')[1].split(';');
        const chatBox = document.getElementById('chatBox1');
        history.forEach(message => {
            chatBox.innerHTML += `<div class="message sender">${message}</div>`;
        });
    } else {
        const chatBox = document.getElementById('chatBox1');
        if (messageCount < maxMessages) {
            chatBox.innerHTML += `<div class="message receiver">${data}</div>`;
            messageCount++;
        }
    }
};

function sendMessage() {
    const messageInput = document.getElementById('messageInput1');
    const message = messageInput.value;
    socket.send(message);
    messageInput.value = '';
};