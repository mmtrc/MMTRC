document.getElementById("volunteerForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(e.target); // Collect form data
  const data = {};

  formData.forEach((value, key) => {
    if (data[key]) {
      // If the key already exists (for checkbox arrays), append the value
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

    const result = await response.json();
    if (result.status === "success") {
      alert("Thank you for signing up!");
    } else {
      alert("There was an issue. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("There was an error submitting the form.");
  }
});



