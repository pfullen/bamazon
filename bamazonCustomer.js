// required modules
const mysql = require('mysql');
const inquirer = require('inquirer');
const clear = require('clear');
const FPG = require('fake-product-generator');

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
    console.log("");

    start(viewItems);
});


let start = function(cb) {
    console.log("Welcome to Bamazom!");
    console.log("");
    // call the view Items functions -- pass in purchaseItem callback to be called
    //  ---  after the items are displayed.
    cb(purchaseItem)

}


function purchaseItem() {
    inquirer
    inquirer
        .prompt([{
            name: "id",
            type: "input",
            message: "What is the id of the item you would like to order?"
        }, {
            name: "qty",
            type: "input",
            message: "Place enter the qty that you would like to purchase?",
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
            checkItemQty(id, qty);

         
        })
}





// query the database for all items 
let viewItems = function(cb) {
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
        cb();
    })

};



let checkItemQty = function(id, qty) {

    var query = "SELECT * FROM products WHERE id=?"


    connection.query(query, [id], function(err, result) {
      
        result.forEach(function(item) {
             if (qty > item.stock_qty) {
              console.log("There is not enough items in stock");
              console.log("Please order again and change your qty");                         
            }else {
              var newQty = (item.stock_qty - qty);
              var total = (qty * item.price);
              updateItemQty(id, newQty);
              
              console.log("Your purchase was successful");
              console.log("#############################");
              console.log("Qty:" + qty);
              console.log("Price/each:" + item.price);
              console.log("Your total cost is " + total);
              console.log("#############################");
              viewItems(purchaseItem)
            }              
        })

    })

};


var updateItemQty = function(id, qty) {
  id = parseInt(id);
  qty = parseInt(qty);
var query = "UPDATE products SET stock_qty = ? WHERE id=?";
query = connection.query(query, [qty, id], function(err, result) {

})

}