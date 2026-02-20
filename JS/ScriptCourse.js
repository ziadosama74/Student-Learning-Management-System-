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
var BoxCourse = document.getElementById("BoxCourse");

var overlay = document.getElementById("confirmOverlay");
var cancelBtn = document.getElementById("cancelDelete");
var confirmBtn = document.getElementById("confirmDelete");
var deleteCallback = null;

// Open popup
function openDeletePopup(callback) {
    deleteCallback = callback;
    overlay.classList.add("show");
}

// Close popup
function closeDeletePopup() {
    overlay.classList.remove("show");
    deleteCallback = null;
}

// Cancel
cancelBtn.addEventListener("click", closeDeletePopup);

// Confirm delete
confirmBtn.addEventListener("click", () => {
    if (deleteCallback) deleteCallback();
    closeDeletePopup();
});

// Close when clicking outside
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeDeletePopup();
});

function deleteCourse(courseIndex) {
    usersFromStorage[indexUser].Courses.splice(courseIndex, 1);
    localStorage.setItem("users", JSON.stringify(usersFromStorage));
    loadCourses();
}


AddCourseBtn.addEventListener("click", () => {
    var selectedValue = CourseSelect.value;
    var instructor = InstructorNameaddCourse.value.trim();

    if (selectedValue === "" || instructor === "") {
        showMessage("error", "Please fill all fields");
        return;
    }
    var CourseFound = false;
    for(var i = 0 ; i < usersFromStorage[indexUser].Courses.length ; i++){
        if(usersFromStorage[indexUser].Courses[i].CourseName == selectedValue) CourseFound = true;
    }
    if(CourseFound) return;
    usersFromStorage[indexUser].Courses.push({
        CourseName: selectedValue,
        CourseInstructor: instructor
    });

    localStorage.setItem("users", JSON.stringify(usersFromStorage));
    showMessage("success", "Course added successfully");
    CourseSelect.value = "";
    InstructorNameaddCourse.value = "";

    loadCourses();
});

function AddNewCourseToBox(selectedValue, instructor, courseIndex) {
    var Course_Card = document.createElement("div");
    Course_Card.classList.add("course-card");

    var course_info = document.createElement("div");
    course_info.classList.add("course-info");

    var course_title = document.createElement("h3");
    course_title.textContent = selectedValue;

    var course_instructor = document.createElement("p");
    course_instructor.textContent = "Eng. " + instructor;

    course_info.appendChild(course_title);
    course_info.appendChild(course_instructor);

    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i> Delete`;

    deleteBtn.addEventListener("click", () => {
        openDeletePopup(() => {
            deleteCourse(courseIndex);
            showMessage("warning", "Course deleted");
        });
    });

    Course_Card.appendChild(course_info);
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




var msgPopup = document.getElementById("msgPopup");
var msgText  = document.getElementById("msgText");
var msgIcon  = document.getElementById("msgIcon");

function showMessage(type, text) {
    msgPopup.className = "msg-popup show";
    msgText.textContent = text;

    msgIcon.className = "fa-solid";

    if (type === "success") {
        msgPopup.firstElementChild.className = "msg-box msg-success";
        msgIcon.classList.add("fa-circle-check");
    }
    else if (type === "error") {
        msgPopup.firstElementChild.className = "msg-box msg-error";
        msgIcon.classList.add("fa-circle-xmark");
    }
    else if (type === "warning") {
        msgPopup.firstElementChild.className = "msg-box msg-warning";
        msgIcon.classList.add("fa-triangle-exclamation");
    }
    else {
        msgPopup.firstElementChild.className = "msg-box msg-info";
        msgIcon.classList.add("fa-circle-info");
    }

    setTimeout(() => {
        msgPopup.classList.remove("show");
    }, 2500);
}

