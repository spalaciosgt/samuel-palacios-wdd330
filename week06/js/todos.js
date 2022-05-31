/*
    Class Todo App
*/

// Import of LocalStorageHelper library
import LocalStorageHelper from "./ls.js";

// Import of Task List Item library
import TaskItem from "./task.js";

class TodoApp {    

    //
    // Constructor
    //
    constructor() {        
        // LocalStorageHelper object
        this.lsh = new LocalStorageHelper();

        // Main Task List
        this.mainList = [];

        // Button Add Task
        document.getElementById("addNewItem").
            addEventListener("click", 
            this.addTask.bind(this));

        // Button Query All
        document.getElementById("queryAll").
            addEventListener("click", 
            this.gettingAll.bind(this));    

        // Button Query Active
        document.getElementById("queryActive").
            addEventListener("click", 
            this.gettingActive.bind(this));    

        // Button Query Complete
        document.getElementById("queryCompleted").
            addEventListener("click", 
            this.gettingCompleted.bind(this));  

        // Button Clear All
        document.getElementById("clearAll").
            addEventListener("click", 
            this.clearAll.bind(this));    

        // By default, getting all withouth filters    
        this.gettingAll();    
    }
    
    //
    // Adding a new task
    //
    addTask() {
        let txtNew = document.getElementById("newItem");

        // If the length is greater than 1
        let taskText = txtNew.value;
        if (taskText.length > 1) {

            // Saving on Local Storage
            let savedTask = this.lsh.saveItem(taskText);       
            
            // Recording in Memory
            let ulItems = document.querySelector("#listItems");
            let tli = new TaskItem(ulItems, savedTask);
            this.mainList.push(tli);

            // Cleaning the input
            txtNew.value = "";   
            this.startingControls(ulItems);  
            this.gettingAll();       
            document.getElementById("queryAll").setAttribute("class", "activeButton");                     
        }
    }

    //
    // Getting All the Tasks
    //
    gettingAll() {
        let ulItems = document.querySelector("#listItems");        
        this.startingControls(ulItems);        
        this.mainList = this.lsh.gettingItems("all", ulItems);      
        document.getElementById("queryAll").setAttribute("class", "activeButton");  
    }

    //
    // Getting Active Tasks
    //
    gettingActive() {
        let ulItems = document.querySelector("#listItems");
        this.startingControls(ulItems);
        this.mainList = this.lsh.gettingItems("active", ulItems);        
        document.getElementById("queryActive").setAttribute("class", "activeButton");
    }

    //
    // Getting Complete Tasks
    //
    gettingCompleted() {
        let ulItems = document.querySelector("#listItems");        
        this.startingControls(ulItems);
        this.mainList = this.lsh.gettingItems("completed", ulItems);        
        document.getElementById("queryCompleted").setAttribute("class", "activeButton");
    }

    startingControls(parent) {
        parent.innerHTML = "";
        document.getElementById("queryAll").setAttribute("class", "");
        document.getElementById("queryActive").setAttribute("class", "");
        document.getElementById("queryCompleted").setAttribute("class", "");        
    }

    //
    // Clear Items
    //
    clearAll() {
        this.lsh.freeStorage();
        this.mainList = [];    
    }    
}

// One instance of the To Do App class
let todoApp = new TodoApp();