let allpages = ["homepage", "todolist_page", "reminders_page"];
function hide_pages() {
    for (let i = 0; i < allpages.length; i++) {
        let page = document.getElementById(allpages[i]);
        page.style.opacity = 0;
        page.style.zIndex = 1;
    }
}
function show_page(p) {
    let page = document.getElementById(p);
    page.style.zIndex = 3;
    page.style.opacity = 1;
}
function changetheme() {
    var colors_list = document.querySelector(":root");
    colors_list.classList.toggle("dark_mode");
}

function AssignActionToButton() {
    document.getElementById("home_button").addEventListener("click", () => {
        hide_pages();
        show_page("homepage");
    });
    document.getElementById("things_to_do_button").addEventListener("click", () => {
        hide_pages();
        show_page("todolist_page");
    });
    document.getElementById('daily_reminders_button').addEventListener("click", () => {
        hide_pages();
        show_page("reminders_page");
    });
    document.getElementById("themesbutton").addEventListener('click', () => {
        let colors_list = document.querySelector(":root");
        colors_list.classList.toggle("dark_mode");
    });
}

function ChangeGreetingText() {
    var currenttime = new Date();
    var hours = currenttime.getHours();
    var greeting = document.getElementById("greeting");
    if (hours > 18) {
        var greeting_text = "Good Evening";
    } else if (hours > 12) {
        var greeting_text = "Good Afternoon";
    } else {
        var greeting_text = "Good Morning";
    }
    greeting.textContent = greeting_text;
}
function UpdateTime() {
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
    show_page("homepage");
    AssignActionToButton();
    ChangeGreetingText();
    UpdateTime();
    setInterval(() => {
        ChangeGreetingText();
        UpdateTime();
    }, 5000);
};
