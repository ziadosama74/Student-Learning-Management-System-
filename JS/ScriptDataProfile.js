var params = new URLSearchParams(window.location.search);
var indexUser = params.get("index");
var usersFromStorage = JSON.parse(localStorage.getItem("users"));
// elements
var FullName  = document.getElementById("FN");
var ImageUser = document.getElementById("ImageUser");
var ChangeImg = document.getElementById("ChangeImg");
var ImgInput  = document.getElementById("ImgInput");
var SaveBtn = document.getElementById("save-btn");
var NewPass = document.getElementById("NePas");
var ConfPass = document.getElementById("ConPas");
var Msg = document.getElementById("Msg");
// RegExp
var RegExpFullName = new RegExp("^[A-Za-z\u0600-\u06FF]{2,}(?:\\s+[A-Za-z\u0600-\u06FF]{2,})+$");
// set name
FullName.value = usersFromStorage[indexUser].name;
ImageUser.src = usersFromStorage[indexUser].ImgSrc;
// open file picker
ChangeImg.addEventListener("click", function () {
    ImgInput.click();
});
// change image
ImgInput.addEventListener("change", function () {
    var file = this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        ImageUser.src = e.target.result;
        usersFromStorage[indexUser].ImgSrc = e.target.result;
        localStorage.setItem("users", JSON.stringify(usersFromStorage));
    };
    reader.readAsDataURL(file);
});
// Save changes btn
SaveBtn.addEventListener("click", function () {
    if (FullName.value.trim() == ""|| !(RegExpFullName.test(FullName.value.trim()))) {
        FullName.classList.add("error");
    } else {
        FullName.classList.remove("error");
        usersFromStorage[indexUser].name = FullName.value;
        FullName.value = usersFromStorage[indexUser].name;
        localStorage.setItem("users", JSON.stringify(usersFromStorage));
        Msg.textContent = "name has been changed";
    }
    if(NewPass.value != ""){
        if(NewPass.value != ConfPass.value){
            ConfPass.classList.add("error");
        }
        else{
            ConfPass.classList.remove("error");
            usersFromStorage[indexUser].password = ConfPass.value;
            localStorage.setItem("users", JSON.stringify(usersFromStorage));
            Msg.textContent = "password has been changed";
        }
    }
});
//===================================================================================
//                            The Header Links
//===================================================================================
var Profile = document.getElementById("ProLink");
var Courses = document.getElementById("Courses");
var DashboardLink = document.getElementById("DashboardLink");
var Tasks = document.getElementById("Tasks");
Profile.addEventListener("click",()=>{
    Profile.href = `/pages/profile.html?index=${indexUser}`;
});
Courses.addEventListener("click",()=>{
    Courses.href = `/pages/Courses.html?index=${indexUser}`;
});
DashboardLink.addEventListener("click",()=>{
    DashboardLink.href = `/pages/Dashboard.html?index=${indexUser}`;
});
Tasks.addEventListener("click",()=>{
    Tasks.href = `/pages/Tasks.html?index=${indexUser}`;
});