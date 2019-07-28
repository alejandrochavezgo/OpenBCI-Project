$( document ).ready(function() {
    Init();
});


function Init() {
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
                                $('#login').addClass('card-expand');
                                setTimeout(() => {
                                    $('#loginForm').fadeIn(400);
                                    $('#footer').fadeIn(400);
                                    $('#footer').promise().done(function(){
                                        $('#email').focus();
                                    });
                                }, 700);
                            }, 400);
                        });
                    }, 400);
                });
            }, 1500);
        });   
    }, 1000);
}