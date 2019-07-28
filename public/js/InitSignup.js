$( document ).ready(function() {
    Init();
});

function Init() {
    $(".fadein").fadeIn(600);   
    $(".fadein").promise().done(function () {
        setTimeout(() => {
            $('#signup').fadeIn(400);
                    $('#signup').promise().done(function () {
                        setTimeout(() => {
                            $('#signup').addClass('card-expand');
                            setTimeout(() => {
                                $('#signupForm').fadeIn(400);                     
                                $('#footer').fadeIn(400);
                                $('#footer').promise().done(function(){
                                    $('#email').focus();
                                });
                            }, 700);
                        }, 400);
                    });
        }, 500);
    }); 
}