document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const formElem = event.target;
  const formData = new FormData(formElem);

  const technicalEvents = Array.from(formElem.querySelectorAll('input[name="event"]:checked'))
                              .map(cb => cb.value)
                              .join(', ');
  formData.set('event', technicalEvents);

  const nonTechnicalEvents = Array.from(formElem.querySelectorAll('input[name="nevent"]:checked'))
                                 .map(cb => cb.value)
                                 .join(', ');
  formData.set('nevent', nonTechnicalEvents);

  const fileInput = formElem.querySelector('input[name="screenshot"]');

  console.log("Submitting form data");
  console.log("Technical events:", technicalEvents);
  console.log("Non-technical events:", nonTechnicalEvents);
  console.log("Screenshot selected:", fileInput.files.length > 0);

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
      const base64 = event.target.result.split(',')[1]; 
      formData.set('screenshotBase64', base64);
      formData.delete('screenshot'); 
      
      console.log("Screenshot base64 length:", base64.length);

      fetch("https://script.google.com/macros/s/AKfycbyNIjkm9Z15MNoBtmnIxqUMTpS3oNIOBNq-w1kSsyaUNHKMXU9ir3bamHFnumQuxju7/exec", {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => alert(data.status === "success" ? data.message : `Error: ${data.message}`))
      .catch(error => {
        alert("Error submitting the form. Please try again.");
        console.error(error);
      });
    };

    reader.onerror = function(error) {
      alert("Error reading file. Please try again.");
      console.error("FileReader error:", error);
    };

    reader.readAsDataURL(file);

  } else {
    // No file selected, send formData as is
    fetch("https://script.google.com/macros/s/AKfycbyNIjkm9Z15MNoBtmnIxqUMTpS3oNIOBNq-w1kSsyaUNHKMXU9ir3bamHFnumQuxju7/exec", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => alert(data.status === "success" ? data.message : `Error: ${data.message}`))
    .catch(error => {
      alert("Error submitting the form. Please try again.");
      console.error(error);
    });
  }
});
const fileInput = document.getElementById("screenshot");
const fileChosen = document.getElementById("file-chosen");

fileInput.addEventListener("change", function () {
  fileChosen.textContent = this.files.length > 0 ? this.files[0].name : "No file chosen";
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  const popup = document.getElementById('popup');
  const closeBtn = document.getElementById('closePopup');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Optionally: Validate or handle data here / send to backend if needed

    // Show popup
    popup.style.display = 'flex';

    // Optionally: Reset form fields
    form.reset();
  });

  closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
  });

  // Optional: Close popup when clicking outside of it
  window.onclick = function(event) {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  };
});