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



};