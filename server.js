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


//server
app.listen(3000, () => {
    console.log('Server Running on port 3000');
})

