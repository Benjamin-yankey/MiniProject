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
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return 'Hello there! 👋 How can I help you today?';
    } else if (lowerCaseMessage.includes('how are you')) {
        return 'I\'m an AI, so I don\'t have feelings, but I\'m here and ready to help you! How are you doing? 😊';
    } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
        return 'Goodbye! It was nice chatting with you. If you need anything, just let me know! 👋';
    } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
        return 'You\'re welcome! 😊 If you have more questions, feel free to ask!';
    } else if (lowerCaseMessage.includes('virtual visit')) {
        return 'Interested in a virtual visit? You can schedule one here: <a href="/virtual-visits">Virtual Visits</a>. Let\'s get you connected with a doctor! 🩺';
    } else if (lowerCaseMessage.includes('prescription') || lowerCaseMessage.includes('medication')) {
        return 'Need a prescription or a refill? You can manage them here: <a href="/prescriptions">Prescriptions</a>. Just let me know if you need any assistance! 💊';
    } else if (lowerCaseMessage.includes('lab test') || lowerCaseMessage.includes('report')) {
        return 'Looking for your lab results? Access them here: <a href="/lab-tests">Lab Tests</a>. I hope everything looks good! 🧪';
    } else if (lowerCaseMessage.includes('appointment')) {
        return 'Planning to book an appointment? You can do that here: <a href="/appointments">Appointments</a>. Let\'s get that sorted for you! 📅';
    } else if (lowerCaseMessage.includes('health profile') || lowerCaseMessage.includes('profile')) {
        return 'Curious about your health stats? Check your profile here: <a href="/health-profile">Health Profile</a>. Keep track of your health journey! 🩺';
    } else if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('assist') || lowerCaseMessage.includes('support')) {
        return 'I\'m here to help! 🙋‍♂️ You can ask about our services like virtual visits, prescriptions, lab tests, and more. Just type what you need assistance with!';
    } else if (lowerCaseMessage.includes('what can you do')) {
        return 'Great question! I can help you schedule virtual visits, manage prescriptions, view lab tests, book appointments, and much more. Just ask, and I\'ll guide you! 🚀';
    } else if (lowerCaseMessage.includes('joke')) {
        return 'Sure, here\'s one for you: Why did the computer catch a cold? It left its Windows open! 😂';
    } else if (lowerCaseMessage.includes('who are you') || lowerCaseMessage.includes('what are you')) {
        return 'I\'m your friendly virtual assistant, here to help you navigate through our medical services. Think of me as your online health companion! 🤖';
    } else {
        return 'I\'m not sure how to respond to that, but I\'m always learning! Try asking about virtual visits, prescriptions, or lab tests. 😊';
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

