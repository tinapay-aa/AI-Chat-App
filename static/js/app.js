const sendbtn = document.getElementById('send-btn')
const csrfToken = document.querySelector(
    "[name=csrfmiddlewaretoken]"
).value;
const form = document.getElementById('input-form')

function addMessage(sender, text, isMarkdown = false) {
    const message = document.createElement("div");
    message.classList.add("message", sender);

    const content = document.createElement("div");

    if (isMarkdown) {
        content.classList.add("markdown-content");
        content.innerHTML = DOMPurify.sanitize(marked.parse(text));
    } else {
        content.textContent = text;
    }

    message.appendChild(content);
    document.getElementById("messages-section").appendChild(message);
}

document.getElementById("input-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const sendbtn = document.getElementById("send-btn");
    const input = document.getElementById("input-area");
    const message = input.value.trim();

    if (!message) return;

    sendbtn.disabled = true;

    try {
        const form_data = new FormData(form);
        input.value = "";

        addMessage("user", message);

        const response = await fetch("/gem/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrfToken
            },
            body: form_data
        });

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const response_data = await response.json();

        addMessage("assistant", response_data.reply, true);

    } catch (error) {
        console.error("Error:", error);
        addMessage("assistant", "Sorry, something went wrong. Please try again.");
    } finally {
        sendbtn.disabled = false;
    }
});

function clearInputArea() {
    const inputArea = document.getElementById('input-area');
    inputArea.value = "";
}