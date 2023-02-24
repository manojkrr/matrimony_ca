//Write all action related defined functions inside the document.ready()
$(function() {

$("form#signup").submit(function(e){
        e.preventDefault();
        return false;
});

$("#signupButton").click(function(){
    if(isIdNullOrBlank("email") || isIdNullOrBlank("password") || isIdNullOrBlank("confirmPassword")) {
        return;
    }
    validateRegisteredEmailId(valueById("email"));
    if(valueById("password") != valueById("confirmPassword")){
        alert("Passwords do not match");
        resetValById("password");
        resetValById("confirmPassword");
        return;
    }
    registerUser(valueById("email"), valueById("password"));
    createSession(valueById("email"));
    goToHTMLPage("complete_profile.html");
});

function validateRegisteredEmailId(emailId) {
    var result = isRegisteredUser(emailId)
    if(result) {
        alert("User Already Exists with this Email ID");
        resetValById("email");
    }
}

$("#email").focusout(function(){
    validateRegisteredEmailId(valueById("email"));
});

});

function registerUser(emailIdValue, passwordValue){
    var user = {};
    user['emailId'] = emailIdValue;
    user['password'] = passwordValue;
    user['isComplete'] = false;
    user['name'] = null;
    user['date_of_birth'] = null;
    user['age'] = null;
    user['occupation'] = null;
    user['annual_income'] = null;
    user['gender'] = null;
    _registeredUsersList.push(user);
    createCookie("_registeredUsersList", JSON.stringify(_registeredUsersList));
}



