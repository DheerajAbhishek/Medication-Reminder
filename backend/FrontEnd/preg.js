function addDoctorVisit() {
    const visitDate = document.getElementById('visitDate').value;
    const doctorName = document.getElementById('doctorName').value;

    if (visitDate && doctorName) {
        const scheduleList = document.getElementById('scheduleList');

        const item = document.createElement('div');
        item.className = 'schedule-item';
        item.innerHTML = `<strong>Doctor Visit Date:</strong> ${visitDate} <br> <strong>Doctor Name:</strong> ${doctorName}`;

        scheduleList.appendChild(item);

        document.getElementById('visitForm').reset();
    } else {
        alert('Please enter all details.');
    }
}

function addVaccination() {
    const vaccineDate = document.getElementById('vaccineDate').value;
    const vaccineName = document.getElementById('vaccineName').value;

    if (vaccineDate && vaccineName) {
        const scheduleList = document.getElementById('scheduleList');

        const item = document.createElement('div');
        item.className = 'schedule-item';
        item.innerHTML = `<strong>Vaccination Date:</strong> ${vaccineDate} <br> <strong>Vaccine:</strong> ${vaccineName}`;

        scheduleList.appendChild(item);

        document.getElementById('vaccinationForm').reset();
    } else {
        alert('Please enter all details.');
    }
}

function addMedicine() {
    const medicineName = document.getElementById('medicineName').value;
    const days = document.getElementById('days').value;
    const slots = document.getElementById('slots').value;

    if (medicineName && days && slots) {
        const scheduleList = document.getElementById('scheduleList');

        const item = document.createElement('div');
        item.className = 'schedule-item';
        item.innerHTML = `<strong>Medicine Name:</strong> ${medicineName} <br> <strong>Days:</strong> ${days} <br> <strong>Slots per Day:</strong> ${slots}`;

        scheduleList.appendChild(item);

        document.getElementById('medicineForm').reset();
    } else {
        alert('Please enter all details.');
    }
}

function addTodo() {
    const todoItem = document.getElementById('todoItem').value;

    if (todoItem) {
        const scheduleList = document.getElementById('scheduleList');

        const item = document.createElement('div');
        item.className = 'schedule-item';
        item.innerHTML = `<strong>To-Do Item:</strong> ${todoItem}`;

        scheduleList.appendChild(item);

        document.getElementById('todoForm').reset();
    } else {
        alert('Please enter a to-do item.');
    }
}