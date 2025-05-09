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
        const response = await fetch('https://script.google.com/a/macros/trcmm.org/s/AKfycbw7Cza4Vcgry6kXaO8PckE-vKx7tUQzrTiiIkp2r-Ad_fiD67lfLQs8ZYUY8vReGExL/exec', {
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
