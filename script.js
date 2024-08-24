document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".block-area-left-item");
    const rightContent = document.getElementById("right-content");

    function loadContent(url) {
        console.log(`Loading content from: ${url}`);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                console.log(`Content loaded successfully from: ${url}`);
                rightContent.innerHTML = data;
            })
            .catch(error => {
                console.error(`There was a problem with the fetch operation: ${error.message}`);
                rightContent.innerHTML = `<p>Error loading content: ${error.message}</p>`;
            });
    }

    items.forEach(item => {
        item.addEventListener("click", function() {
            const contentUrl = this.getAttribute("data-content");
            console.log(`Item clicked: ${contentUrl}`);
            loadContent(contentUrl);

            // Add active class to the clicked item and remove from others
            document.querySelectorAll('.block-area-left-item').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Optionally, load initial content (e.g., first menu item)
    if (items.length > 0) {
        const initialUrl = items[0].getAttribute("data-content");
        if (initialUrl) {
            loadContent(initialUrl);
            items[0].classList.add('active');
        }
    }
});




// botttttttttttttttt

document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const message = document.getElementById('message').value.trim();
    if (!message) return;

    addMessage('You', message, 'user-message');
    document.getElementById('messageForm').reset();

    // Simulate bot response after a delay
    setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage('Bot', botResponse, 'bot-message');
    }, 1000);
});

function addMessage(sender, message, messageType) {
    const messageList = document.getElementById('messageList');
    const newMessage = document.createElement('li');
    newMessage.classList.add(messageType);
    newMessage.innerHTML = `<span class="username">${sender}:</span> ${message}`;
    messageList.appendChild(newMessage);
    messageList.scrollTop = messageList.scrollHeight;
}

function getBotResponse(message) {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes('hello')) {
        return 'Hello! How can I assist you today?';
    } else if (lowerCaseMessage.includes('how are you')) {
        return 'I am just a bot, but I\'m doing great! How about you?';
    } else if (lowerCaseMessage.includes('bye')) {
        return 'Goodbye! Have a great day!';
    } else {
        return 'I am not sure how to respond to that. Can you ask something else?';
    }
}


document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const messageDiv = document.getElementById('message');

    fetch('/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageDiv.textContent = 'A reset link has been sent to your email address.';
        } else {
            messageDiv.textContent = 'An error occurred. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred. Please try again.';
    });
});




// appointment

