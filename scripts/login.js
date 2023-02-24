$(function(){

$("form#login").submit(function(e){
    e.preventDefault();
    return false;
});
//LOGIN FORM SUBMIT
$("#submit_login").click(function(){
    $("#email_error_message").hide();
    $("#password_error_message").hide();
    if(isIdNullOrBlank("email")){
        $("#email").focus();
        return;
    }
    if(isRegisteredUser(valueById("email"))){
        var user = getUserByEmail(valueById("email"));
        if(user["password"] == valueById("password")){
            createSession(valueById("email"))
            if(user['isComplete']){
                goToHTMLPage("profile.html");
            } else{
                goToHTMLPage("complete_profile.html");
            }
        } else{
            $("#password_error_message").show();
            resetValById("password");
            $("#password").focus();
        }
    } else {
        $("#email_error_message").show();
        resetValById("email");
        resetValById("password");
        $("#email").focus();
    }
});

})