// Get references to DOM elements
const createUserBtn = document.getElementById('createUserBtn');
const userList = document.getElementById('userList');
const userModal = document.getElementById('userModal');
const closeModalBtn = document.querySelector('.close');
const saveUserBtn = document.getElementById('saveUserBtn');
const userForm = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const idInput = document.getElementById('id');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const roleInput = document.getElementById('role');

// Open user modal
createUserBtn.addEventListener('click', () => {
    clearForm();
    userModal.style.display = 'block';
});

// Close user modal
closeModalBtn.addEventListener('click', () => {
    userModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === userModal) {
        userModal.style.display = 'none';
    }
});

// Save user
saveUserBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const id = idInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const role = roleInput.value;
    
    if (!name.trim() || !id.trim() || !email.trim() || !password.trim()) {
        alert('Please fill in all fields.');
        return;
    }
    if (isNaN(id)) {
        alert('ID must be a number.');
        return;
    }
    
    const user = { name, id: parseInt(id), email, password, role };
    saveUser(user);
});

// Fetch users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);

// Function to fetch users from backend and display them in UI
function fetchUsers() {
    fetch('http://localhost:8080/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            userList.innerHTML = '';
            users.forEach(user => {
                const userElement = createUserElement(user);
                userList.appendChild(userElement);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('Error fetching users. Please try again later.');
        });
}

// Function to save a user
function saveUser(user) {
    fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(savedUser => {
            const userElement = createUserElement(savedUser);
            userList.appendChild(userElement);
            userModal.style.display = 'none';
        })
        .catch(error => {
            console.error('Error saving user:', error);
            alert('Error saving user. Please try again later.');
        });
}

// Function to create a user element
function createUserElement(user) {
    const userElement = document.createElement('div');
    userElement.classList.add('user');
    userElement.innerHTML = `
        <span>Name: ${user.name}</span>
        <span>ID: ${user.id}</span>
        <span>Email: ${user.email}</span>
        <span>Password: ${user.password}</span>
        <span>Role: ${user.role}</span>
        <div class="actions">
            <button onclick="editUser(${user.id})">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
        </div>
    `;
    return userElement;
}

// Function to clear form fields
function clearForm() {
    nameInput.value = '';
    idInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    roleInput.value = 'admin'; // Default role
}

// Function to edit a user
function updateUser(userId) {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const role = roleInput.value;

    const user = { name, email, password, role };

    fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            // Refresh user list and close modal
            fetchUsers();
            userModal.style.display = 'none';
        })
        .catch(error => {
            console.error('Error updating user:', error);
            alert('Error updating user. Please try again later.');
        });
}

// Function to delete a user
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`http://localhost:8080/api/users/${userId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                fetchUsers(); // Refresh user list
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                alert('Error deleting user. Please try again later.');
            });
    }
}
