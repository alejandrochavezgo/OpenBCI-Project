module.exports = (app, passport) => {
    
    /********** Login **********/
    app.get('/', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    // app.post('/login', passport.authenticate('local-login'));


    /********* Signup *********/
    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));


    /******** Profile ********/
    app.get('/profile', (req, res) => {
        res.render('profile', {
            user: req.user
        });
    });
};