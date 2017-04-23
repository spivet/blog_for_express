var $submit = $('#submit');
$submit.click(function () {
  var username = $('#username').val(),
      password = $('#password').val();
  
  $.ajax({
    url: '/login',
    dataType: 'json',
    type: 'POST',
    data: {
      username: username,
      password: password
    },
    success: function (data) {
      console.log(data)
    }
  })
})