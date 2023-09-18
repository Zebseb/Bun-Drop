Bun Drop

///
A React (and JavaScript) application used by anyone to browse between burgers, fries, shakes etc. and order them to an address of choice. The main concept is that the orders are delivered by a drone.

There is a possibility to sign up and log in to the app. To do this you need to click on the profile-icon. By doing this the user will also have access to its order history on the profile page and adding products as favourites on the menu page while logged in.

You can go to the menu by clicking the button on home page or by the header links. Here you can browse between products and adding them to your cart. By clicking the cart-icon you can always check what you currently have in your shopping cart.

When checking out, the user will be able to choose between debit card and Swish as payment options and choose an adress for the food to be delivered to.

///
Clone this repository and make sure you got node and npm installed globally.

To run the json-server:
"npm run json-server"

To run the app:
"npm run dev"

///
Enjoy!

<hr/>
Slutligen kommer jag att försöka minska antalet fetch-calls framöver, dels för att göra appen snabbare och dels för att minska antalet rader kod. I några fall gör jag fetch calls från mina children istället för att göra det i en parent och skicka med de objekt/properties som behövs.

För att summera projektet har jag lärt mig väldigt mycket och ökat min förståelse för React, men också insett hur mycket mer det finns att lära. Jag kommer ta med mig att arbeta mer med att bryta ner funktioner till flera stycken mindre och skapa fler komponenter för att göra koden lättläslig samt skapa en bra grund för min css redan från start så att den blir enklare att göra responsiv.
