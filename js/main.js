const block01 = [
    {
        label: "Week 01",
        url: "week01/index.html"
    },
    {
        label: "Week 02",
        url: "week02/index.html"
    },
    {
        label: "Week 03",
        url: "week03/index.html"
    },
    {
        label: "Week 04",
        url: "week04/index.html"
    },
    {
        label: "Week 05",
        url: "week05/index.html"
    },
    {
        label: "To Do",
        url: "week06/todoapp.html"
    }
]

const block02 = [
    {
        label: "Week 07",
        url: "week07/index.html"
    },
    {
        label: "Week 08",
        url: "week08/index.html"
    },
    {
        label: "Week 09",
        url: "week09/index.html"
    },
    {
        label: "Week 10",
        url: "week10/index.html"
    },
    {
        label: "Shopping App",
        url: "week13/shoppingapp.html"
    }
]

function print_block(block, olId) {
    let ol_bl01 = document.querySelector(olId)
    for (item of block){
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("target", "_blank");
        a.setAttribute("href", item["url"]);
        a.textContent = item["label"]
        li.appendChild(a); 
        ol_bl01.appendChild(li);                
    }
}

print_block(block01, "#ol_bl01");

print_block(block02, "#ol_bl02");