/*
    Class Local Storage Helper
*/

export default class LocalStorageHelper {

    // Constructor
    constructor(storage = window.localStorage) {
        // References to local storage
        this.storage = storage;
    }

    // Getting App Mode
    getAppMode() {
        let mode = this.gettingItem("AppMode");
        if (mode == null) {
            mode = { "mode" : "start_purchase"}
            this.saveItem("AppMode", mode);
        }
        console.log(mode);
        return mode;
    } 

    // Getting App Preferences
    getAppPreferences() {
        let preferences = this.gettingItem("AppPreferences");
        console.log(preferences);
        return preferences;
    } 

    // Setting App Mode
    setAppMode(mode) {
        this.saveItem("AppMode", mode);
        return mode;
    }
    
    // Getting Purchase List
    getMainList() {
        let mainList = this.gettingItem("MainList");
        console.log(mainList);
        return mainList;
    } 

    // Setting Purchase List
    setMainList(mainList) {
        this.saveItem("MainList", mainList);
    }

    // Setting App Preferences
    setAppPreferences(preferences) {
        this.saveItem("AppPreferences", preferences);
    } 

    // Getting One Item
    gettingItem(key) {
        return JSON.parse(localStorage.getItem(key));  
    }

    // Removing One Item
    removingItem(key) {
        this.storage.removeItem(key);
    }

    // Save Item
    saveItem(key, item) {
        this.storage.setItem(key, JSON.stringify(item)); 
    }

    // Free Storage
    freeStorage() {
        this.storage.clear();
        location.reload();
    }
}