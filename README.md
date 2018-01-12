# bamazon
	- Amazon-like storefront with MySQL

## Overview

	- This is a node.js cli app.  It works like an Amazon-like storefront on the command line.  The app takes in orders from customers and depletes stock from the store's inventory. 

	- The program also tracks product sales across your store's departments and then provides a summary of the highest-grossing departments in the store.


	- 


## Database Details
	- MySQL Database  is called `bamazon`.

	- Table inside of that database is called `products`.

	- The products table should has the following columns:

	   * item_id (unique id for each product)

	   * product_name (Name of product)

	   * department_name

	   * price (cost to customer)

	   * stock_quantity (how much of the product is available in stores) 


# `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Includes the ids, names, and prices of products for sale.

- The app should prompts users with two messages.

   * Then asks them the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

- Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

   * If not, the app logs a phrase  `Insufficient quantity!`, and then prevents the order from going through.

- However, if the store _does_ have enough of the product, then the customer's order is fufilled. 
   * This updates the SQL database to reflect the remaining quantity.
   * Once the update goes through, the customer is shown the total cost of their purchase.

	