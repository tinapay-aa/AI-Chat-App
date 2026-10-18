function addMessage(sender, message) {
    const messages_section = document.getElementById('messages-section');
    const message_div = document.createElement('div');
    const message_span = document.createElement('span');

    message_div.classList.add('message')
    if (sender == 'user') {
        message_div.classList.add('user')
    }
    else {
        message_div.classList.add('assistant')
    }
    message_span.textContent = message

    message_div.appendChild(message_span);
    messages_section.appendChild(message_div);
}

document.getElementById("input-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const input = document.getElementById("input-area");
    const message = input.value.trim();

    if (!message) return;

    addMessage("user", message);
    input.value = "";
});

function clearInputArea() {

}