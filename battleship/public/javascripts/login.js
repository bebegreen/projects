$('send').on('click', function () {

    var data = {
        username: $('#username').val(),
        password: $('#password').val()
    }


    $.ajax({
        url: '/tryToLogin',
        type: 'POST',
        dataType: 'json',
        crossDomain: true,
        cache: false,
        data: data,
        success: function (data) {
            if (data.status === 'success') {
                window.location.href = data.redirect;
            } else {
                $('h3').text(data.status);
            }

        }

    })
})