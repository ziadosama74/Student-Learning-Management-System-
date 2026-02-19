var params = new URLSearchParams(window.location.search);
var indexUser = params.get("index");
var usersFromStorage = JSON.parse(localStorage.getItem("users"));
//===================================================================================
//                            Personal Data
//===================================================================================
//elements
var UserName = document.getElementById("UserName");
var UserImg = document.getElementById("UserImg");
UserName.textContent = usersFromStorage[indexUser].name;
UserImg.src = usersFromStorage[indexUser].ImgSrc;
//===================================================================================
//                            The Header Links
//===================================================================================
var Profile = document.getElementById("ProLink");
var Courses = document.getElementById("Courses");
var DashboardLink = document.getElementById("DashboardLink");
Profile.addEventListener("click",()=>{
    Profile.href = `/pages/profile.html?index=${indexUser}`;
    console.log(Profile);
});
Courses.addEventListener("click",()=>{
    Courses.href = `/pages/Courses.html?index=${indexUser}`;
    console.log(Courses);
});
DashboardLink.addEventListener("click",()=>{
    DashboardLink.href = `/pages/Dashboard.html?index=${indexUser}`;
    console.log(DashboardLink);
});