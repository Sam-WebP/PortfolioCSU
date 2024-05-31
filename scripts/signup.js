// Display a welcome message when the page loads
function displayWelcomeMessage() {
    alert("Welcome to the Healthcare Drone Corporation - Newsletter Signup");
}

// Add event listener to the form for the submit event
document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent default form submission
    
    // Get form values
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.querySelector('input[name="age"]:checked')?.value;
    const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(cb => cb.value);
    const comments = document.getElementById('comments').value.trim();

    // Validate form fields
    if (!firstName) {
        alert("First Name is required.");
        document.getElementById('first-name').focus();
        return;
    }

    if (!lastName) {
        alert("Last Name is required.");
        document.getElementById('last-name').focus();
        return;
    }

    if (!email) {
        alert("Email Address is required.");
        document.getElementById('email').focus();
        return;
    }

    if (!age) {
        alert("Age Range is required.");
        return;
    }

    if (interests.length === 0) {
        alert("At least one area of interest must be selected.");
        return;
    }

    // Create data object to be sent
    const data = {
        firstName,
        lastName,
        emailAddress: email,
        ageRange: age,
        services: interests
    };

    if (comments) {
        data.feedback = comments;  // Include comments if provided
    }

    console.log("Data being sent:", JSON.stringify(data));  // Log data for debugging

    try {
        // Send data to the server using Fetch API
        const response = await fetch('https://3ex2gpke3sk4346d4mxi5rrc6e0tcurx.lambda-url.ap-southeast-2.on.aws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseBody = await response.json();  // Parse the response

        if (response.ok) {
            showNotification(`Subscribed email address '${email}' to the newsletter.`, 'success');
        } else {
            console.error("Server response:", responseBody);  // Log server response for debugging
            showNotification(`Failed to subscribe: ${responseBody.message || response.statusText}`, 'error');
        }
    } catch (error) {
        console.error("Fetch error:", error);  // Log fetch error for debugging
        showNotification(`Failed to subscribe: ${error.message}`, 'error');
    }
});

// Display notification messages
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;  // Set message text
    notification.style.display = 'block';  // Show notification
    notification.style.color = type === 'success' ? 'green' : 'red';  // Set colour based on type
}
