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
        url: "week06/index.html"
    }
]

ol_bl01 = document.querySelector("#ol_bl01")

// Reference: https://dev.to/duxtech/6-maneras-de-iterar-un-array-3fbm

function print_block(block) {
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

print_block(block01)