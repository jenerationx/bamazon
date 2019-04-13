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
            // based on their answer, call the related function
            if (answer.menu === "View Products for Sale") {
                listItems();
            }
            else if (answer.menu === "View Low Inventory") {
                lowInventory();
            }

            else if (answer.menu === "Add to Inventory") {
                addInventory();
            }
            else if (answer.menu === "Add New Product") {
                addItem();
            }
        });
}

// View Products for Sale
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
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
    connection.end();
}

// View Low Inventory
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
function lowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("\nItem ID | Product Name | Department Name | Price | Quantity in Stock")
        console.log("------------------------------------------------------------------------")
        for (var i = 0; i < res.length; i++) {
            if (parseInt(res[i].stock_quantity) < 5) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
                console.log("------------------------------------------------------------------------")
            }
        }
    })
    connection.end();

}

// Add to Inventory
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "name",
                    type: "list",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which item would you like to update?"
                },          
                {
                    name: "quantity",
                    type: "input",
                    message: "How many are currently in stock?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (ans) {
                // update db
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: ans.quantity
                        },
                        {
                            product_name: ans.name
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("Inventory updated!");
                    }
                );
                connection.end();
            });
    });
}
// Add New Product
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
function addItem() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the item ID?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "name",
                type: "input",
                message: "What is the name of the product?"
            },
            {
                name: "department",
                type: "input",
                message: "What department is the item in?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of the item?"
            },
            {
                name: "quantity",
                type: "input",
                message: "What is the quantity in stock?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (ans) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?",
                {
                    item_id: ans.id,
                    product_name: ans.name,
                    department_name: ans.department,
                    price: ans.price,
                    stock_quantity: ans.quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new item was added!");
                }
            );
            connection.end();
        })
}