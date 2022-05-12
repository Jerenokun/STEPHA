let allpages = ['homepage','todolist_page']
function todolist_page() {
    for (let i = 0; i < allpages.length;i++) {
        let page = document.getElementById(allpages[i]);
        page.style.display = "none";
    }
    let page = document.getElementById("todolist_page");
    page.style.display = "flex"
}
function home() {
    for (let i = 0; i < allpages.length;i++) {
        let page = document.getElementById(allpages[i]);
        page.style.display = "none"
    }
    let page = document.getElementById("homepage");
    page.style.display = "grid"
}
function changetheme() {
    
}
window.onload = function () {
    let currenttime = new Date()
    let timetag = document.getElementById('time')
    let hours = currenttime.getHours()
    if (hours > 11) {
        var meridiem = "pm"
        if (hours > 12) {
            hours -= 12
        }
    }
    timetag.textContent = `${hours}:${currenttime.getMinutes()} ${meridiem}`
    setInterval(() => {
        currenttime = new Date()
        hours = currenttime.getHours()
        timetag.textContent = `${hours}:${currenttime.getMinutes()} ${meridiem}`
        console.log("yes")
    }, 5000);

}