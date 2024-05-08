document.addEventListener('DOMContentLoaded', function() {
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const employeeList = document.getElementById('employeeList');

    // Add event listener to "Add Employee" button
    addEmployeeBtn.addEventListener('click', function() {
        // For simplicity, let's just alert for now
        alert('Add Employee functionality will be implemented here.');
    });

    // Fetch and display employees
    fetchEmployees();

    // Function to fetch and display employees
    function fetchEmployees() {
        fetch('http://localhost:8080/api/employees')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(employees => {
                displayEmployees(employees);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
                alert('Error fetching employees. Please try again later.');
            });
    }

    // Function to display employees
    function displayEmployees(employees) {
        // Clear previous list
        employeeList.innerHTML = '';

        // Loop through employees and create list items with update and delete buttons
        employees.forEach(employee => {
            const li = document.createElement('li');
            li.innerHTML = `
                ID: ${employee.id}, Name: ${employee.name}, Email: ${employee.email}, Role: ${employee.role}
                <button class="updateBtn" data-id="${employee.id}">Update</button>
                <button class="deleteBtn" data-id="${employee.id}">Delete</button>
            `;
            employeeList.appendChild(li);
        });

        // Add event listeners to update and delete buttons
        employeeList.querySelectorAll('.updateBtn').forEach(btn => {
            btn.addEventListener('click', function() {
                const employeeId = this.getAttribute('data-id');
                updateEmployee(employeeId);
            });
        });

        employeeList.querySelectorAll('.deleteBtn').forEach(btn => {
            btn.addEventListener('click', function() {
                const employeeId = this.getAttribute('data-id');
                deleteEmployee(employeeId);
            });
        });
    }

    // Function to handle updating an employee
    function updateEmployee(employeeId) {
        // For simplicity, let's just alert for now
        alert(`Update employee with ID ${employeeId}`);
    }

    // Function to handle deleting an employee
    function deleteEmployee(employeeId) {
        if (confirm('Are you sure you want to delete this employee?')) {
            fetch(`http://localhost:8080/api/employees/${employeeId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Refetch and display employees after successful deletion
                fetchEmployees();
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
                alert('Error deleting employee. Please try again later.');
            });
        }
    }
});
