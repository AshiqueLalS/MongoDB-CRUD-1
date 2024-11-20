const express = require('express')
const app = express()
const port =3000
const mongoose = require('mongoose')

async function main () {
    await mongoose.connect('mongodb+srv://ashiquelals7:todo_password@maincluster.0sj48.mongodb.net/?retryWrites=true&w=majority&appName=mainCluster');
}

main()
.then(res =>{
    console.log("MongoDB Connected")
})
.catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model('User', UserSchema);

app.use(express.json())

// To get all users
app.get('/users', (req,res) =>{
    User.find({})
    .then((users)=>{
        res.send(users)
    })
})
//To get a specific user using username
app.get('/user', (req, res) =>{
    User.find({username: "Admin"})
    .then((users)=>{
        res.send(users)
    })
})


app.post('/', (req,res) =>{
    User.create({username: req.body.username, email: req.body.email, password: req.body.password})
    res.send("Added successfully")
})

app.put('/', (req, res)=>{
    res.send("Response for PUT request")
})

app.delete('/', (req, res) =>{
    res.send("Response for DELETE request")
})

app.listen(port, () => {
    console.log(`App listening to port ${port}`)
})
