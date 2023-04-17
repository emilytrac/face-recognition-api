import express, { response } from 'express';
import bcrpyt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from './controllers/register.js';
import { handleSignIn } from './controllers/signin.js';
import { handleProfile } from './controllers/profile.js';
import { handleImage } from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
    }
  });

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

// return all the users
app.get('/', (req, res) => {
    db.select('*').from('users')
        .then(user => {
             res.json(user)
        })
})

// dependency injection to use imported modules
app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrpyt) })
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrpyt) })
// incorporate in future to be able to update user
app.get('/profile/:id', (req, res) => { handleProfile(req, res, db) })
app.put('/image', (req, res) => { handleImage(req, res, db) })
// app.post('/imageUrl', (req, res) => { handleApiCall(req, res) })

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
