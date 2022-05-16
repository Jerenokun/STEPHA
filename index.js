const allpages = ["homepage", "todolist_page", "reminders_page", "toolspage"];

var deletetasknum = 0;
var reminder202020 = 0;

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
            return true;
        } else if (inputdate == currentdate) {
            currenttime = `${String(currenttime.getHours()).padStart(
                2,
                "0"
            )}:${String(currenttime.getMinutes()).padStart(2, "0")}`;
            if (inputtime > currenttime) {
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
        var anchors = document.getElementsByClassName("checkmark");
        for (var i = 0; i < anchors.length; i++) {
            var anchor = anchors[i];
            anchor.addEventListener("change", function () {
                this.parentElement.parentElement.className = "done";
            });
        }
    }
}

function ChangeGreetingText() {
    var currenttime = new Date();
    var hours = currenttime.getHours();
    var greeting = document.getElementById("greeting");
    if (hours > 17) {
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
        for (var i = 0; i < data.length; i++) {
            let currentdate = new Date();
            let itemdate = data[i].children[2].innerText;
            let itemtime = data[i].children[3].innerText;
            let currenttime = currentdate;
            currentdate = new Date();
            currentdate = `${currentdate.getFullYear()}-${String(
                currentdate.getMonth() + 1
            ).padStart(2, "0")}-${String(currentdate.getDate()).padStart(
                2,
                "0"
            )}`;
            currenttime = `${String(currenttime.getHours()).padStart(
                2,
                "0"
            )}:${String(currenttime.getMinutes()).padStart(2, "0")}`;
            if (data[i].className != "reminded") {
                if (itemdate == currentdate) {
                    if (itemtime == currenttime) {
                        // new Notification("Event", { body: "You have a new event" })
                        alert("Yo shit is here");
                        data[i].className = "reminded";
                    }
                }
            }
        }
    } catch {}
}
function Reminder202020() {
    if (document.getElementById("202020reminder").checked) {
        reminder202020++;
    } else {
        reminder202020 = 0;
    }
    if (reminder202020 == 240) {
        new Notification("202020 Reminder", {
            body: "20-20-20 Reminder Boi/Girl! Rest your eyes and take a break for at least 20 secs",
        });
        reminder202020 = 0;
    }
}
let remindedmeal = false;
function ReminderMeals() {
    var currenttime = new Date();

    if (document.getElementById("breakfastreminder").checked) {
        if (currenttime.getHours() == 7 && !remindedmeal) {
            new Notification("Eat Breakfast!", {
                body: "Don't forget to eat your breakfast rn or later!!",
            });
            remindedmeal = true;
        }
    }
    if (document.getElementById("lunchreminder").checked) {
        if (currenttime.getHours() == 12 && !remindedmeal) {
            new Notification("Eat Lunch!", {
                body: "Don't forget to eat your lunch rn or later!!",
            });
            remindedmeal = true;
        }
    }
    if (document.getElementById("dinnerreminder").checked) {
        if (currenttime.getHours() == 18 && !remindedmeal) {
            new Notification("Eat Dinner!", {
                body: "Don't forget to eat your dinner rn or later!!",
            });
            remindedmeal = true;
        }
    }
    if (
        currenttime.getHours() != 7 &&
        currenttime.getHours() != 12 &&
        currenttime.getHours() != 18
    ) {
        remindedmeal = false;
    }
}
function PickQuote() {
    let quotes = ["No one stays the same -- everyone will change who they are to you.",
        "Being normal is just being good. Being better is just being more. Being great is just being excessive.",
        "Personality is temporary -- nature isn't. Don't let a bad personality become you're nature.",
        "What you're wishing for or looking for, you already have. It's just your choice whether or not to use it.", 
        "A failing person is the effect of a failing teacher.",
        "Embrace the darkness, become the light.",
        "Opinions are like a coin: The bad thing about being on one side of a coin is you'll never see your opposite. And the bad thing about being the middle of the coin is you'll never stand by yourself.",
        "I'd rather live life like the poor than to be privileged and watch the world burn.",
        "Never fight with stupid people; they always win. Think about it.",
        "Jeremy: You never start a relationship with lovers.",
        "We always start as beginners",
        "Stay normal and regular, but never make it a standard.",
        "Be positive to live in a lie and never grow. Be negative to face reality and develop.",  
        "Our purpose in life is not to enjoy it, but to make others do.", 
        "Remember the things you lost on your way to success.",   
        "People can grab opportunities, but only a few can hold on to it.",
        "Stop waiting for your own miracle, make it.",
        "Make pain an ally and you'll never have to feel it ever again.",
        "No one has their own life, nor time, nor property, everything belongs to everyone."]
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('daily_quote').innerHTML = quote + " - Bullet Lim Santiago"
}
function AssignActionToButton() {
    document.getElementById("home_button").addEventListener("click", () => {
        HidePages();
        ShowPage("homepage");
        document.body.style.overflow = "visible";
    });
    document
        .getElementById("things_to_do_button")
        .addEventListener("click", () => {
            HidePages();
            ShowPage("todolist_page");
            document.body.style.overflow = "visible";
        });
    document
        .getElementById("daily_reminders_button")
        .addEventListener("click", () => {
            HidePages();
            ShowPage("reminders_page");
            document.body.style.overflow = "visible";
        });
    document.getElementById("tools_button").addEventListener("click", () => {
        HidePages();
        ShowPage("toolspage");
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
    });
    document.getElementById("themesbutton").addEventListener("click", () => {
        let colors_list = document.querySelector(":root");

        colors_list.classList.toggle("dark_mode");
    });
    document.getElementById("add_task").addEventListener("click", AddTask);
}

window.onload = function () {
    ShowPage("homepage");
    AssignActionToButton();
    ChangeGreetingText();
    UpdateTime();
    PickQuote()
    setInterval(() => {
        ChangeGreetingText();
        UpdateTime();
        RemindTasks();
        Reminder202020();
        ReminderMeals();
    }, 5000);
};
