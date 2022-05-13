let allpages = ["homepage", "todolist_page", "reminders_page"];
function HidePages() {
    for (let i = 0; i < allpages.length; i++) {
        let page = document.getElementById(allpages[i]);
        page.style.opacity = 0;
        page.style.zIndex = 1;
    }
}
function ShowPage(p) {
    let page = document.getElementById(p);
    page.style.zIndex = 3;
    page.style.opacity = 1;
}
function CheckTask() {
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
        if (inputdate > currentdate) {
            console.log("sucess");
            return true;
        } else if (inputdate == currentdate) {
            currenttime = `${String(currenttime.getHours()).padStart(
                2,
                "0"
            )}:${String(currenttime.getMinutes()).padStart(2, "0")}`;
            if (inputtime > currenttime) {
                console.log("sucess");
                return true;
            } else {
                alert(
                    "Please enter a time in the future, not in the past! [Keep In mind, this is military time]"
                );
                return false;
            }
        } else {
            alert("Please enter today's date or a date in the future!");
            return false;
        }
    } else {
        alert("Please fill up all the fields!");
        return false;
    }
}

function AddTask() {
    
    if (CheckTask()) {
        let TodolistItemsText = document.getElementById("todolist_items").innerText;
        let TodolistItems = document.getElementById("todolist_items");
        var TodolistTable = document.createElement("table");
        var tr = document.createElement("tr")
        var td = document.createElement("td")
        var td2 = document.createElement("td")
        var td3 = document.createElement("td")
        var td_text = document.createTextNode(document.getElementById("task_name").value)
        var td2_text = document.createTextNode(document.getElementById("task_info").value)
        var td3_text = document.createTextNode(document.getElementById("task_date").value)
        if (TodolistItemsText == "Nothing to do... for now ;)") {
            document.getElementById("todolist_items").innerHTML = "";
            document.getElementById("todolist_items").style.justifyContent = "start";
            TodolistTable.id = "todolist_tableitems"
            TodolistItems.appendChild(TodolistTable)

        }
        td.style.width = "20%"
        td.appendChild(td_text)
        td2.style.width = "40%"
        td2.appendChild(td2_text)
        td3.style.width = "40%"
        td3.appendChild(td3_text)

        tr.appendChild(td)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.style.display = 'flex'
        tr.style.flexDirection = "row"
        document.getElementById("todolist_tableitems").appendChild(tr)


    }
}
function AssignActionToButton() {
    document.getElementById("home_button").addEventListener("click", () => {
        HidePages();
        ShowPage("homepage");
    });
    document
        .getElementById("things_to_do_button")
        .addEventListener("click", () => {
            HidePages();
            ShowPage("todolist_page");
        });
    document
        .getElementById("daily_reminders_button")
        .addEventListener("click", () => {
            HidePages();
            ShowPage("reminders_page");
        });
    document.getElementById("themesbutton").addEventListener("click", () => {
        let colors_list = document.querySelector(":root");
        let themesbutton = document.getElementById("themesbutton");
        themesbutton.style.backgroundImage =
            "url(../assets/darkmodebutton.svg)";
        colors_list.classList.toggle("dark_mode");
    });
    document.getElementById("add_task").addEventListener("click", AddTask);
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
    ShowPage("homepage");
    AssignActionToButton();
    ChangeGreetingText();
    UpdateTime();
    setInterval(() => {
        ChangeGreetingText();
        UpdateTime();
    }, 5000);
};
