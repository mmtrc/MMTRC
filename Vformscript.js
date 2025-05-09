document.getElementById("volunteerForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(e.target); // Collect form data
  const data = {};

  // Loop through form data and populate the data object
  formData.forEach((value, key) => {
    // Handle checkbox arrays properly
    if (data[key]) {
      if (Array.isArray(data[key])) {
        data[key].push(value);
      } else {
        data[key] = [data[key], value];
      }
    } else {
      data[key] = value;
    }
  });

  try {
    // Send data to Google Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbwCmhcvVPS_Q8bI55aZ3CZAxG68npmRXfNIHMBt78LUgeJRCE3XQQgFIUBJ0DNr1g8/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle the response
    const result = await response.json();

    if (result.status === "success") {
      alert("Thank you for signing up! Your information has been submitted.");
    } else {
      alert("There was an issue with your submission. Please try again.");
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error submitting form:", error);
    alert("There was an error submitting the form. Please try again later.");
  }
});



