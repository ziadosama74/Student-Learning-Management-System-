var FullName = document.getElementById("FN");
var SignUpEmail = document.getElementById("SiUPEM");
var SignUpPass = document.getElementById("SiUPPASS");
var SignUpBtn = document.getElementById("SiUPBTN");
var RegExpFullName = new RegExp("^[A-Za-z\u0600-\u06FF]{2,}(?:\\s+[A-Za-z\u0600-\u06FF]{2,})+$");
var RegExpSignUpEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
//=============================================================================================
// localStorage.setItem("users", JSON.stringify([]));
//=============================================================================================
//=======                               Sign Up Button                                   ======
//=============================================================================================
SignUpBtn.addEventListener("click", () => {
    var Pointer = false ;
    if (!RegExpFullName.test(FullName.value.trim())) {
        FullName.style.cssText = "border: 2px solid red;";
        Pointer = true;
    }
    else{
        FullName.style.cssText = "border: 2px solid #636363;";
    }
    if (!RegExpSignUpEmail.test(SignUpEmail.value.trim())) {
        SignUpEmail.style.cssText = "border: 2px solid red;";
        Pointer = true;
    }
    else{
        SignUpEmail.style.cssText = "border: 2px solid #636363;";
    }
    if (SignUpPass.value.trim() == "") {
        SignUpPass.style.cssText = "border: 2px solid red;";
        Pointer = true;
    }
    else{
        SignUpPass.style.cssText = "border: 2px solid #636363;";
    }
    if(Pointer){
        return;
    }
    else{
        var usersFromStorage = JSON.parse(localStorage.getItem("users"));
        for(var i = 0 ; i < usersFromStorage.length; i++){
            if(usersFromStorage[i].email == SignUpEmail.value){
                MsgSiUp.textContent = "email has already an account";
                MsgSiUp.style.color = "red";
                SignUpEmail.style.cssText = "border: 2px solid red;";
                return;
            }
        }
        var users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({
            name: FullName.value,
            email: SignUpEmail.value,
            password:SignUpPass.value,
            ImgSrc : "/Imgaes/DefultImage.png",
            TasksAll:[],
            Courses:[]
        });
        localStorage.setItem("users", JSON.stringify(users));
        MsgSiUp.textContent = "your account has been created successfully";
        SignUpEmail.style.cssText = "border: 2px solid #636363;";
        MsgSiUp.style.color = "rgb(0, 62, 63)";
    }
});
//=============================================================================================
//=======                               Login  Button                                    ======
//=============================================================================================
var EmailLogin = document.getElementById("EmailLogin");
var PassLogin = document.getElementById("PassLogin");
var BtnLogin = document.getElementById("BtnLogin");
BtnLogin.addEventListener("click",()=>{
    var Found = false;
    var Index = 0;
    var usersFromStorage = JSON.parse(localStorage.getItem("users"));
    for(var i = 0 ; i < usersFromStorage.length ; i++){
        if((usersFromStorage[i].email == EmailLogin.value) && (usersFromStorage[i].password == PassLogin.value)){
            Index = i ;
            Found = true;
            break;
        }
    }
    if(Found){
        window.location.href = `pages/Dashboard.html?index=${Index}`;
    }
    else{
        MsgSiIn.textContent = "Incorrect login";
        MsgSiIn.style.color = "red";
    }
});