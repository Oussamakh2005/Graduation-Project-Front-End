const logoutBatn = document.getElementById("logout-btn");
logoutBatn.addEventListener("click", () => {
    if(localStorage.getItem("token")){
        localStorage.removeItem("token");
    }
    window.location.href = "../../main/login.html";
});