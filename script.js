// Function to handle adding new student records
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault(); //  to Prevent defalting

    // geting form values
    const studentName = document.getElementById('studentName').value;
    const studentId = document.getElementById('studentId').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;

    // form validation
    if (!studentName || !studentId || !email || !contact) {
        alert('Please fill in all fields.');
        return;
    }

    // email Validatation  
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    //  contact number Validatation
    const contactPattern = /^\d{10}$/;
    if (!contactPattern.test(contact)) {
        alert('Please enter a valid 10-digit contact number.');
        return;
    }

    // Creating a new student object
    const student = {
        id: studentId,
        name: studentName,
        email: email,
        contact: contact
    };

    // Storing the student in local storage
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    // Reseting the form fields after submission
    document.getElementById('studentForm').reset();

    // Updating the display of students
    displayStudents();
});

// Function to display students records from localStorage
function displayStudents() {
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
    studentsTable.innerHTML = ''; // Clearing current table data

    const students = JSON.parse(localStorage.getItem('students')) || [];

    // Looping through the students records and adding them to the table
    students.forEach(function(student, index) {
        const row = studentsTable.insertRow();
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
    });
}

// Function to edit an existing student's data
function editStudent(index) {
    // Retrieving the students records from localStorage
    const students = JSON.parse(localStorage.getItem('students'));
    const student = students[index];

    // Populate the form with existing student data
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentId').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    // Remove the student record from the list for editing
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));

    // Refresh the display
    displayStudents();
}

// Function to delete a students record
function deleteStudent(index) {
    // Retrieving the students records from localStorage
    const students = JSON.parse(localStorage.getItem('students'));
    students.splice(index, 1); // Remove the student at the specified index
    localStorage.setItem('students', JSON.stringify(students)); // Update the localStorage

    // Refresh the student display
    displayStudents();
}

// Loading students when the page loads
window.onload = function() {
    displayStudents();
};
