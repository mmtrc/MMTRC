document.getElementById('volunteerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const getValues = (name) => formData.getAll(name);

    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        contact: getValues('contact[]'),
        frequency: getValues('frequency[]'),
        days: getValues('days[]'),
        times: getValues('times[]'),
        roles: getValues('roles[]'),
        role_other: formData.get('role_other'),
        experience: formData.get('experience'),
        languages: formData.get('languages'),
        signature: formData.get('signature'),
        date: formData.get('date'),
        printed_name: formData.get('printed_name')
    };

    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1OU7qxTRRafN0Ww-F5dJT0Rox7aJK0dqvndRuVV0oSvw/edit?pli=1&gid=0#gid=0', {
            method: 'POST',
            mode: 'no-cors', // Note: Apps Script doesn't return CORS headers, so this prevents errors but also hides success/failure.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        alert("? Form submitted successfully!");
        form.reset();
    } catch (error) {
        console.error("Submission failed:", error);
        alert("? Submission failed. Please try again.");
    }
});
