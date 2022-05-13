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
function check_task() {
    let elements = ["task_name", "task_info", "task_date", "task_time"];
    let AnswersNotBlank = true;
    for (let i = 0; i < elements.length; i++) {
        if (
            document.getElementById(elements[i]).value.split(" ").join("") == ""
        ) {
            AnswersNotBlank = false;
        }
    }
    if (AnswersNotBlank) {
        let inputdate = document.getElementById("task_date").value;
        let inputtime = document.getElementById("task_time").value;
        datetime = new Date(`${inputdate} ${inputtime}`);
        currentdate = new Date();
        currenttime = currentdate;
        currentdate = `${currentdate.getFullYear()}-${String(
            currentdate.getMonth() + 1
        ).padStart(2, "0")}-${String(currentdate.getDate()).padStart(2, "0")}`;
        if (inputdate == currentdate) {
            currenttime = `${String(currenttime.getHours()).padStart(
                2,
                "0"
            )}:${String(currenttime.getMinutes()).padStart(2, "0")}`;
            if (inputtime > currenttime) {
                console.log("sucess");
            } else {
                alert(
                    "Please enter a time in the future, not in the past! [Keep In mind, this is military time]"
                );
            }
        } else {
            alert("Please enter today's date or a date in the future!");
        }
    } else {
        alert("Please fill up all the fields!");
        return false;
    }
}

function add_task() {
    console.log(check_task());
}
function AssignActionToButton() {
    document.getElementById("home_button").addEventListener("click", () => {
        hide_pages();
        show_page("homepage");
    });
    document
        .getElementById("things_to_do_button")
        .addEventListener("click", () => {
            hide_pages();
            show_page("todolist_page");
        });
    document
        .getElementById("daily_reminders_button")
        .addEventListener("click", () => {
            hide_pages();
            show_page("reminders_page");
        });
    document.getElementById("themesbutton").addEventListener("click", () => {
        let colors_list = document.querySelector(":root");
        let themesbutton = document.getElementById("themesbutton");
        themesbutton.style.backgroundImage =
            "url(../assets/darkmodebutton.svg)";
        colors_list.classList.toggle("dark_mode");
    });
    document.getElementById("add_task").addEventListener("click", add_task);
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
