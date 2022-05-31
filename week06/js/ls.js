/*
    Class Local Storage Helper
*/

// Import of Task List Item library
import TaskItem from "./task.js";
export default class LocalStorageHelper {

    // Constructor
    constructor(storage = window.localStorage) {
        // References to local storage
        this.storage = storage;
    }

    // Getting All Items, optiona a filter given
    gettingItems(filter, parent) {
        let list = [];

        // Getting Items
        Object.keys(localStorage).forEach(function(key){
            let task = JSON.parse(localStorage.getItem(key));                                     

            // Applying the filter
            if (filter == "all") { 
                let tli = new TaskItem(parent, task);
                list.push(tli);
            } else if (filter == "completed" && task["completed"] === true) { 
                let tli = new TaskItem(parent, task);
                list.push(tli);
            } else if (filter == "active" && task["completed"] === false) {
                let tli = new TaskItem(parent, task);
                list.push(tli);
            }          
        });

        // Return the final list
        return list;
    } 

    // Getting One Item
    gettingItem(key) {
        return JSON.parse(localStorage.getItem(key));  
    }

    // Removing One Item
    removingItem(key) {
        this.storage.removeItem(key);
    }

    // Save New Item
    saveItem(taskText) {
        let currentDate = "json" + new Date().getTime();
        let task = { "id" : currentDate, "content" : taskText, "completed": false }
        this.storage.setItem(currentDate, JSON.stringify(task)); 
        return task;
    }

    // Save Item
    saveItemJS(key, task) {
        this.storage.setItem(key, JSON.stringify(task)); 
    }

    // Free Storage
    freeStorage() {
        this.storage.clear();
        location.reload();
    }
}