// Auto-fill current date on page load
window.onload = function () {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("cdate").value = today;
};

function getDOB() {
  const dobInput = document.getElementById("inputDob").value;
  const currentDateInput = document.getElementById("cdate").value;
  const ageDiv = document.getElementById("currentAge");
  const birthdayDiv = document.getElementById("nextBirthday");

  if (!dobInput || !currentDateInput) {
    ageDiv.textContent = "⚠️ Please enter both dates.";
    birthdayDiv.textContent = "";
    return;
  }

  const dob = new Date(dobInput);
  const currentDate = new Date(currentDateInput);

  if (dob > currentDate) {
    ageDiv.textContent = "🚫 DOB cannot be in the future.";
    birthdayDiv.textContent = "";
    return;
  }

  // Age calculation
  let years = currentDate.getFullYear() - dob.getFullYear();
  let months = currentDate.getMonth() - dob.getMonth();
  let days = currentDate.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  ageDiv.innerHTML = `🎉 Your age is <strong>${years} year(s)</strong>, <strong>${months} month(s)</strong>, and <strong>${days} day(s)</strong>.`;

  // Next birthday countdown
  const thisYear = currentDate.getFullYear();
  let nextBirthday = new Date(`${thisYear}-${dob.getMonth() + 1}-${dob.getDate()}`);
  if (nextBirthday < currentDate) {
    nextBirthday.setFullYear(thisYear + 1);
  }

  const diffTime = nextBirthday - currentDate;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  birthdayDiv.innerHTML = `⏳ Days until your next birthday: <strong>${daysLeft} day(s)</strong>`;
}
