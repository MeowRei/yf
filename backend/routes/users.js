const express = require('express');
const router = express.Router();
const User = require('../models/user');
const cript = require ('bcryptjs');
const salt = cript.genSaltSync(10);

router.get('/', function(req, res) {
    res.json(req.session);
});

router.post('/logout', async function (req, res, next) {
    if (req.session.user) {
        try {
            await req.session.destroy ();
            res.clearCookie ('user_sid');
            res.redirect ('/')
        } catch (error) {
            next (error)
        }
    } else {
        res.redirect ('/')
    }
});

router.post('/', async function (req, res) {
    const { username, password } = req.body;
    console.log(req.body);
    const checkUser = await User.findOne ({ username });
    console.log(checkUser);
    console.log((await cript.compare (password, checkUser.password).then(data=>data)))
    if (
      checkUser !== undefined &&
      (await cript.compare (password, checkUser.password).then(data=>data))
    )
    {
        req.session.user = checkUser;
        res.json (checkUser)
    } else {
        res.json ({ 'result': false })
    }
});





module.exports = router;
