document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const email = document.querySelector('#email').value.trim();
        const contact = Array.from(document.querySelectorAll('input[name="contact[]"]:checked')).map(input => input.value);
        const frequency = Array.from(document.querySelectorAll('input[name="frequency[]"]:checked')).map(input => input.value);
        const days = Array.from(document.querySelectorAll('input[name="days[]"]:checked')).map(input => input.value);
        const times = Array.from(document.querySelectorAll('input[name="times[]"]:checked')).map(input => input.value);
        const roles = Array.from(document.querySelectorAll('input[name="roles[]"]:checked')).map(input => input.value);
        const experience = document.querySelector('textarea[name="experience"]').value.trim();
        const languages = document.querySelector('input[name="languages"]').value.trim();
        const signature = document.querySelector('input[name="signature"]').value.trim();
        const date = document.querySelector('input[name="date"]').value.trim();
        const printedName = document.querySelector('input[name="printed_name"]').value.trim();

        if (!name || !phone || !email || !signature || !date || !printedName || contact.length === 0) {
            alert('Please fill out all required fields.');
            return;
        }

        const data = {
            name,
            phone,
            email,
            contact,
            frequency,
            days,
            times,
            roles,
            experience,
            languages,
            signature,
            date,
            printed_name: printedName,
        };

        console.log('Form Data:', data);

        try {
            const apiUrl = 'https://script.google.com/macros/s/AKfycbxND4mRJyGZmdHwFzwf8KhN6R8-qYwc4RBIu9KTG2Cxd7f-blSY-axZZKCpbLF7t58uuw/exec';

            const response = await fetch(apiUrl, {
                method: 'POST',
                mode: 'no-cors', // CORS workaround
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Since no-cors mode is used, we can't read the response status
            alert('Form submitted! We may not be able to confirm the success due to browser restrictions.');
            form.reset();

        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('There was an error submitting your form. Please try again later.');
        }
    });
});

