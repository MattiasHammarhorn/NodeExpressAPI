const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

var isEditingUser = false;
var users = [];

window.addEventListener('load', () => {
    loadUsers();
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitUser();
    })
})

async function loadUsers() {
    const url = '/api/users/';
    try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to fetch '/api/events'. Status: ${response.response}`);
        }

        users = await response.json();
        populateUserList();
    } catch (error) {
        console.error(`Error fetching ${url}, ${error}`);
    }
}

async function submitUser() {
    const url = '/api/users/';
    let formData = new FormData(userForm);

    let data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName')
    }
    
    if (!isEditingUser) {
        try {
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(resp => resp.json())
                .then(() => {
                    loadUsers();
                    resetForm();
                });
        } catch (error) {
            console.error(`Error fetching ${url}, ${error}`);
        }
    } else if (isEditingUser) {
        try {
            await fetch(url + formData.get('userId'), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(resp => resp.json())
                .then(() => {
                    isEditingUser = false;
                    resetForm();
                    loadUsers();
                });
        } catch (error) {
            console.error(`Error fetching ${url}, ${error}`);
        }
    }
}

function editUser(userId) {
    let user = users.find((u) => u.id == userId);
    if (user != null || user != undefined) {
        isEditingUser = true;
        document.getElementById('userId').value = user.id;
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
    }
}

async function deleteUser(userId) {
    const url = "/api/users/";
    try {
        await fetch(url + userId, { method: 'DELETE'})
            .then(resp => resp.json())
            .then(loadUsers());
    } catch (Error) {
        console.error(`Error fetching ${url}, ${Error}`);
    }
}

function populateUserList() {
    userList.innerHTML = '';
    for (let user of users) {
        let userCard = document.createElement('div');
        userCard.innerHTML += `<li>Id: ${user.id}</li>
            <li>First name: ${user.firstName}</li>
            <li>Last name: ${user.lastName}</li>`;

        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'X';
        deleteBtn.addEventListener('click', (e) => {
            deleteUser(user.id);
        });
        userList.appendChild(userCard);
        userCard.appendChild(deleteBtn);

        let editBtn = document.createElement('button');
        editBtn.innerHTML = 'EDIT';
        editBtn.addEventListener('click', (e) => {
            editUser(user.id);            })
        userCard.appendChild(editBtn);
    }
}

function resetForm() {
    document.getElementById('userId').value = "";
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
}