const allpages = [
    "homepage",
    "todolist_page",
    "reminders_page",
    "gamespage",
    "toolspage",
];
const electron = require("electron");
const fs = require("fs");
const math = require("mathjs")
let calcdisplay = document.getElementById("MathEntryBox")
var deletetasknum = 0;
var reminder202020 = 0;
var breakfasttime = 7;
var lunchtime = 12;
var dinnertime = 18;
var light_mode = new Audio("audio/light.m4a")
var dark_mode = new Audio("audio/darkness.m4a")
var EnterTimeInFuture = new Audio("audio/EnterTimeIntheFuture.m4a")
var EnterTodayFutureDate = new Audio("audio/EnterTodayFutureDate.m4a")
var Fillup = new Audio("audio/FIllup.m4a")
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
function MuteAudio() {
    dark_mode.pause()
    dark_mode.volume = 0
    light_mode.pause()
    light_mode.volume = 0
    EnterTimeInFuture.pause()
    EnterTimeInFuture.volume = 0
    EnterTodayFutureDate.pause()
    EnterTodayFutureDate.volume = 0
    Fillup.pause()
    Fillup.volume = 0
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
                notify("warning", "Please enter a time in the future, not in the past! [Keep In mind, this is military time]")
                MuteAudio()
                EnterTimeInFuture.volume = 1
                EnterTimeInFuture.currentTime = 0
                EnterTimeInFuture.play()

                return false;
            }
        } else {
            notify("warning", "Please enter today's date or a date in the future!")
            MuteAudio()
            EnterTodayFutureDate.volume = 1
            EnterTodayFutureDate.currentTime = 0
            EnterTodayFutureDate.play()
            return false;
        }
    } else {
        notify("okay", "Please fill up all the fields!")
        MuteAudio()
        Fillup.volume = 1
        Fillup.currentTime = 0
        Fillup.play()
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
                let RowIndex =
                    document.getElementById(TaskId).parentElement.rowIndex;
                fs.readFile(
                    "resources/app/src/data.json",
                    "utf8",
                    (err, jsonString) => {
                        if (err) {
                            console.log("File read failed:", err);
                            return;
                        }
                        try {
                            let SavedData = JSON.parse(jsonString);
                            SavedData["tasks"].splice(RowIndex, 1);
                            jsonString = JSON.stringify(SavedData);
                            fs.writeFile(
                                "resources/app/src/data.json",
                                jsonString,
                                (err) => {
                                    if (err) {
                                        console.log("Error writing file", err);
                                    } else {
                                        console.log("Successfully wrote file");
                                    }
                                }
                            );
                        } catch (err) {
                            console.log(err);
                        }
                    }
                );
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
        var checkmarks = document.getElementsByClassName("checkmark");
        for (var i = 0; i < checkmarks.length; i++) {
            var anchor = checkmarks[i];
            anchor.addEventListener("change", function () {
                this.parentElement.parentElement.className = "done";
                var RowIndex = this.parentElement.parentElement.rowIndex;
                fs.readFile(
                    "resources/app/src/data.json",
                    "utf8",
                    (err, jsonString) => {
                        if (err) {
                            console.log("File read failed:", err);
                            return;
                        }
                        console.log("it works");
                        let SavedData = JSON.parse(jsonString);
                        SavedData["tasks"][Number(RowIndex)]["taskcompleted?"] =
                            "done";
                        jsonString = JSON.stringify(SavedData);
                        fs.writeFile(
                            "resources/app/src/data.json",
                            jsonString,
                            (err) => {
                                if (err) {
                                    console.log("Error writing file", err);
                                } else {
                                    console.log(
                                        "Successfully updated checkbox"
                                    );
                                }
                            }
                        );
                    }
                );
            });
        }
        UpdateData();
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
                if (data[i].className != "done") {
                    console.log(itemtime <= currenttime);

                    if (itemdate <= currentdate) {
                        if (itemtime <= currenttime || itemdate < currentdate) {
                            data[i].className = "reminded";
                            new Notification("Event", {
                                body: `You have a new event ${data[i].children[0].innerText} - ${data[i].children[1].innerText}`,
                            });
                            console.log("sdfsf");
                            var RowIndex = data[i].rowIndex;
                            fs.readFile(
                                "resources/app/src/data.json",
                                "utf8",
                                (err, jsonString) => {
                                    if (err) {
                                        console.log("File read failed:", err);
                                        return;
                                    }
                                    console.log("yes");
                                    let SavedData = JSON.parse(jsonString);
                                    SavedData["tasks"][Number(RowIndex)][
                                        "taskcompleted?"
                                    ] = "reminded";
                                    jsonString = JSON.stringify(SavedData);
                                    fs.writeFile(
                                        "resources/app/src/data.json",
                                        jsonString,
                                        (err) => {
                                            if (err) {
                                                console.log(
                                                    "Error writing file",
                                                    err
                                                );
                                            } else {
                                                console.log(
                                                    "Successfully wrote  ffile"
                                                );
                                            }
                                        }
                                    );
                                }
                            );
                        }
                    }
                }
            }
        }
    } catch {}
}
function notify(type,message){
    (()=>{
      let n = document.createElement("div");
      let delete_notif = document.createElement("span")
      let id = Math.random().toString(36).substr(2,10);
      n.setAttribute("id",id);
      n.classList.add("notification",type);
      n.innerText = message;
      delete_notif.innerText = "\u00D7"
      delete_notif.style.float = "right"
      delete_notif.style.cursor = "pointer"
      delete_notif.addEventListener("click", ()=>{
          document.getElementById(id).remove()
      })
      n.appendChild(delete_notif)
      n.style.textAlign = "left"
      document.getElementById("notification-area").appendChild(n);
      
      setTimeout(()=>{
        var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
        for(let i=0;i<notifications.length;i++){
          if(notifications[i].getAttribute("id") == id){
            notifications[i].remove();
            break;
          }
        }
      },10000);
    })();
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
        if (currenttime.getHours() == breakfasttime && !remindedmeal) {
            new Notification("Eat Breakfast!", {
                body: "Don't forget to eat your breakfast rn or later!!",
            });
            remindedmeal = true;
        }
    }
    if (document.getElementById("lunchreminder").checked) {
        if (currenttime.getHours() == lunchtime && !remindedmeal) {
            new Notification("Eat Lunch!", {
                body: "Don't forget to eat your lunch rn or later!!",
            });
            remindedmeal = true;
        }
    }
    if (document.getElementById("dinnerreminder").checked) {
        if (currenttime.getHours() == dinnertime && !remindedmeal) {
            new Notification("Eat Dinner!", {
                body: "Don't forget to eat your dinner rn or later!!",
            });
            remindedmeal = true;
        }
    }
    if (
        currenttime.getHours() != breakfasttime &&
        currenttime.getHours() != lunchtime &&
        currenttime.getHours() != dinnertime
    ) {
        remindedmeal = false;
    }
}
function PickQuote() {
    let quotes = [
        "No one stays the same -- everyone will change who they are to you.",
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
        "No one has their own life, nor time, nor property, everything belongs to everyone.",
    ];
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("daily_quote").innerHTML =
        quote + " - Bullet Lim Santiago";
}
function UpdateRemindersConfig() {
    fs.readFile(
        "resources/app/src/remindersconfig.json",
        "utf8",
        (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err);
                return;
            }
            try {
                let elements = ["breakfasttime", "lunchtime", "dinnertime"];
                var AnswersNotBlank = true;
                for (let i = 0; i < elements.length; i++) {
                    if (
                        document
                            .getElementById(elements[i])
                            .value.split(" ")
                            .join("") == ""
                    ) {
                        AnswersNotBlank = false;
                    }
                }
                if (AnswersNotBlank) {
                    let SavedData = JSON.parse(jsonString);
                    breakfasttime = Number(
                        document.getElementById("breakfasttime").value
                    );
                    lunchtime = Number(
                        document.getElementById("lunchtime").value
                    );
                    dinnertime = Number(
                        document.getElementById("dinnertime").value
                    );
                    SavedData["breakfasttime"] = breakfasttime;
                    SavedData["lunchtime"] = lunchtime;
                    SavedData["dinnertime"] = dinnertime;
                    jsonString = JSON.stringify(SavedData);
                    fs.writeFile(
                        "resources/app/src/remindersconfig.json",
                        jsonString,
                        (err) => {
                            if (err) {
                                console.log("Error writing file", err);
                            } else {
                                console.log("Successfully wrote file");
                            }
                        }
                    );
                } else {
                    notify("okay", "Please fill up all the fields!")
                    MuteAudio()
                    Fillup.volume = 1
                    Fillup.currentTime = 0
                    Fillup.play()
                }
            } catch (err) {
                console.log(err);
            }
        }
    );
}
function AssignActionToButton() {
    document.getElementById("home_button").addEventListener("click", () => {
        HidePages();
        ShowPage("homepage");
        document.body.style.overflow = "visible";
        document.getElementById("stackgame_play").style.display = "flex";
        document.getElementById("snakegame_play").style.display = "flex";
    });
    document.getElementById("gototodolist").addEventListener("click", () => {
        HidePages();
        ShowPage("todolist_page");
        document.body.style.overflow = "visible";
        document.getElementById("stackgame_play").style.display = "flex";
        document.getElementById("snakegame_play").style.display = "flex";
    });
    document
        .getElementById("things_to_do_button")
        .addEventListener("click", () => {
            HidePages();
            ShowPage("todolist_page");
            document.body.style.overflow = "visible";
            document.getElementById("stackgame_play").style.display = "flex";
            document.getElementById("snakegame_play").style.display = "flex";
        });
    document
        .getElementById("daily_reminders_button")
        .addEventListener("click", () => {
            HidePages();
            ShowPage("reminders_page");
            document.body.style.overflow = "visible";
            document.getElementById("stackgame_play").style.display = "flex";
            document.getElementById("snakegame_play").style.display = "flex";
        });
    document.getElementById("games_button").addEventListener("click", () => {
        HidePages();
        ShowPage("gamespage");
        window.scrollTo(0, 0);
    });
    document.getElementById("tools_button").addEventListener("click", () => {
        HidePages();
        ShowPage("toolspage");
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
        document.body.style.overflow = "visible";
        document.getElementById("stackgame_play").style.display = "flex";
        document.getElementById("snakegame_play").style.display = "flex";
    });
    document.getElementById("themesbutton").addEventListener("click", () => {
        let colors_list = document.querySelector(":root");
        colors_list.classList.toggle("dark_mode");
        console.log(document.classList)
        if (colors_list.classList.contains("dark_mode")) {
            MuteAudio()
            light_mode.volume = 1
            light_mode.currentTime = 0
            light_mode.play()
        } else {
            light_mode.pause()
            light_mode.volume = 0
            dark_mode.volume = 1
            dark_mode.currentTime = 0
            dark_mode.play()
        }
    });
    document.getElementById("add_task").addEventListener("click", AddTask);
    document
        .getElementById("save_remindersconfig")
        .addEventListener("click", UpdateRemindersConfig);
    document.getElementById("202020reminder").addEventListener("change", () => {
        fs.readFile(
            "resources/app/src/remindercheckboxesconfig.json",
            "utf8",
            (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                let SavedData = JSON.parse(jsonString);
                SavedData["202020reminder"] =
                    document.getElementById("202020reminder").checked;

                jsonString = JSON.stringify(SavedData);
                fs.writeFile(
                    "resources/app/src/remindercheckboxesconfig.json",
                    jsonString,
                    (err) => {
                        if (err) {
                            console.log("Error writing file", err);
                        } else {
                            console.log("Successfully wrote  ffile");
                        }
                    }
                );
            }
        );
    });
    document
        .getElementById("breakfastreminder")
        .addEventListener("change", () => {
            fs.readFile(
                "resources/app/src/remindercheckboxesconfig.json",
                "utf8",
                (err, jsonString) => {
                    if (err) {
                        console.log("File read failed:", err);
                        return;
                    }
                    let SavedData = JSON.parse(jsonString);
                    console.log(
                        document.getElementById("breakfastreminder").checked
                    );
                    SavedData["breakfasttime"] =
                        document.getElementById("breakfastreminder").checked;

                    jsonString = JSON.stringify(SavedData);
                    fs.writeFile(
                        "resources/app/src/remindercheckboxesconfig.json",
                        jsonString,
                        (err) => {
                            if (err) {
                                console.log("Error writing file", err);
                            } else {
                                console.log("Successfully wrote  ffile");
                            }
                        }
                    );
                }
            );
        });
    document.getElementById("lunchreminder").addEventListener("change", () => {
        fs.readFile(
            "resources/app/src/remindercheckboxesconfig.json",
            "utf8",
            (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                let SavedData = JSON.parse(jsonString);
                console.log(document.getElementById("lunchreminder").checked);
                SavedData["lunchtime"] =
                    document.getElementById("lunchreminder").checked;

                jsonString = JSON.stringify(SavedData);
                fs.writeFile(
                    "resources/app/src/remindercheckboxesconfig.json",
                    jsonString,
                    (err) => {
                        if (err) {
                            console.log("Error writing file", err);
                        } else {
                            console.log("Successfully wrote  ffile");
                        }
                    }
                );
            }
        );
    });
    document.getElementById("dinnerreminder").addEventListener("change", () => {
        fs.readFile(
            "resources/app/src/remindercheckboxesconfig.json",
            "utf8",
            (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                let SavedData = JSON.parse(jsonString);
                console.log(document.getElementById("dinnerreminder").checked);
                SavedData["dinnertime"] =
                    document.getElementById("dinnerreminder").checked;

                jsonString = JSON.stringify(SavedData);
                fs.writeFile(
                    "resources/app/src/remindercheckboxesconfig.json",
                    jsonString,
                    (err) => {
                        if (err) {
                            console.log("Error writing file", err);
                        } else {
                            console.log("Successfully wrote  ffile");
                        }
                    }
                );
            }
        );
    });
    document
        .getElementById("snakegame_play_btn")
        .addEventListener("click", () => {
            document.getElementById("snakegame_play").style.display = "none";
            document.getElementById("stackgame_play").style.display = "flex";
            document.getElementById("snakegame").focus();

        });
    document
        .getElementById("stackgame_play_btn")
        .addEventListener("click", () => {
            document.getElementById("stackgame_play").style.display = "none";
            document.getElementById("snakegame_play").style.display = "flex";
            document.getElementById("stackgame").focus();
        });
    document.getElementById("MathEntryBox").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            calculate(this.form);
        }
    })
}
function UpdateData() {
    fs.readFile("resources/app/src/data.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        try {
            let SavedData = JSON.parse(jsonString);
            try {
                let TaskSaveData = {
                    "taskcompleted?": false,
                    taskname: document.getElementById("task_name").value,
                    taskinfo: document.getElementById("task_info").value,
                    taskdate: document.getElementById("task_date").value,
                    tasktime: document.getElementById("task_time").value,
                };
                SavedData["tasks"].push(TaskSaveData);
                const jsonString = JSON.stringify(SavedData);
                fs.writeFile(
                    "resources/app/src/data.json",
                    jsonString,
                    (err) => {
                        if (err) {
                            console.log("Error writing file", err);
                        } else {
                            console.log("Successfully wrote file");
                        }
                    }
                );
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    });
}
function UpdateTodolistHomepage() {
    let todolistitems = document.getElementById("todolist_items");
    let todolistitemstext = "";
    if (todolistitems.innerHTML == "Nothing to do... for now ;)") {
        document.getElementById("todolisthomepage").style.textAlign = "center";

        document.getElementById(
            "todolisthomepage"
        ).innerHTML = `You have nothing to do for this week, let's celebrate!<br /> <div id="celebration"></div>`;
    } else {
        document.getElementById("todolisthomepage").style.textAlign = "left";
        todolistitems.innerText.split("\u00D7").forEach((item) => {
            todolistitemstext += `<div style="text-align:justify;margin-bottom:-20px;">${item} <span style="width:100%;display:inline-block"></span></div>`;
        });
        document.getElementById("todolisthomepage").innerHTML =
            todolistitemstext;
    }
}
function LoadData() {
    let SavedDataCollection = require("./data.json");
    let remindersconfig = require("./remindersconfig.json");
    let reminderchecked = require("./remindercheckboxesconfig.json");
    let breakfast = remindersconfig["breakfasttime"];
    let lunch = remindersconfig["lunchtime"];
    let dinner = remindersconfig["dinnertime"];
    document.getElementById("reminders_list").innerHTML = "";
    document.getElementById(
        "reminders_list"
    ).innerHTML = `20 minutes <br>${breakfast} (military time)<br>${lunch}(military time)<br>${dinner} (military time)<br>`;
    breakfasttime = breakfast;
    lunchtime = lunch;
    dinnertime = dinner;
    SavedDataCollection = SavedDataCollection["tasks"];
    var TodolistItems = document.getElementById("todolist_items");
    var TodolistTable = document.createElement("table");
    document.getElementById("todolist_items").innerHTML = "";
    document.getElementById("todolist_items").style = "";
    document.getElementById("todolist_items").style.justifyContent = "start";
    TodolistTable.id = "todolist_tableitems";
    TodolistItems.appendChild(TodolistTable);
    for (let i = 0; i < SavedDataCollection.length; i++) {
        let SavedData = SavedDataCollection[i];

        var CheckBox = document.createElement("input");
        CheckBox.type = "checkbox";
        CheckBox.className = "checkmark";
        CheckBox.style.marginRight = "10px";
        if (SavedData["taskcompleted?"] == "done") {
            CheckBox.checked = true;
        }
        var TaskName = document.createElement("td");
        var td_text = document.createTextNode(SavedData["taskname"]);
        TaskName.style.width = "10%";
        TaskName.appendChild(CheckBox);
        TaskName.appendChild(td_text);

        var TaskInfo = document.createElement("td");
        var td2_text = document.createTextNode(SavedData["taskinfo"]);
        TaskInfo.style.width = "40%";
        TaskInfo.style.paddingRight = "10px";
        TaskInfo.appendChild(td2_text);

        var TaskDate = document.createElement("td");
        var td3_text = document.createTextNode(SavedData["taskdate"]);
        TaskDate.style.width = "40%";
        TaskDate.appendChild(td3_text);

        var TaskTime = document.createElement("td");
        var td4_text = document.createTextNode(SavedData["tasktime"]);
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
                let RowIndex =
                    document.getElementById(TaskId).parentElement.rowIndex;
                fs.readFile(
                    "resources/app/src/data.json",
                    "utf8",
                    (err, jsonString) => {
                        if (err) {
                            console.log("File read failed:", err);
                            return;
                        }
                        let SavedData = JSON.parse(jsonString);
                        SavedData["tasks"].splice(RowIndex, 1);
                        jsonString = JSON.stringify(SavedData);
                        fs.writeFile(
                            "resources/app/src/data.json",
                            jsonString,
                            (err) => {
                                if (err) {
                                    console.log("Error writing file", err);
                                } else {
                                    console.log("Successfully wrotef file");
                                }
                            }
                        );
                    }
                );
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
        var checkmarks = document.getElementsByClassName("checkmark");
        for (let i = 0; i < checkmarks.length; i++) {
            var checkmark = checkmarks[i];
            console.log(SavedData["taskcompleted?"]);
            checkmark.addEventListener("change", function () {
                this.parentElement.parentElement.className = "done";
                var RowIndex = this.parentElement.parentElement.rowIndex;
                fs.readFile(
                    "resources/app/src/data.json",
                    "utf8",
                    (err, jsonString) => {
                        if (err) {
                            console.log("File read failed:", err);
                            return;
                        }
                        console.log("it works");
                        let SavedData = JSON.parse(jsonString);
                        SavedData["tasks"][Number(RowIndex)]["taskcompleted?"] =
                            "done";
                        jsonString = JSON.stringify(SavedData);
                        fs.writeFile(
                            "resources/app/src/data.json",
                            jsonString,
                            (err) => {
                                if (err) {
                                    console.log("Error writing file", err);
                                } else {
                                    console.log(
                                        "Successfully updated checkbox"
                                    );
                                }
                            }
                        );
                    }
                );
            });
        }
        if (
            SavedData["taskcompleted?"] == "done" &&
            SavedData["taskcompleted?"] != "reminded"
        ) {
            checkmark.checked = true;
            checkmark.parentElement.parentElement.className = "done";
        }
        if (SavedData["taskcompleted?"] == "reminded") {
            checkmark.parentElement.parentElement.className = "reminded";
        }
        if (SavedData["taskcompleted?"] == "done") {
            checkmark.checked = true;
            checkmark.parentElement.parentElement.className = "done";
        }
    }
    if (SavedDataCollection.length == 0) {
        document.getElementById("todolist_items").innerHTML =
            "Nothing to do... for now ;)";
        document.getElementById("todolist_items").style.display = "flex";
        document.getElementById("todolist_items").style.alignItems = "center";
        document.getElementById("todolist_items").style.justifyContent =
            "center";
    }
    if (reminderchecked["202020reminder"]) {
        document.getElementById("202020reminder").checked = true;
    }
    if (reminderchecked["breakfasttime"]) {
        document.getElementById("breakfastreminder").checked = true;
    }
    if (reminderchecked["lunchtime"]) {
        document.getElementById("lunchreminder").checked = true;
    }
    if (reminderchecked["dinnertime"]) {
        document.getElementById("dinnerreminder").checked = true;
    }
}
function DisableScrollbarWhenGaming() {
    let snakegame = document.getElementById("snakegame")
    let stackgame = document.getElementById("stackgame")
    let activelement = document.activeElement
    if (activelement == snakegame) {
        document.body.style.overflowY = "hidden"
    } else if (activelement == stackgame) {
        document.body.style.overflowY = "hidden"
    } else {
        document.body.style.overflowY = "scroll"

    }
}
function backspace(calc) {
    let calcdisplay = document.getElementById("MathEntryBox")
    size = calcdisplay.value.length;
    calcdisplay.value = calc.display.value.substring(0, size - 1);
}
function calculate(calc) {
    let calcdisplay = document.getElementById("MathEntryBox")
    try {
        calcdisplay.value = math.evaluate(calcdisplay.value);
        
    } catch {
        calcdisplay.value = "Error";
    }
}
function calcdisplayval(val) {
    let calcdisplay = document.getElementById("MathEntryBox")
    if (val == "delete") {
        calcdisplay.value = ""
    } else {
       calcdisplay.value += val;  
    }  
}
window.onload = function () {
    let CalmMusic = new Audio("audio/startup.mp3");
    let Startup = new Audio("audio/ready.m4a");
    CalmMusic.play();

    document.getElementById("startup_img").style.transition = "opacity 3s";
    document.getElementById("startup_img").style.opacity = "1";

    window.setTimeout(() => {
        document.getElementById("startup").style.transition = "all 3s";
        document.getElementById("startup").style.opacity = "0";
        document.body.style.overflowY = "scroll";
        Startup.play();
    }, 15000);
    window.setTimeout(() => {
        document.getElementById("startup").style.display = "none";
        setInterval(() => {
            DisableScrollbarWhenGaming();
        }, 1000);
    }, 18000);

    ShowPage("homepage");
    AssignActionToButton();
    ChangeGreetingText();
    UpdateTime();
    PickQuote();
    ChangeGreetingText();
    LoadData();
    RemindTasks();
    Reminder202020();
    ReminderMeals();
    UpdateTodolistHomepage();
    LoadData();

    setInterval(() => {
        ChangeGreetingText();
        UpdateTime();
        RemindTasks();
        Reminder202020();
        ReminderMeals();
        UpdateTodolistHomepage();
    }, 1000);
    
};
