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