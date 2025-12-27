const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

var id = 1;

var sampleUsers = [
    { 'id': id++, 'firstName': 'Anders', 'lastName': 'Gustavsson' },
    { 'id': id++, 'firstName': 'Bogdan', 'lastName': 'Hadzic' },
    { 'id': id++, 'firstName': 'Imran', 'lastName': 'Seyidoglu' }
];

var isEditingUser = false;

window.addEventListener('load', () => {
    loadUsers();
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addUser();
    })
})

function loadUsers() {
    userList.innerHTML = '';
    for (let user of sampleUsers) {
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
            editUser(user.id);
        })
        userCard.appendChild(editBtn);
    }
}

function addUser() {
    let formData = new FormData(userForm);
    
    if (!isEditingUser) {
        let newUser = {
            id: id++,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName')
        } 
        sampleUsers.push(newUser);
        resetForm();
    } else if (isEditingUser) {
        let user = sampleUsers.find((u) => u.id == formData.get('userId'));
        user.firstName = formData.get('firstName'); 
        user.lastName = formData.get('lastName'); 
        isEditingUser = false;
        resetForm();
    }
    loadUsers();
}

function editUser(userId) {
    let user = sampleUsers.find((u) => u.id == userId);
    if (user != null || user != undefined) {
        isEditingUser = true;
        document.getElementById('userId').value = user.id;
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
    }
}

function deleteUser(userId) {
    let userIndex = sampleUsers.findIndex((u) => u.id == userId);
    sampleUsers = sampleUsers.toSpliced(userIndex, 1);
    loadUsers();
}

function resetForm() {
    document.getElementById('userId').value = "";
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
}