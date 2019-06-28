function jsonMessage(code, message) {
  return { "Code": code, "Message": message };
};

function sendToast(data, reload) {
    console.log("send toast->" + data.jsonResult.code);
    switch (data.jsonResult.code) {
        case jsonSuccess:
            console.log("success toast");
            $.toast({
                heading: 'Correcto',
                text: data.jsonResult.message,
                icon: 'success',
                position: 'top-right',
                afterHidden: function () {
                    if (reload)
                        window.location.reload();
                }
            });
            break;
        case jsonError:
            console.log("error toast");
            $.toast({
                heading: 'Error',
                text: data.jsonResult.message,
                icon: 'error',
                position: 'top-right'
            });
            break;
        case jsonWarning:
            console.log("warning toast");
            $.toast({
                heading: 'Problema',
                text: data.jsonResult.message,
                icon: 'warning',
                position: 'top-right'
            });
            break;
    }
};

function sendErrorToast() {
    console.log("default error toast");
    $.toast({
        heading: 'Error',
        text: 'Ocurrió un problema',
        icon: 'error',
        position: 'top-right',
    });
}