$(document).ready(function() {
    Init();
});

function Init() {
    $(".fadein").fadeIn(600);   
    $(".fadein").promise().done(function () {
        setTimeout(() => {
            $('#signalsCard').fadeIn(400);
                $('#signalsCard').promise().done(function () {
                    setTimeout(() => {
                        $('#signalsCard').addClass('card-expand');
                        setTimeout(() => {
                            $('#signals').fadeIn(600);
                            $('#footer').fadeIn(600);
                        }, 700);
                    }, 400);
                });
        }, 500);
    }); 
}