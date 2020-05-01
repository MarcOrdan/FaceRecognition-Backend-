const express = require('express');


const app = express();

//middlewares
app.use(express.json());


//database
const database = {
    users: [
    {
        id: '123',
        name: 'Marc',
        email: 'marc@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    },
    {
        id: '124',
        name: 'linds',
        email: 'linds@gmail.com',
        password: 'password',
        entries: 0,
        joined: new Date()
    }
]
}

//root endpoint
app.get('/', (req, res) => {
    res.send(database.users);
})


//signin
app.post('/signin',(req,res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('successful login')
        } else {
            res.status(400).json('error logging in')
        }
})

//register
app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length-1]);
})

//profile
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
           return res.json(user);
        } 
    })
    if (!found) {
        res.status(400).json('User not found.')
    }
})


//server
app.listen(3000, () => {
    console.log('Server Running on port 3000');
})

