const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Dummy database of users
const users = {
    "user@example.com": { id: 1, email: "user@example.com", password: "password123", resetToken: null, resetTokenExpires: null }
};

// Transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

app.post('/reset-password', (req, res) => {
    const { email } = req.body;
    if (!users[email]) {
        return res.status(400).json({ success: false, message: 'Email not found' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpires = Date.now() + 3600000; // 1 hour

    users[email].resetToken = resetToken;
    users[email].resetTokenExpires = resetTokenExpires;

    const resetLink = `http://localhost:${PORT}/reset-password/${resetToken}`;
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click here to reset your password: ${resetLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error sending email' });
        }
        res.json({ success: true, message: 'Reset link sent' });
    });
});

app.get('/reset-password/:token', (req, res) => {
    const { token } = req.params;
    let user = null;

    for (const email in users) {
        if (users[email].resetToken === token && users[email].resetTokenExpires > Date.now()) {
            user = users[email];
            break;
        }
    }

    if (!user) {
        return res.status(400).send('Invalid or expired token');
    }

    res.send(`<h1>Reset your password</h1>
              <form id="newPasswordForm" method="POST" action="/reset-password/${token}">
                <input type="password" name="newPassword" placeholder="New Password" required>
                <button type="submit">Reset Password</button>
              </form>
              <script>
                document.getElementById('newPasswordForm').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const newPassword = document.querySelector('input[name="newPassword"]').value;
                    fetch('/reset-password/${token}', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ newPassword })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert('Password reset successful');
                            window.location.href = '/login';
                        } else {
                            alert('Error resetting password');
                        }
                    })
                    .catch(error => console.error('Error:', error));
                });
              </script>`);
});

app.post('/reset-password/:token', (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    let user = null;

    for (const email in users) {
        if (users[email].resetToken === token && users[email].resetTokenExpires > Date.now()) {
            user = users[email];
            break;
        }
    }

    if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;

    res.json({ success: true, message: 'Password reset successful' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
