$(document).ready(function () {
    $("#tabcontainer").tabs({
        event: "click"
    });

    $('#portfolioslider').coinslider({
        width: 480,
        height: 280,
        navigation: false,
        links: false,
        hoverPause: true
    });
});



//IF Session is not active Go to login page
if(!isSessionActive()){
    goToHTMLPage("login.html");
} else {
     //If session is active check & if profile is complete, if it's not complete then redirect to Complete Profile page
     var user = getUser();
     if(!user['isComplete']) {
        goToHTMLPage("complete_profile.html");
     }
}

function loadFeed(searchString){
    var currentUser = getUser();
    var htmlCode = '';
    for(const user of _registeredUsersList){
        if(user["emailId"] != currentUser["emailId"] && user["isComplete"] == true){
            htmlCode += createCategory(user, searchString);
        }
    }
    console.log(htmlCode);
    $("#categories").html(htmlCode);
}

$(document).ready(function() {
loadFeed("");

$("#search").submit(function(e){
    loadFeed($("#searchField").val());
    e.preventDefault();
    return false;
});

});

function createCategory(user, searchString){

    var html = '<li class="category">' +
                    '<h2>'+user["name"]+'</h2>' +
                    '<a href="#"><img src="' + getProfilePicByEmailId(user["emailId"]) +'" alt="" height="150"/></a>' +
                    '<p>' +
                        'Age: '+user["age"]+' <br>' +
                        'Gender: '+user["gender"]+' <br>' +
                        'Email: '+user["emailId"]+' <br>'+
                        'Occupation: '+user["occupation"]+' <br>' +
                        'Annual Income: $'+user["annual_income"]+' <br>' +
                        'Hobbies: '+user["hobbies"]+' <br><br>' +
                    '</p>' +
                    '<p class="readmore"><a href="view_profile.html?requested_profile_emailId='+user["emailId"]+'" target="_blank">Read More &raquo;</a></p>' +
                '</li>';
    if (searchString == null || searchString == "" || (html.search(searchString) >= 0)){
        return html;
    }
    return '';
}