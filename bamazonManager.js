// Create a new Node application called bamazonManager.js. Running this application will:
// List a set of menu options:

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username -use root
    user: "root",

    // Your password
    password: "Rootpassword1",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.menu === "View Products for Sale") {
                listItems();
            }
            else if (answer.menu === "Add to Inventory") {
                console.log("add inventory")
            }
            else if (answer.menu === "Add New Product") {
                console.log("add product")
            }
            connection.end();
        });
}
// View Products for Sale
function listItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("\nWelcome to Jenny's Haberdashery Inventory Management System!\n")
        console.log("Item ID | Product Name | Department Name | Price | Quantity in Stock")
        console.log("------------------------------------------------------------------------")
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
            console.log("------------------------------------------------------------------------")
        }
    })
}
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.