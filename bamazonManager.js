// required modules
const mysql = require('mysql');
const inquirer = require('inquirer');
const clear = require('clear');

clear();
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user

    console.log('The server has connected to the sql database');
    console.log('');


    start();
});



// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "postOrBid",
            type: "rawlist",
            message: "Would you like to [VIEW] all items or View [LOW] Qty items, or [ADD_INV] qty or [ADD] item?",
            choices: ["VIEW", "LOW", "ADD_INV", "ADD_ITEM"]
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            answer = answer.postOrBid.toUpperCase();
            switch (answer) {
                case "VIEW":
                    viewItems();
                    break;
                case "LOW":
                    viewLowQtys();
                    break;
                case "ADD_INV":
                    changeInvQty();
                    break;
                case "ADD_ITEM":
                    addItem();
            }
        });
}

// function to handle posting new items
console.log('');

function addItem() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([{
            name: "name",
            type: "input",
            message: "What is the item's product name?"
        }, {
            name: "department",
            type: "input",
            message: "What is the department name?"
        }, {
            name: "price",
            type: "input",
            message: "Place enter the sales price?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, {
            name: "qty",
            type: "input",
            message: "Place enter the number of items in inventory?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
        .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO  products SET ?", {
                    product_name: answer.name,
                    department_name: answer.department,
                    price: answer.price,
                    stock_qty: answer.qty
                },
                function(err) {
                    if (err) throw err;
                    console.log("Your item was added successfully!");
                    console.log('');
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            );
        });
}; // end of addItem function 


function viewItems() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, items) {

        //console.log(results);
        console.log("Items");
        console.log("--------------------------------")

        items.forEach(function(item) {
            console.log("id:" + item.id)
            console.log("Name:" + item.product_name);
            console.log("Price:" + item.price);
            console.log("Qty on hand:" + item.stock_qty);
            console.log("");


        })
    })
};



function viewLowQtys() {
    connection.query("SELECT * FROM products WHERE stock_qty < 5", function(err, items) {
        items.forEach(function(item) {
            console.log("id:" + item.id)
            console.log("Name:" + item.product_name);
            console.log("Price:" + item.price);
            console.log("Qty on hand:" + item.stock_qty);
            console.log("");
        })
    })
};

function changeInvQty(qty) {

    inquirer
        .prompt([{
            name: "id",
            type: "input",
            message: "What is the id of the item you would like to order?"
        }, {
            name: "qty",
            type: "input",
            message: "Place enter the new Stock qty?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
        .then(function(answer) {
      //      console.log(answer);

            var id = parseInt(answer.id);

            var qty = parseInt(answer.qty);
            var query = "UPDATE products SET stock_qty = ? WHERE id=?";
            query = connection.query(query, [qty, id], function(err, result) {
                viewItems();
            })


        })






};