$("#ValidateRFC").click(function () {
    var rfc = $("#RFC").val();
    if (rfc != "" | rfc != undefined) {
        $.ajax({
            type: "POST",
            url: "/Login/ValidateRFC",
            data: { rfc: rfc },
            success: function (data) {
                if (data.jsonResult.code != "error") {
                    if (data.supplierInfo.length > 1) {
                        //+1 Hospital
                        document.getElementById("Step1").classList.add("cssanimation", "sequence", "fadeOutLeft");
                        document.getElementById("Instructions").classList.add("cssanimation", "sequence", "fadeOutLeft");
                        setTimeout(function() {
                            document.getElementById("Instructions").classList.remove("cssanimation", "sequence", "fadeOutLeft");
                            document.getElementById('Instructions').innerText = 'Seleccione su hospital';
                            document.getElementById('Step1').classList.add("no-display");
                            document.getElementById('Step2').classList.remove("no-display");
                            for (var i = 0; i < data.supplierInfo.length; i++) {
                                AddRow(data.supplierInfo[i].id, data.supplierInfo[i].hospital, data.supplierInfo[i].city);
                            }
                        }, 300);
                    } else {
                        //1 Hospital
                        document.getElementById("Step1").classList.add("cssanimation", "sequence", "fadeOutLeft");
                        document.getElementById("Instructions").classList.add("cssanimation", "sequence", "fadeOutLeft");
                        $('#Access').attr('data-id', data.supplierInfo[0].id);
                        setTimeout(function () {
                            document.getElementById('Instructions').classList.remove('cssanimation', 'sequence', 'fadeOutLeft');
                            document.getElementById('Instructions').innerHTML = 'Ingrese la contraseña para ' + '<b>' + data.supplierInfo[0].hospital + '</b>';
                            document.getElementById('Step1').classList.add('no-display');
                            document.getElementById('Step2').classList.add('no-display');
                            document.getElementById('Step3').classList.remove('no-display');
                        }, 250);
                    }
                } else {
                    sendToast(data, false);
                }
            },
            error: function () {
                console.log("Error");
            }
        });
    }
});

function AddRow(id, hospital, city) {
    document.getElementById('Step2_Container').innerHTML += "<div data-id='" + id + "' class='hospital form-group bg-black custom-card mb-2 pb-0'> <div class='row col-12 m-0 p-0 mb-3'> <input readonly class='col-8 pointer text-white bg-black border-0 font-weight-bold no-outline pointer' value='" + hospital + "' title='" + hospital + "' maxlength='51' /> <input readonly class='col-4 text-right pointer text-white bg-black border-0 font-weight-bold no-outline pointer' value='" + city + "' title='" + city  + "' maxlength='21' /> </div> </div>";
}

$(document).on('click', "div.hospital", function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    document.getElementById("Step2_Container").classList.add("cssanimation", "sequence", "fadeOutLeft");
    document.getElementById("Instructions").classList.add("cssanimation", "sequence", "fadeOutLeft");
    var div = $(this);
    $('#Access').attr('data-id', div.data("id"));
    console.log($('#Access').attr('data-id'));
    setTimeout(function () {
        document.getElementById('Instructions').innerHTML = 'Ingrese la contraseña para ' + '<b>' + div[0].children[0].children[0].value + '</b>';
        document.getElementById("Instructions").classList.remove("cssanimation", "sequence", "fadeOutLeft");
        document.getElementById('Step2').classList.add("no-display");
        document.getElementById('Step3').classList.remove("no-display");
    }, 250);
});

$("#RFC").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#ValidateRFC").click();
    }
}); 

$("#Pwd").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#Access").click();
    }
}); 

$("#Access").click(function () {
    var pwd = $("#Pwd").val();
    var userID = $(this).data("id");

    if (pwd != "" || pwd != undefined && userID != "" || userID != undefined) {
        $.ajax({
            type: "POST",
            url: "/Login/ValidatePassword",
            data: { userID: userID, pwd: pwd},
            success: function (data) {
                if (data.jsonResult.code == "success") {
                    window.location = data.jsonResult.message;
                } else {
                    sendToast(data, false);
                }
            },
            error: function () {
                console.log("Error");
            }
        });
    }
});