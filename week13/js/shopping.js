/*
    Shopping Record App Class
*/

// Import of LocalStorageHelper library
import LocalStorageHelper from "./ls.js";

class ShoppingApp {    

    //
    // Constructor
    //
    constructor() {        
        // LocalStorageHelper object
        this.lsh = new LocalStorageHelper();   

        // Get App Mode
        this.mode = this.lsh.getAppMode();

        // Starting App
        this.startApp();
    }

    //
    // Start App
    //
    startApp() {
        this.divStart = document.getElementById("start");
        this.divStart.classList.add("hidden");
        this.divItem = document.getElementById("item");
        this.divItem.classList.add("hidden");
        this.divListProducts = document.getElementById("listProducts");
        this.divListProducts.classList.add("hidden");

        this.mainList = [];

        // Start Purchase
        if (this.mode["mode"] == "start_purchase") {

            // Showing this div
            this.divStart.classList.remove("hidden");

            // Your name input
            this.yourName = document.getElementById("yourName");
            this.yourName.focus();

            // Fetching data
            fetch("https://spalaciosgt.github.io/week13/json/parameters.json")
                .then((response) => response.json())
                .then((catalogsData) => {
                    console.log(catalogsData);
                    this.catalogsDataApp = catalogsData;
                    this.typePurchase = document.getElementById("typePurchase");
                    // Type of purcharse select
                    for(let i = 0; i < catalogsData["typePurchase"].length; i++) {
                        this.typePurchase                        
                        let opt = document.createElement("option");
                        opt.value = catalogsData["typePurchase"][i]["id"];
                        opt.innerHTML = catalogsData["typePurchase"][i]["name"];
                        this.typePurchase.appendChild(opt);
                    }
                }
            );  

            // Button Start Purchase
            document.getElementById("buttonStart").
                addEventListener("click", 
                this.startPurcharse.bind(this));  

        // Managing Purchase    
        } else {
            document.getElementById("buttonReset").
            addEventListener("click", 
            this.restartPurchase.bind(this));  

            this.preferences = this.lsh.getAppPreferences();
            // Showing these div
            this.divItem.classList.remove("hidden");
            this.divListProducts.classList.remove("hidden");

            // Preparing Data
            this.numberItems = 0;
            this.maximumBudget = 0.01;
            this.availableBudget = 0.01;

            // Preparing Items
            this.h2Name = document.getElementById("h2Name");
            this.h2Name.textContent =  this.preferences["name"] + "'s Summary Shopping";

            this.summaryItems = document.getElementById("summaryItems");
            this.summaryItems.textContent = this.numberItems.toString();

            this.avaBudget = document.getElementById("avaBudget");
            this.avaBudget.textContent = this.availableBudget.toString();

            // Categories, this is conditional
            this.categoryNewItemL = document.getElementById("categoryNewItemL");
            this.categoryNewItem = document.getElementById("categoryNewItem");
            this.categoryNewItem.classList.add("hidden");
            this.categoryNewItemL.classList.add("hidden");

            if (this.preferences["useCategories"] == "y") {
                this.categoryNewItem.classList.remove("hidden");
                this.categoryNewItemL.classList.remove("hidden");
                for(let j = 0; j < this.preferences["categories"].length; j++) {                        
                    let opt = document.createElement("option");
                    opt.value = this.preferences["categories"][j];
                    opt.innerHTML = this.preferences["categories"][j];
                    this.categoryNewItem.appendChild(opt);
                }
            }

            this.maxBudgetL = document.getElementById("maxBudgetL");
            this.maxBudget = document.getElementById("maxBudget");
            this.maxBudget.classList.add("hidden");
            this.maxBudgetL.classList.add("hidden");
            
            // Maximum Budgnet is conditional
            if (this.preferences["validTotalMax"] == "y") {
                this.maxBudget.classList.remove("hidden");
                this.maxBudgetL.classList.remove("hidden");
            }

            // Total New Item Change
            document.getElementById("priceNewItem").
                addEventListener("input", 
                this.updateTotalNewItem.bind(this));  
            
            document.getElementById("amountNewItem").
                addEventListener("input", 
                this.updateTotalNewItem.bind(this)); 

            document.getElementById("maxBudget").
                addEventListener("input", 
                this.updateMaximumBudget.bind(this));     

            this.updateTotalNewItem();

            // Action Buttons
            document.getElementById("buttonRegister").
                addEventListener("click", 
                this.addNewItem.bind(this));    

            document.getElementById("buttonPrint").
                addEventListener("click", 
                this.print.bind(this));

            // List Purchases
            let list = this.lsh.getMainList();
            if (list != null) {
                this.mainList = list;   
            }       
            this.calculateTotals();      
            this.updateProductList();
        }
    } 

    //
    // Start Purchase
    //
    startPurcharse() {

        // If name is empty
        if (this.yourName.value.trim().length < 2) {
            alert("Please input your name!");
            yourName.focus();            
        } else {
            // Store the preferences previous pass to register product mode
            this.mode["mode"] = "continue_purchase";
            let categories = document.getElementsByName("UseCategories");
            let useCategories = "y";
            if (categories[1].checked) {
                useCategories = "n";
            }
            let validMax = document.getElementsByName("ValidateTotalMax");
            let validMaxs = "y";
            if (validMax[1].checked) {
                validMaxs  = "n";
            }
            let tp = this.typePurchase.value;
            this.catalogsDataApp = this.catalogsDataApp["typePurchase"].filter(function(el)
            {
              return el.id == tp;
            });  
            this.preferences = {"name" : this.yourName.value,
                               "typeOfPurchaseId" : tp,
                               "typeOfPurchaseName" : this.typePurchase.options[this.typePurchase.selectedIndex].text,
                               "useCategories" : useCategories,
                               "validTotalMax" : validMaxs,
                               "categories" : this.catalogsDataApp[0]["values"]
                            }        
            this.lsh.setAppMode(this.mode);
            this.lsh.setAppPreferences(this.preferences);
            this.startApp();
        }
    }

    //
    // Update Total New Item
    // 
    updateTotalNewItem() {       
        let priceNewItem = document.getElementById("priceNewItem")
        let amountNewItem = document.getElementById("amountNewItem");
        let totalNewItem = document.getElementById("totalNewItem");
        let a = parseFloat(priceNewItem.value);
        let b = parseInt(amountNewItem.value);
        let total = a * b;        
        totalNewItem.textContent = "Total is USD $. " + this.getCurrencyFormat(total);
    }

    //
    // Currency Format
    //
    getCurrencyFormat(price) {
        let dollarUSLocale = Intl.NumberFormat('en-US');
        return dollarUSLocale.format(price);
    }

    //
    // Add New Item
    //
    addNewItem() {
        let validar = false;

        let product = document.getElementById("productNewItem");
        let priceNewItem = document.getElementById("priceNewItem")
        let amountNewItem = document.getElementById("amountNewItem");

        if (product.value.length > 1 &&
            parseFloat(priceNewItem.value) >= 0.01 &&
            parseFloat(amountNewItem.value) >= 1
            ) {
            validar = true;
        }

        if (validar) {
            // Record Product
            let id = 1;
            if (this.mainList != null) {
                this.mainList.length + 1;
            }
            let category = document.getElementById("categoryNewItem");
            let product = document.getElementById("productNewItem");
            let priceNewItem = document.getElementById("priceNewItem")
            let amountNewItem = document.getElementById("amountNewItem");
            let newItem = { "id" : id, 
                            "category" : category.value,
                            "name" : product.value,
                            "price" : priceNewItem.value,
                            "amount" : amountNewItem.value
                          };

            console.log(newItem);
            this.mainList.push(newItem);

            // Calculate Totals
            this.calculateTotals();              
            this.lsh.setMainList(this.mainList); 
            this.updateProductList();

            // Clean Controls
            product.value = "";
            priceNewItem.value = 0.01;
            amountNewItem.value = 1;
        }
    }

    //
    // Calculate Totals
    //
    calculateTotals() {       
        this.numberItems = this.mainList.length;
        this.summaryItems.textContent = this.numberItems.toString();
        let total = 0;
        for(let i = 0; i < this.mainList.length; i++) {
            let product = this.mainList[i];
            total += parseFloat(product["price"]) * parseInt(product["amount"]);
        }
        let numberItems = this.mainList.length;
        this.summaryItems.textContent = numberItems.toString();

        let purTotal = document.getElementById("purTotal");
        purTotal.textContent = this.getCurrencyFormat(total);
        let avaBudget = document.getElementById("avaBudget");
        let purHealth = document.getElementById("purHealth");

        if (this.preferences["validTotalMax"] == "y") {
            this.availableBudget = this.maximumBudget  - total;
            avaBudget.textContent = this.getCurrencyFormat(this.availableBudget);
            purHealth.textContent = "Overdrawn";
            avaBudget.classList.add("negative");
            purHealth.classList.add("negative");
            if (this.availableBudget >= 0) {
                avaBudget.classList.remove("negative");
                purHealth.classList.remove("negative");
                purHealth.textContent = "Good";
            }
        } else {
            avaBudget.textContent = "No limit";
            purHealth.textContent = "Good";
        }
       
    }

    //
    // Update Maximum Budget
    //
    updateMaximumBudget() {
        this.maximumBudget = parseFloat(this.maxBudget.value);
        this.calculateTotals();
    }

    //
    // Restart Purcharse
    //
    restartPurchase() {
        this.lsh.freeStorage();
        this.startApp();
    }

    //
    // Update Product List
    //
    updateProductList() {
        let mainTable = document.getElementById("mainTable")
        while (mainTable.firstChild) {
            mainTable.removeChild(mainTable.firstChild);
        }

        const tr1 = document.createElement("tr");
        const th1 = document.createElement("th");
        const th2 = document.createElement("th");
        const th3 = document.createElement("th");
        const th4 = document.createElement("th");
        const th5 = document.createElement("th");
        const th6 = document.createElement("th");

        th1.textContent = "Item/Product";
        th2.textContent = "Category";
        th3.textContent = "Unit Price (USD $.)";
        th4.textContent = "Amount";
        th5.textContent = "Total Price (USD $.)";
        th6.textContent = "Actions";

        tr1.appendChild(th1);

        if (this.preferences["useCategories"] == "y") {
            tr1.appendChild(th2);
        }
       
        tr1.appendChild(th3);
        tr1.appendChild(th4);
        tr1.appendChild(th5);
        tr1.appendChild(th6);

        mainTable.appendChild(tr1);

        for(let i = 0; i < this.mainList.length; i++) {
            let product = this.mainList[i];
            let price = parseFloat(product["price"]);
            let amount = parseInt(product["amount"]);
            let total =  price * amount;

            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td");
            const td6 = document.createElement("td");

            const bt6 = document.createElement("button");

            td1.textContent = product["name"];
            td2.textContent = product["category"];
            td3.textContent = this.getCurrencyFormat(price);
            td4.textContent = amount;
            td5.textContent = this.getCurrencyFormat(total);

            tr.appendChild(td1);
           
            if (this.preferences["useCategories"] == "y") {
                tr.appendChild(td2);
            }
           
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            td6.appendChild(bt6);
            bt6.classList.add("delete");
            bt6.textContent = "X";
            bt6.id = "Button" + i.toString();
            bt6.addEventListener("click", 
                this.deleteItem.bind(this));

            mainTable.appendChild(tr);
        }
    }

    //
    // Print Content
    //
    print() {
        window.print();   
    }

    //
    // Delete Item
    //
    deleteItem() {
        let idButton = event.target.id;
        let idNumber = parseInt (idButton.replace("Button", ""));
        this.mainList.splice(idNumber, 1)
        this.lsh.setMainList(this.mainList);
        this.calculateTotals();
        this.updateProductList();
    }
}

// One instance of the Shopping Record App Class
let shoppingApp = new ShoppingApp();