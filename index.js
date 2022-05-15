const allpages = ["homepage", "todolist_page", "reminders_page"];
var deletetasknum = 0;
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
        var TodolistItemsText =
            document.getElementById("todolist_items").innerText;
        var TodolistItems = document.getElementById("todolist_items");
        var TodolistTable = document.createElement("table");
        if (TodolistItemsText == "Nothing to do... for now ;)") {
            document.getElementById("todolist_items").innerHTML = "";
            document.getElementById("todolist_items").style = "";
            document.getElementById("todolist_items").style.justifyContent =
                "start";
            TodolistTable.id = "todolist_tableitems";
            TodolistItems.appendChild(TodolistTable);
        }

        var CheckBox = document.createElement("input");
        CheckBox.type = "checkbox";
        CheckBox.className = "checkmark";
        CheckBox.style.marginRight = "10px";

        var TaskName = document.createElement("td");
        var td_text = document.createTextNode(
            document.getElementById("task_name").value
        );
        TaskName.style.width = "10%";
        TaskName.appendChild(CheckBox);
        TaskName.appendChild(td_text);

        var TaskInfo = document.createElement("td");
        var td2_text = document.createTextNode(
            document.getElementById("task_info").value
        );
        TaskInfo.style.width = "40%";
        TaskInfo.style.paddingRight = "10px";
        TaskInfo.appendChild(td2_text);

        var TaskDate = document.createElement("td");
        var td3_text = document.createTextNode(
            document.getElementById("task_date").value
        );
        TaskDate.style.width = "40%";
        TaskDate.appendChild(td3_text);

        var TaskTime = document.createElement("td");
        var td4_text = document.createTextNode(
            document.getElementById("task_time").value
        );
        TaskTime.style.width = "10%";
        TaskTime.appendChild(td4_text);

        var TaskDelete = document.createElement("span");
        var TaskDelete_text = document.createTextNode("\u00D7");
        TaskDelete.style.marginLeft = "10px";
        TaskDelete.style.display = "block";
        TaskDelete.style.cursor = "pointer";
        TaskDelete.id = "deletetask" + String(deletetasknum);
        TaskDelete.className = "deletetask";
        TaskDelete.appendChild(TaskDelete_text);

        var TaskRow = document.createElement("tr");
        TaskRow.style.display = "flex";
        TaskRow.style.flexDirection = "row";
        TaskRow.appendChild(TaskName);
        TaskRow.appendChild(TaskInfo);
        TaskRow.appendChild(TaskDate);
        TaskRow.appendChild(TaskTime);
        TaskRow.appendChild(TaskDelete);
        const TaskId = "deletetask" + String(deletetasknum);
        document.getElementById("todolist_tableitems").appendChild(TaskRow);
        document.getElementById("deletetask" + String(deletetasknum)).onclick =
            () => {
                document.getElementById(TaskId).parentElement.remove();
                TodolistItemsText =
                    document.getElementById("todolist_items").innerText;
                console.log(TodolistItemsText);
                if (TodolistItemsText == "") {
                    document.getElementById("todolist_items").innerHTML =
                        "Nothing to do... for now ;)";
                    document.getElementById("todolist_items").style.display =
                        "flex";
                    document.getElementById("todolist_items").style.alignItems =
                        "center";
                    document.getElementById(
                        "todolist_items"
                    ).style.justifyContent = "center";
                }
            };
        deletetasknum += 1;
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
    } else {
        var meridiem = "am";
    }
    timetag.textContent = `${hours}:${String(currenttime.getMinutes()).padStart(
        2,
        "0"
    )} ${meridiem}`;
}
function RemindTasks() {
    try {
        let data = document.getElementById("todolist_tableitems").children;
        console.log(data[0]);
    } catch {}
}
window.onload = function () {
    ShowPage("homepage");
    AssignActionToButton();
    ChangeGreetingText();
    UpdateTime();
    setInterval(() => {
        ChangeGreetingText();
        UpdateTime();
        RemindTasks();
    }, 5000);
};
