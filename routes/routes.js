module.exports = (app, passport) => {
    
    /********** Login **********/
    app.get('/', isLoggedIn, (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.get('/login', isLoggedIn, (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

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

    /******** Panel/User/Profile ********/
    app.get('/profile', hasAccess, (req, res) => {
        res.render('profile', {
            user: req.user
        });
    });

     /******** Signals ********/
    app.get('/signals', hasAccess, (req, res) => {
        res.render('signals');
    });

     /********** EEG **********/
     app.get('/eeg', hasAccess, (req, res) => {
        res.render('eeg');
    });
    
     /******** Logout ********/
     app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};


/******** Functions ********/

//Si el usuario esta logeado continua
function hasAccess(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } 
    else
    {
        return res.redirect('/');  
    }
}

//Si el usuario esta logeado, lo redirecciona a profile
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');    
    } 
    else
    {
        return next();
    }
}