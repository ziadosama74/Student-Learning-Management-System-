var SignUp = document.getElementById("SignUp");
var Login = document.getElementById("Login");
var Cover = document.getElementById("Cover");
var SignupCard = document.getElementById("SignupCard");
var MsgSiUp = document.getElementById("MsgSiUp");
var MsgSiIn = document.getElementById("MsgSiIn");
SignUp.addEventListener("click",()=>{
    Cover.style.transform = "translateX(-100%)";
    SignupCard.style.zIndex = 1;
    Cover.style.borderRadius = "16px 0 0 16px";
    MsgSiUp.textContent = "";
    MsgSiIn.textContent = "";
});
Login.addEventListener("click",()=>{
    Cover.style.transform = "translateX(0%)";
    SignupCard.style.zIndex = 0;
    Cover.style.borderRadius = "0  16px  16px 0";
    MsgSiUp.textContent = "";
    MsgSiIn.textContent = "";
});