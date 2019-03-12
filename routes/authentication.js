const User = require('../models/user');
//todo pay close attention to the shared auth routes of module.exports vs og way. notes in prev project

module.exports = (router) => {

    router.post('/register', (req, res) => {
        if(!req.body.email){
            res.json({success: false, message: 'You must provide an e-mail to register.'});
        }
        else if(!req.body.username){
            res.json({success: false, message: 'You must provide a username to register.'});
        }
        else if(!req.body.password){
            res.json({success: false, message: 'You must provide a password to register.'});
        }
        else{
            console.log(req.body);

            let user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                password: req.body.password
            });
            user.save((err) => {
                if(err) {

                    if(err.code === 11000){
                        res.json({ success: false, message: 'Username or e-mail already exists'});
                    }else {

                        if(err.errors){
                            if(err.errors.email) {
                                res.json({success: false, message: err.errors.email.message}); //this ensures you use custom val messages
                            } else if(err.errors.username){
                                res.json({success: false, message: err.errors.username.message});
                            } else if(err.errors.password){
                                res.json({success: false, message: err.errors.password.message});
                            } else{
                                res.json({ success: false, message: err}); //todo proper catch all here && modular functions for errors?
                            }
                        }else{
                            res.json({ success: false, message: 'Could not save user. Error: ', err});
                        }

                    }

                } else{
                    res.json({ success: true, message: 'Successfully saved user.'})
                }
            })
        }
    });

    return router;
};