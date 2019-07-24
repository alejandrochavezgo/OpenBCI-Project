$( document ).ready(function() {
    welcome();
});

function welcome() {
    setTimeout(() => {
        $(".fadein").fadeIn(600);   
        $(".fadein").promise().done(function () {
            setTimeout(() => {
                $("#welcome").fadeOut(600);
                $('#welcome').promise().done(function () {
                    setTimeout(() => {
                        $('#login').fadeIn(400);
                        $('#login').promise().done(function () {
                            setTimeout(() => {
                                $('#login').addClass('login-card-expand');
                                setTimeout(() => {
                                    $('#email').fadeIn(400);
                                    $('#password').fadeIn(400);                                    
                                    $('#password').promise().done(function () {
                                        setTimeout(() => {
                                            $('#btnLogin').fadeIn(400);
                                            $('#btnLogin').promise().done(function(){
                                                $('#footer').fadeIn(400);
                                                $('#footer').promise().done(function(){
                                                    $('#email').focus();
                                                });
                                            });
                                        }, 200);
                                    });
                                }, 600);
                            }, 400);
                        });
                    }, 400);
                });
            }, 1500);
        });   
    }, 1000);
}