const sendbtn = document.getElementById('send-btn')
const csrfToken = document.querySelector(
    "[name=csrfmiddlewaretoken"
).value;
const form = document.getElementById('input-form')

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

    sendbtn.toggleAttribute('disabled')

    const input = document.getElementById("input-area");
    const message = input.value.trim();

    if (!message) return;

    form_data = new FormData(form);
    input.value = "";

    addMessage("user", message);

    const response = await fetch('/gem/', {
        method: 'POST',
        headers: {
            "X-CSRFToken": csrfToken
        },
        body: form_data
    });

    response_data = await response.json();

    addMessage("assistant", response_data.reply);
    sendbtn.toggleAttribute('disabled');
});

function clearInputArea() {
    const inputArea = document.getElementById('input-area');
    inputArea.value = "";
}