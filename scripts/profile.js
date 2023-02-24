
if(!isSessionActive()){
    goToHTMLPage("login.html");
} else {
     //If session is active & check if the profile is complete, if it's not complete then redirect to Complete Profile page
     var user = getUser();
     if(!user['isComplete']) {
        goToHTMLPage("complete_profile.html");
     }
}

$(function(){
    if((val = getProfilePic())){
        $("#profile_image").attr("src",val);
    }
    var user = getUser();
    $("#profile_name").html(user["name"]);
    $("#profile_email").html(user["emailId"]);
    $("#profile_date_of_birth").html(user["date_of_birth"]);
    $("#profile_age").html(user['age']);
    $("#profile_occupation").html(user["occupation"]);
    $("#profile_annual_income").html(user["annual_income"]);
    $("#profile_gender").html(user["gender"]);
    $("#profile_hobbies").html(user["hobbies"]);


    $("#profile_image_upload_button").change(function(){
        const fileReader = new FileReader();
        console.log(JSON.stringify(_registeredUsersList, null, 2));
        fileReader.addEventListener("load",() => {
            localStorage.setItem(convertToPath(getCookie("emailId")),fileReader.result);
            $("#profile_image").attr("src",fileReader.result);
        });
        fileReader.readAsDataURL(this.files[0]);
    });
})

