const form = document.querySelector("#eventForm");
const type = document.querySelector("#type");
const extraField = document.querySelector("#extraField");
const extraLabel = document.querySelector("#extraLabel");
const extraInput = document.querySelector("#extraInput");
const output = document.querySelector("#output");

function updateExtraField() {
  if (type.value === "student") {
    extraField.hidden = false;
    extraLabel.textContent = "Student #";
    extraInput.required = true;
    extraInput.value = "";
  } else if (type.value === "guest") {
    extraField.hidden = false;
    extraLabel.textContent = "Access Code";
    extraInput.required = true;
    extraInput.value = "";
  } else {
    extraField.hidden = true;
    extraInput.required = false;
    extraInput.value = "";
  }
}

function isFutureDate(dateValue) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const chosenDate = new Date(dateValue + "T00:00:00");
  return chosenDate > today;
}

type.addEventListener("change", updateExtraField);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.innerHTML = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const selectedType = form.type.value;
  const eventDate = form.eventDate.value;
  const extraValue = form.extraInput.value.trim();

  if (!isFutureDate(eventDate)) {
    output.innerHTML = `<p class="error">Event date must be later than the current date.</p>`;
    return;
  }

  if (selectedType === "student" && extraValue.length !== 9) {
    output.innerHTML = `<p class="error">Student # must be 9 digits.</p>`;
    return;
  }

  if (selectedType === "guest" && extraValue !== "EVENT131") {
    output.innerHTML = `<p class="error">Access Code must be EVENT131.</p>`;
    return;
  }

  output.innerHTML = `
    <div class="success">
      <h2>Ticket Created</h2>
      <p>${firstName} ${lastName}</p>
      <p>${selectedType}</p>
      <p>${eventDate}</p>
    </div>
  `;

  form.reset();
  updateExtraField();
});

updateExtraField();