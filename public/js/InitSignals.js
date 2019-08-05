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
                            $('#signals').fadeIn(400);
                            $('#footer').fadeIn(400);
                        }, 700);
                    }, 400);
                });
        }, 500);
    }); 
}