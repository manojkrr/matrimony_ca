
//IF Session is not active Go to login page
if(!isSessionActive()){
    goToHTMLPage("login.html");
} else {
    //If session is active & check if profile is complete, if it's complete then redirect to Profile page
     var user = getUser();
     if(!user['isComplete']) {
        goToHTMLPage("complete_profile.html");
     }
}

$(function(){
    emailId = getUrlParameter("requested_profile_emailId");
    if((val = getProfilePicByEmailId(emailId))){
        $("#profile_image").attr("src",val);
    }
    var user = getUserByEmail(emailId);
    $("#profile_name").html(user["name"]);
    $("#profile_email").html(user["emailId"]);
    $("#profile_date_of_birth").html(user["date_of_birth"]);
    $("#profile_occupation").html(user["occupation"]);
    $("#profile_age").html(user['age']);
    $("#profile_annual_income").html(user["annual_income"]);
    $("#profile_gender").html(user["gender"]);
    $("#profile_hobbies").html(user["hobbies"]);
})


function getUrlParameter(sParam) {
    var url = window.location.search.substring(1),
        sURLVariables = url.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
