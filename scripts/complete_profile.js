
//IF Session is not active Go to login page
if(!isSessionActive()){
    goToHTMLPage("login.html");
} else {
    //If session is active & check if profile is complete, if it's complete then redirect to Profile page
    var user = getUser();
    if(user['isComplete']) {
       goToHTMLPage("profile.html");
    }
}

$(function(){
    if((val = getProfilePic())){
        $("#profile_image").attr("src",val);
    }
    //Display email Id from session
    $("#profile_email").html(getCookie("emailId"));

    //Display Age automatically
    $("#profile_date_of_birth").change(function(){
        if(!isIdNullOrBlank("profile_date_of_birth")){
            console.log("Dob: "+valueById("profile_date_of_birth"));
            $('#profile_age').html(calculateAge(valueById("profile_date_of_birth")));
        }
    });

    //removing default action
    $("#completeProfile").submit(function(e){
        e.preventDefault();
        return false;
    });

    //Save image in local storage
    $("#profile_image_upload_button").change(function(){
        const fileReader = new FileReader();
        console.log(JSON.stringify(_registeredUsersList, null, 2));
        fileReader.addEventListener("load",() => {
            localStorage.setItem(convertToPath(getCookie("emailId")),fileReader.result);
            $("#profile_image").attr("src",fileReader.result);
        });
        fileReader.readAsDataURL(this.files[0]);
    });

    //Completing profile
    $("#profile_submit").click(function() {
        var user = getUser();
        if(!isIdNullOrBlank("profile_name") && !isIdNullOrBlank("profile_date_of_birth")
            && !isIdNullOrBlank("profile_occupation") && !isIdNullOrBlank("profile_annual_income"))
        {
            user["gender"] = valueById("profile_gender");
            user['name'] = valueById("profile_name");
            user['date_of_birth'] = valueById("profile_date_of_birth");
            user["age"] = calculateAge(valueById("profile_date_of_birth"));
            user["occupation"] = valueById("profile_occupation");
            user["annual_income"] = valueById("profile_annual_income");
            user["hobbies"] = valueById("profile_hobbies");
            user["isComplete"] = true;
            updateUser(user);
            goToHTMLPage("profile.html");
        }
    });
});
