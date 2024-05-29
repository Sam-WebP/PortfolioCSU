function displayWelcomeMessage() {
    alert("Welcome to the Healthcare Drone Corporation - Newsletter Signup");
}

document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.querySelector('input[name="age"]:checked')?.value;
    const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(cb => cb.value);
    const comments = document.getElementById('comments').value.trim();

    if (!firstName || !lastName) {
        alert("Both First Name and Last Name are required.");
        return;
    }

    if (interests.length === 0) {
        alert("At least one area of interest must be selected.");
        return;
    }

    const data = {
        firstName,
        lastName,
        emailAddress: email,
        ageRange: age,
        services: interests,
        feedback: comments || null,
    };

    console.log("Data being sent:", JSON.stringify(data));  // Log the data being sent for debugging

    try {
        const response = await fetch('https://3ex2gpke3sk4346d4mxi5rrc6e0tcurx.lambda-url.ap-southeast-2.on.aws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseBody = await response.json();

        if (response.ok) {
            alert(`Subscribed email address '${email}' to the newsletter.`);
        } else {
            console.error("Server response:", responseBody);  // Log the server response for debugging
            alert(`Failed to subscribe: ${responseBody.message || response.statusText}`);
        }
    } catch (error) {
        console.error("Fetch error:", error);  // Log fetch errors for debugging
        alert(`Failed to subscribe: ${error.message}`);
    }
});
