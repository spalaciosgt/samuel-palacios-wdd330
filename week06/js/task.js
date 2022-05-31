/*
    Class Task Item
*/

// Import of LocalStorageHelper library
import LocalStorageHelper from "./ls.js";

export default class TaskItem {

    // Constructor
    constructor(parent, task) {        
        // References to task (JSON Item)
        this.task = task;   
        
        // It creates the item
        this.createListItem(parent);
    }   
    
    // Create a new task for the list
    createListItem(parent) {
        // Create Controls
        let liNewItem = document.createElement("li");
        let divNewItem = document.createElement("div");
        let inputNewItem = document.createElement("input");
        let spanNewItem = document.createElement("span");
        let buttonNewItem = document.createElement("button");

        // Setting attributes    
        liNewItem.setAttribute("id", "li" + this.task["id"]);
        inputNewItem.setAttribute("type", "checkbox");
        inputNewItem.setAttribute("id", "in" + this.task["id"]);
        buttonNewItem.setAttribute("id", "bt" + this.task["id"]);
        spanNewItem.setAttribute("id", "sp" + this.task["id"]);

        // Value of the check box
        if (this.task["completed"]) {
            inputNewItem.setAttribute("checked","");         
            spanNewItem.setAttribute("class", "itemDone");
        }       

        // Adding Events
        inputNewItem.addEventListener("change", e => {
            let t = e.target;
            let s = document.getElementById(t.id.replace("in", "sp"));
            let lsh = new LocalStorageHelper();
            let idJS = t.id.replace("in", "");            
            let task = lsh.gettingItem(idJS);
            
            if(t.checked){                
                s.setAttribute("class", "itemDone");
                task["completed"] = true;
            } else {
                s.setAttribute("class", "");
                task["completed"] = false;
            }
            lsh.removingItem(idJS);
            lsh.saveItemJS(idJS, task);

            document.getElementById("queryAll").setAttribute("class", "");
            document.getElementById("queryActive").setAttribute("class", "");
            document.getElementById("queryCompleted").setAttribute("class", "");  
        });

        // Deleting Button
        buttonNewItem.addEventListener("click", e => {
            let t = e.target;
            let l = document.getElementById(t.id.replace("bt", "li"));            
            let lsh = new LocalStorageHelper();            
            let idJS = t.id.replace("bt", ""); 
            lsh.removingItem(idJS);
            l.parentNode.removeChild(l);
            document.getElementById("queryAll").setAttribute("class", "");
            document.getElementById("queryActive").setAttribute("class", "");
            document.getElementById("queryCompleted").setAttribute("class", "");  
        });

        // Setting HTML Content
        spanNewItem.textContent = this.task["content"];
        buttonNewItem.textContent = "X";

        // Appending Controls
        divNewItem.appendChild(inputNewItem);
        divNewItem.appendChild(spanNewItem);
        divNewItem.appendChild(buttonNewItem);
        liNewItem.appendChild(divNewItem);            
        parent.appendChild(liNewItem);

        // References to li (List Item)
        this.li = liNewItem;
    }
}