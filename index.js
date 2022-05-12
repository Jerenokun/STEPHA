let allpages = ["homepage", "todolist_page"];
function todolist_page() {
    for (let i = 0; i < allpages.length; i++) {
        let page = document.getElementById(allpages[i]);
        page.style.opacity = 0;
        page.style.zIndex = 1;
    }
    let page2 = document.getElementById("todolist_page");
    page2.style.zIndex = 3;
    page2.style.opacity = 1;
    console.log("todo");
}
function home() {
    for (let i = 0; i < allpages.length; i++) {
        let page = document.getElementById(allpages[i]);
        page.style.opacity = 0;
        page.style.zIndex = 1;
    }
    let page2 = document.getElementById("homepage");
    page2.style.zIndex = 3;
    page2.style.opacity = 1;
    console.log("home");
}
function changetheme() {
    var colors_list = document.querySelector(":root");
    colors_list.classList.toggle("dark_mode");
}

function AssignActionToButton() {
    document.getElementById("home_button").onclick = home;
    document.getElementById("things_to_do_button").onclick = todolist_page;
    document.getElementById("themesbutton").onclick = changetheme;
}

function ChangeGreetingText() {
    var currenttime = new Date();
    var hours = currenttime.getHours();
    var greeting = document.getElementById("greeting")
    if (hours > 18) {
        var greeting_text = "Good Evening";
    } else if (hours > 12) {
        var greeting_text = "Good Afternoon";
    } else {
        var greeting_text = "Good Morning";
    }
    greeting.textContent = greeting_text;
}
function UpdateTime(){
    var currenttime = new Date();
    var hours = currenttime.getHours();
    var timetag = document.getElementById("time");
    if (hours > 11) {
        var meridiem = "pm";
        if (hours > 12) {
            hours = hours - 12;
        }
    }
    timetag.textContent = `${hours}:${String(currenttime.getMinutes()).padStart(
        2,
        "0"
    )} ${meridiem}`;
}
window.onload = function () {
    let homepage = document.getElementById("homepage");
    homepage.style.opacity = 1;
    AssignActionToButton();
    ChangeGreetingText()
    UpdateTime()
    setInterval(() => {
        ChangeGreetingText()
        UpdateTime()}, 5000);
};
