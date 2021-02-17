# etude_de_cas
 Etude de cas projet bifrost
 
 
 - PART B: Front-end

    # Part B: Front-end

    Please don't spend more than 1 hour

    ## Objective:

    Feel free to use a cloud solution like [https://codesandbox.io/](https://codesandbox.io/) or [https://stackblitz.com/](https://stackblitz.com/) to code your front-end. It could save you some time and help us to quickly test your app while still having easy access to the code. 

    **Create a quick front-end with:**

    - A login view shared for both users type A & B
    - Two main views, one for the user of type A, and a different one for a different user of type B

    ## user A view (farmer):

    **Two states:**

    - If the user's variable "current offer" is empty, the view has 3 fields:
        - **FruitName** of the fruit the farmer is offering
        - **Quantity** of fruits to be offered
        - **Price** per fruit
        - A button "Send offer" that sends this info
    - Once an offer is "sent", the fields become not editable. The buttons "remove offer" "edit offer" appear with their obvious expected behavior. Adding functionality (front & back) to those buttons is an extra.

    ## user B view (client) dashboard:

    **Two states:** 

    - By default, there is just a message "there is no fruit in the market, please come back later" + the value of the client's wallet
    - If there is at least one offer from a User, a list of the offer appears showing the data of the offers. An extra variable "TotalPrice" must appear also for each offer. This one is calculated by the python script and will be explained in the backend part.
        - If the price of the offer < the amount of total XRP in their account, a "buy" button will appear (or become functional).
        - Once a client clicks in the buy button, the wallet is automatically updated
        - A client can buy multiple offers (as long as it has enough money)
        - If two or more clients are connected at once, they should not be able to buy the same offer.

        Feel free to change this behavior if you think like doing it. 
        For instance, you could have a confirm button at the bottom of the offer's list and don't reduce the wallet until the confirmation is triggered. Please argument your choices and prioritize having a full working app. 

- PART C: Back-end

    # Part C: The backend

    Please don't spend more than 2-3h 

    ## Objectives:

    - Create a secured auth system
    - Securely manipulate the DB from the server or the serverless functions
    - Send and receive information to the python script

    ## Auth system:

    - A password + login + JWT token system is advised
    - You can use any lib or service of your choice. Please briefly explain the advantages of your choice.
    - Security is important for us, feel free to do a really minimalistic version, but please explain which steps would you take to secure it correctly.

    ## Database:

    - The database must manage at least both the users and the offers
    - You can use any database or cloud database of your choice in order to save you some time (even a connected google sheet would be ok!) , but please argument any "sacrifice" you do and explain which kind of database you would be using if you had to build a real app.
    - This is an example of offer (you will need to add some fields. Feel free also to conceive a more scalable version if you're tempted 😏!)

    ```json
    "Offer": {
    		"offerID": 906
        "farmerID": 27, // the farmer who posted the offer
        "fruitName": "Banana", 
        "fruitQuantity": 3, 
        "fruitUnitPriceEUR": 2.60, // This price is in Euros!
        "Period": "Week1",
    ...

      }
    ```

    The database should be manipulated from the server and not directly from the front-end

    ## The python script

    - The main objective is to be able to send and get information to/from a python script passing through the server / cloud functions.
    - Don't worry about your python skills, you don't need to build a complex script, please focus on the connections
    - This python script will do 2 simple operations with the offer object
        - It transforms the price in Euros per unit to XRP per unit  ("fruitUnitPriceXRP")
        - It gets the offer's total price in XRP

    This **totalPrice** in XRP will be the one that the clients (type B users) will see in the list
