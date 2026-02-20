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
console.log(usersFromStorage[indexUser]);
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
//===================================================================================
//                            The Add Couese
//===================================================================================

var CourseSelect = document.getElementById("CourseSelect");
var InstructorNameaddCourse = document.getElementById("InstructorNameaddCourse");
var AddCourseBtn = document.getElementById("AddCourseBtn");
var MsgErorCourse = document.getElementById("MsgErorCourse");
var BoxCourse = document.getElementById("BoxCourse");


AddCourseBtn.addEventListener("click", () => {
    var selectedValue = CourseSelect.value;
    var instructor = InstructorNameaddCourse.value.trim();

    if (selectedValue === "" || instructor === "") {
        MsgErorCourse.textContent = "Please select course and enter instructor name";
        MsgErorCourse.classList.add("Invalid");
        return;
    }
    usersFromStorage[indexUser].Courses.push({
        CourseName: selectedValue,
        CourseInstructor: instructor
    });
    localStorage.setItem("users", JSON.stringify(usersFromStorage));
    MsgErorCourse.textContent = "Your course has been added";
    MsgErorCourse.classList.add("valid");
    loadCourses();
});

function AddNewCourseToBox(selectedValue, instructor, courseIndex) {
    var Course_Card = document.createElement("div");
    Course_Card.classList.add("course-card");
    var course_info = document.createElement("div");
    course_info.classList.add("course-info");
    var course_title = document.createElement("h3");
    var course_instructor = document.createElement("p");
    course_title.textContent = selectedValue;
    course_instructor.textContent = "Eng. " + instructor;
    course_info.appendChild(course_title);
    course_info.appendChild(course_instructor);
    Course_Card.appendChild(course_info);
    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i> Delete`;
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        usersFromStorage[indexUser].Courses.splice(courseIndex, 1);
        localStorage.setItem("users", JSON.stringify(usersFromStorage));
        Course_Card.remove();
        loadCourses();
    });
    Course_Card.appendChild(deleteBtn);
    BoxCourse.appendChild(Course_Card);
}

//===================================================================================
//                            Load Courses
//===================================================================================
function loadCourses() {
    BoxCourse.innerHTML = "";
    var courses = usersFromStorage[indexUser].Courses;
    for (let i = 0; i < courses.length; i++) {
        AddNewCourseToBox(courses[i].CourseName,courses[i].CourseInstructor,i);
    }
}
loadCourses();
//===================================================================================
//                            Find Courses by Instructor Name
//===================================================================================
var InsNameSreach = document.getElementById("InsNameSreach");
function searchByInstructor() {
    var searchValue = InsNameSreach.value.trim().toLowerCase();
    BoxCourse.innerHTML = "";

    var courses = usersFromStorage[indexUser].Courses;

    var filteredCourses = courses.filter(course =>
        course.CourseInstructor.toLowerCase().includes(searchValue)
    );

    if (filteredCourses.length === 0) {
        BoxCourse.innerHTML = `<p style="color:white;">No courses found</p>`;
        return;
    }

    filteredCourses.forEach((course, index) => {
        AddNewCourseToBox(
            course.CourseName,
            course.CourseInstructor,
            index
        );
    });
}
InsNameSreach.addEventListener("input", searchByInstructor);

