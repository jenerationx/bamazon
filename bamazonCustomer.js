var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function (err) {
  if (err) throw err;
  //   console.log("connected");
  listItems();
});

function listItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    console.log("\nWelcome to Jenny's Haberdashery!\n")
    console.log("Item ID | Product Name | Department Name | Price | Quantity in Stock")
    console.log("------------------------------------------------------------------------")
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
      console.log("------------------------------------------------------------------------")
    }

    // function which prompts the user for what item they want
    inquirer
      .prompt([{
        name: "item",
        type: "input",
        message: "What is the item number of the product you want to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }]
      )
      .then(function (answer) {
        var item = answer.item;
        var quantity = answer.quantity;
        // if there is enough of the item, let them purchase it. if not, tell them no
        var query = "SELECT * FROM products WHERE ?";

        connection.query(query, { item_id: item }, function (err, res) {
          if (err) throw err;
          var itemData = res[0];

          // If the quantity requested by the user is in stock
          if (quantity <= itemData.stock_quantity) {
            console.log("\nYay! the product you requested is in stock.");

            // Construct the updating query string
            var updateTable = "UPDATE products SET stock_quantity = " + (itemData.stock_quantity - quantity) + " WHERE item_id = " + item;

            // Update the inventory
            connection.query(updateTable, function (err, res) {
              if (err) throw err;

              console.log("\nYour order is complete. Your total is $" + (itemData.price * quantity).toFixed(2));
              console.log("\nThank you for shopping at Jenny's Haberdashery!\n");
              console.log("------------------------------------------------------------------------")

              // End the database connection
              connection.end();
            });
          } else {
            console.log("Sorry, we don't have enough of that item in stock to complete your order.");
            console.log("Please try again.")
            connection.end();
          }
        });
      });
  })
}

