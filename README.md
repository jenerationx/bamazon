# Bamazon

### Overview

In this activity, you'll be creating an Amazon-like storefront with the MySQL skills you learned this unit. The app will take in orders from customers and deplete stock from the store's inventory.  The manager can view and add to the inventory as well.

My store stocks items you would find in a typical Haberdashery (aka Fabric Store).  

### What Bamazon Does

1. Using the `bamazonCustomer` command, the customer can view a list of the items available to purchase, their price, and quantity in stock.  

2. Using the `bamazonManager` command, the store Manager can view a list of items in the store, view low inventory, add to the inventory, and add new items.

## Bamazon Customer

In terminal (or bash), type `node bamazonCustomer` and the list of items for sale will be presented to the customer.  They are then presented with a question of which item they would like to purchase, and finally, with a question of how many of that item they would like.  If the item's current stock is equal to or less than the customer's order, the order is placed.  If not, they are told the order cannot be completed and to try again.

## Live Demo (click image for video demonstration):

[![Video of bamazonCustomer](http://img.youtube.com/v=eOyt78I-sa0/0.jpg)](https://www.youtube.com/watch?v=eOyt78I-sa0 "Bamazon Customer")

## Bamazon Manager

In terminal (or bash), type `node bamazonManager` and a list of choices will be presented to the Store Manager.  The choices are:
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product

If the manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

## Live Demo (click image for video demonstration):

[![Video of concert-this](http://img.youtube.com/vi/5r5IN0v8IiA/0.jpg)](https://www.youtube.com/watch?v=5r5IN0v8IiA "Concert this")

