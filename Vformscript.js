document.getElementById("volunteerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = {};

  // Convert formData into a JSON-ready object
  for (let [key, value] of formData.entries()) {
    if (key.endsWith("[]")) {
      key = key.slice(0, -2); // Remove []
      if (!data[key]) data[key] = [];
      data[key].push(value);
    } else if (data[key]) {
      // Already exists, convert to array
      if (!Array.isArray(data[key])) data[key] = [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  }

  try {
    const response = await fetch("https://script.google.com/a/macros/trcmm.org/s/AKfycbwCmhcvVPS_Q8bI55aZ3CZAxG68npmRXfNIHMBt78LUgeJRCE3XQQgFIUBJ0DNr1g8/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.success || result.result === "success") {
      alert("🎉 Thank you for volunteering! We'll be in touch soon.");
      form.reset();
    } else {
      alert("⚠️ Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("❌ Submission failed. Please check your connection and try again.");
  }
});


