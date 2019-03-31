const User = require('../models/user');
//todo pay close attention to the shared auth routes of module.exports vs og way. notes in prev project

module.exports = (router) => {

    router.post('/register', (req, res) => {
        if(!req.body.email){
            res.status(400).json({success: false, message: 'You must provide an e-mail to register.'});
        }
        else if(!req.body.username){
            res.status(400).json({success: false, message: 'You must provide a username to register.'});
        }
        else if(!req.body.password){
            res.status(400).json({success: false, message: 'You must provide a password to register.'});
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
                        // res.json({ success: false, message: 'Username or e-mail already exists'});
                        res.status(400).json({message: 'Username or e-mail already exists'});
                    }else {

                        if(err.errors){
                            if(err.errors.email) {
                                // res.json({success: false, message: err.errors.email.message}); //this ensures you use custom val messages
                                res.status(err.statusCode).json({message: err.errors.email.message});
                            } else if(err.errors.username){
                                // res.json({success: false, message: err.errors.username.message});
                                res.status(err.statusCode).json({message: err.errors.username.message});
                            } else if(err.errors.password){
                                // res.json({success: false, message: err.errors.password.message});
                                res.status(err.statusCode).json({message: err.errors.password.message});
                            } else{
                                // res.json({ success: false, message: err}); //todo proper catch all here && modular functions for errors?
                                res.status(err.statusCode).json({message: err});
                            }
                        }else{
                            // res.json({ success: false, message: 'Could not save user. Error: ', err});
                            res.status(err.statusCode).json({message: 'Could not save user. Error: ', err});
                        }

                    }

                } else{
                    // res.json({ success: true, message: 'Successfully saved user.'})
                    res.status(200).json({message: 'Successfully saved user.'});
                }
            })
        }
    });

    router.get('/checkUserName/:username', (req, res) => {
        if(!req.params.username)
            res.status(400).json({message: 'Must provide a username'});

        User.findOne({ username: req.params.username }, (err, user) => {
            if (err) {
                res.status(500).json({ message: err }); // Return connection error
            } else {
                // Check if user's e-mail is taken
                if (user) {
                    res.status(400).json({ message: 'Username is already taken' }); // Return as taken e-mail
                } else {
                    res.status(200).json({ message: 'Username is available' }); // Return as available e-mail
                }
            }
        });
    });

    router.get('/checkEmail/:email', (req, res) => {
        if(!req.params.email)
            res.status(400).json({message: 'must provide a email'});

        User.findOne({ email: req.params.email }, (err, user) => {
            if (err) {
                res.status(500).json({ message: err }); // Return connection error
            } else {
                // Check if user's e-mail is taken
                if (user) {
                    res.status(400).json({ message: 'E-mail is already taken' }); // Return as taken e-mail
                } else {
                    res.status(200).json({ message: 'E-mail is available' }); // Return as available e-mail
                }
            }
        });
    });

    return router;
};