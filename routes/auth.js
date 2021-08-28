const User = require("../models/User.model");

const router = require("express").Router();
const bcrypt = require('bcryptjs')

/* GET home page */
// register form
router.get("/auth/register", (req, res, next) => {
    res.render('auth/register-form');
});

// register post
router.post('/auth/register', (req, res, next) => {
    const {username, password} = req.body
    console.log(req.body)
    User.find({ username }).then((userFromDB) => {
        if(!userFromDB.length) {
            const hashedPassword = bcrypt.hashSync(password, 10)
            console.log(hashedPassword)
            User.create({ username, password: hashedPassword })
                .then((responseFromCreateUser) => {
                    req.session.user = responseFromCreateUser;
                    res.render('index', responseFromCreateUser)
                })
                .catch((err) => {
                    console.log(err)
                    res.render('auth/register-form', {errorMessage: err.message})
                })
        }
    })
})




// login form
router.get("/auth/login", (req, res, next) => {
    res.render('auth/login-form');
});
// login post
router.post('/auth/login', (req, res, next) => {
    const  {username, password} = req.body
    console.log(req.body)
    User.findOne({username})
        .then( responseFromLoginAttempt =>{
            if( bcrypt.compareSync(password, responseFromLoginAttempt.password)){
                console.log('we have success')
                req.session.user = responseFromLoginAttempt;
                res.render('index',  {user: responseFromLoginAttempt.username})
            }
            
            
        })
        .catch()
})




module.exports = router;

