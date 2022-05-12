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
    document.getElementById("menu_button").onclick = home;
    document.getElementById("things_to_do_button").onclick = todolist_page;
    document.getElementById("themesbutton").onclick = changetheme;
}
window.onload = function () {
    let homepage = document.getElementById("homepage");
    let currenttime = new Date();
    let timetag = document.getElementById("time");
    var hours = currenttime.getHours();
    homepage.style.opacity = 1;
    AssignActionToButton();
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
    setInterval(() => {
        currenttime = new Date();
        hours = currenttime.getHours();
        if (hours > 11) {
            meridiem = "pm";
            if (hours > 12) {
                hours = hours - 12;
            }
        }
        timetag.textContent = `${hours}:${String(
            currenttime.getMinutes()
        ).padStart(2, "0")} ${meridiem}`;
        console.log("yes");
    }, 5000);
};
