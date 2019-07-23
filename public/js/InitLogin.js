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
                                    $('#loginForm').fadeIn(400);
                                    $('#loginForm').promise().done(function () {
                                        setTimeout(() => {
                                            $('#email').focus();
                                        }, 400);
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