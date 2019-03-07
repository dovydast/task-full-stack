const Joi = require('joi'); // Validator schema
const express = require('express');
const app = express();

const cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
app.use(cors());
app.use(express.json());

const users = [{   // some dummy users
        id: 1,
        name: 'Leanne Grahm',
        username:'Bret',
        email:'Sincere@april.biz',
        address:{
            street:'Kulas Light',
            city:'Gwenborough',
            zipcode:'92998-3874'
        },
        phone:'1-770-736-8031 x56442'
    },
    {
        id: 2,
        name: 'Ervin Howell',
        username:'Antonette',
        email:'Shanna@melissa.tv',
        address:{
            street:'Victor Plains',
            city:'Wisokyburgh',
            zipcode:'90566-7771'
        },
        phone:'1-770-736-8031 x56442'
    },
    {
        id: 3,
        name: 'Clementine Bauch',
        username:'Samantha',
        email:'Nathan@yesenia.net',
        address:{
            street:'Douglas Extension',
            city:'McKenziehaven',
            zipcode:'59590-4157'
        },
        phone:'010-692-6593 x09125'
    },
    {
        id: 4,
        name: 'Patricia Lebsack',
        username:'Karianne',
        email:'Julianne.OConner@kory.org',
        address:{
            street:'Hoeger Mall',
            city:'South Elvis',
            zipcode:'53919-4257'
        },
        phone:'493-170-9623 x156'
    }
]

app.get('/', (req, res)=>{ 
    res.send('API is working - to see some data add /users in the URL');
})
app.get('/api/users', (req, res) => {
res.send(users);
});


// GET, POST, PUT, DELETE ----------- REQUESTS --------------

    app.get('/api/users/:id', (req, res) => {
       const user = users.find(u => u.id === parseInt(req.params.id));
          if (!user) return res.status(404).send('The user with given ID was not found');
    
    res.send(user);
    });

    app.post('/api/users', (req, res) => {

       const { error } = validateUser(req.body);
         if (error) return res.status(400).send(error.details[0].message);
    
             const user =  {
             id: users.length + 1,
             name: req.body.name,
             username:req.body.username,
             email:req.body.email
             };

    users.push(user);
    res.send(user);
    });


app.put('/api/users/:id', (req, res) => {

    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with given ID was not found');
    
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    user.username = req.body.username;
    user.email = req.body.email;
    user.name = req.body.name;
    
    res.send(user);
});

app.delete('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
    res.status(404).send('The user with given ID was not found');
    }
    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);

});

// Validating user properties

function validateUser(user){
    const schema = {
        id:Joi.number(),
        name: Joi.string().min(3).required(),
        username:Joi.string().min(3).max(30).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        address:{
            street:Joi.string().min(3),
            city:Joi.string().min(3),
            zipcode:Joi.string().min(5),
        },
        phone:Joi.string().min(6)
         };
        return result = Joi.validate(user, schema);
}


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))