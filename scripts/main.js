function createSession(emailId) {
    $.cookie("emailId",emailId);
    console.log("Session created with emailId="+$.cookie("emailId"));
}

function createCookie(key,value) {
    $.cookie(key,value);
    console.log("Cookie created "+key+" = "+$.cookie(key));
}

function getCookie(key) {
    return $.cookie(key);
}

function clearSession() {
    $.removeCookie("emailId");
    console.log("Session cleared");
}

function isSessionActive() {
    if( $.cookie("emailId")==null || $.cookie("emailId")=="") {
        return false;
    }
    return true;
}

//Global variable
var _registeredUsersList = [];

function loadRegisteredUsers() {
    val = getCookie("_registeredUsersList");
    if(val != null){
        _registeredUsersList = JSON.parse(val);
        console.log(JSON.stringify(_registeredUsersList, null, 2));
    }
}


/* FUNCTION IS USED DURING LOGIN AND SIGNUP PAGES */
function isRegisteredUser(emailId){

    for(const user of _registeredUsersList){
        if(user['emailId'] == emailId){
            return true;
        }
    }

    return false;
}

function getUser(){
    return getUserByEmail(getCookie("emailId"));
}

function getUserByEmail(emailId){
    for(const user of _registeredUsersList){
        if(user['emailId'] == emailId){
            return user;
        }
    }
}

function loadUsersFromXml(){
    loadRegisteredUsers();
    isLoaded = getCookie("isXmlLoaded");
    if(isLoaded != null){
        return;
    }
    var xmlDoc = fetchXmlDoc('./database/RegisteredUsers.xml');
    var listOfUser = $(xmlDoc).find("user");

    for(var index=0; index < listOfUser.length; index++){
        var user = {};
        user['emailId'] = $(listOfUser.get(index)).attr("emailId");
        user['password'] = $(listOfUser.get(index)).attr("password");
        user['isComplete'] = true;
        user['name'] = $(listOfUser.get(index)).attr("name");
        user['date_of_birth'] = $(listOfUser.get(index)).attr("date_of_birth");
        user['age'] = calculateAge(user['date_of_birth']);
        user['occupation'] = $(listOfUser.get(index)).attr("occupation");
        user['annual_income'] = $(listOfUser.get(index)).attr("annual_income");
        user['gender'] = $(listOfUser.get(index)).attr("gender");
        user['hobbies'] = $(listOfUser.get(index)).attr("hobbies");
        updateUser(user);
        localStorage.setItem(convertToPath(user['emailId']),$(listOfUser.get(index)).attr("image"));
        console.log("Registered Users: "+JSON.stringify(_registeredUsersList,null,2));
    }
    createCookie("isXmlLoaded",true);
}
loadUsersFromXml();

function fetchXmlDoc(xmlFileUrl){
    var doc;
    $.ajax({
            url: xmlFileUrl,
            type: 'get',
            dataType: 'xml',
            async: false,
            success: function(data) {
                console.log("Fetched xmlDoc="+xmlFileUrl);
                doc = data;
            }
    });
    return doc;
}

/* UTILITIES */
function isIdNullOrBlank(elementId){
    return valueById(elementId) == null || valueById(elementId) == "";
}

function valueById(elementId){
    return $("#"+elementId).val();
}

function resetValById(elementId){
     $("#"+elementId).val(null);
}

function goToHTMLPage(page){
    window.location.href = page;
}

function registerUser(emailIdValue, passwordValue){
    var user = {};
    user['emailId'] = emailIdValue;
    user['password'] = passwordValue;
    _registeredUsersList.push(user);
    console.log("User added to list " + JSON.stringify(_registeredUsersList));
    createCookie("_registeredUsersList", JSON.stringify(_registeredUsersList));
}

function updateUser(inputUser){

    var isElementPresent = false;
    for(const user of _registeredUsersList){
        if(user['emailId'] == inputUser["emailId"]){
            _registeredUsersList.splice(_registeredUsersList.indexOf(user), 1);
            _registeredUsersList.push(inputUser);
             isElementPresent = true;
        }
    }
    if(!isElementPresent){
        _registeredUsersList.push(inputUser);
    }

    createCookie("_registeredUsersList", JSON.stringify(_registeredUsersList));
    loadRegisteredUsers();
}

function calculateAge(dob){
        var str=dob.split('-');
        var firstdate=new Date(str[0],str[1],str[2]);
        var today = new Date();
        var dayDiff = Math.ceil(today.getTime() - firstdate.getTime()) / (1000 * 60 * 60 * 24 * 365);
        return parseInt(dayDiff);
}


function convertToPath(emailId){
    return emailId.replace(".","dot").replace("@","_");
}

//Gets the profile image, if profile is complete.
function getProfilePic(){
    if(isSessionActive()){
        if((val = localStorage.getItem(convertToPath(getCookie("emailId"))))){
            return val;
        }
    }
    return null;
}

//Gets the profile image for view profile, if profile is complete.
function getProfilePicByEmailId(emailId){
    if(isSessionActive() && emailId != null){
        if((val = localStorage.getItem(convertToPath(emailId)))){
            return val;
        }
    }
    return null;
}

