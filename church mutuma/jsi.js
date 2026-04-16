// Configuration
const AIRTABLE_API_KEY = 'patsLZINhZdhlTEte.9ae0fe85d1e95b6445c4f44421244a1b4f4130694f5d1e603d7ac486eec238f6'; // Replace with your token
const BASE_ID = 'appv83sFPcoZOv4OO';
const TABLE_NAME = 'Table 1';

async function saveBookingToAirtable(formData) {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;

  const record = {
    fields: {
      "Name": formData.name,
      "Full Name": formData.fullName,
      "Organization": formData.organization,
      "Type of Booking": formData.typeOfBooking,
      "Purpose": formData.purpose,
      "Date": formData.date,        // Format: "YYYY-MM-DD"
      "Time": formData.time,        // Format: "YYYY-MM-DDTHH:MM:SS.000Z"
      "Status": formData.status     // Must be: "Todo", "In progress", or "Done"
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }

    const result = await response.json();
    console.log('Record created successfully:', result);
    return result;

  } catch (error) {
    console.error('Error saving to Airtable:', error);
    throw error;
  }
}

// Example: Attach to your form submission
document.getElementById('submitBtn').addEventListener('on click', async (e) => {
  e.preventDefault();

  async function submitBooking() {
const btn = document.querySelector("button");

  btn.disabled = true;

  const formData = {
    name: document.getElementById('name').value,
    fullName: document.getElementById('fullName').value,
    organization: document.getElementById('organization').value,
    typeOfBooking: document.getElementById('typeOfBooking').value,
    purpose: document.getElementById('purpose').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    status: "Todo"
  };

  try {
    await saveBookingToAirtable(formData);
    alert('Booking submitted successfully!');
    document.getElementById('bookingForm').reset();
  } catch (error) {
    alert('Error submitting booking. Please try again.');
  }
}


  try {
    await saveBookingToAirtable(formData);
    alert('Booking submitted successfully!');
    e.target.reset();
  } catch (error) {
    alert('Error submitting booking. Please try again.');
  }
});