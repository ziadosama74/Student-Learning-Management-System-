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
//               Load The Tasks and Courses Fileds
//===================================================================================
//elements
var totalTasks = document.getElementById("totalTasks");
var completedTasks = document.getElementById("completedTasks");
var pendingTasks = document.getElementById("pendingTasks");
var totalCourses = document.getElementById("totalCourses");
totalTasks.textContent = usersFromStorage[indexUser].TasksAll.length;
var CompletedTasksCounter = 0 ;
var PendingTasksCounter = 0 ;
for(var i = 0 ; i < usersFromStorage[indexUser].TasksAll.length ; i++){
    if(usersFromStorage[indexUser].TasksAll[i].TaskStatus == "Completed") CompletedTasksCounter++;
    else PendingTasksCounter++;
}
completedTasks.textContent = CompletedTasksCounter;
pendingTasks.textContent = PendingTasksCounter;
totalCourses.textContent = usersFromStorage[indexUser].Courses.length;
//===================================================================================
//                            The Clock
//===================================================================================
var clock = document.getElementById("clock");
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000);
//===================================================================================
//                            The announcement Slidder
//===================================================================================
// elements
var ImagesList = ["/Imgaes/cleancode.png","/Imgaes/Foot.png","/Imgaes/Egypt.png","/Imgaes/World.png","/Imgaes/Travel.png"];
var NavBtnNext = document.getElementById("nav-btn-next");
var NavBtnPrev = document.getElementById("nav-btn-prev");
var ImgSlider =  document.getElementById("announcementImg");
var IndexImgSlider = 0 ;
// next
NavBtnNext.addEventListener("click",()=>{
    if(IndexImgSlider < ImagesList.length - 1){
        IndexImgSlider++;
        changeImageSmooth(ImagesList[IndexImgSlider]);
    }
});
// prev
NavBtnPrev.addEventListener("click",()=>{
    if(IndexImgSlider > 0){
        IndexImgSlider--;
        changeImageSmooth(ImagesList[IndexImgSlider]);
    }
});
// smooth
function changeImageSmooth(newSrc){
    ImgSlider.style.opacity = 0.5;
    setTimeout(()=>{
        ImgSlider.src = newSrc;
        ImgSlider.style.opacity = 1;
    }, 200);
}
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