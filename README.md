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

Analys

Hur har jag gjort?

Jag valde att lösa slutprojektet "Bun Drop" med React. Det är ett ramverk jag ville lära mig mer om och ett mycket dynamiskt och responsivt sätt att bygga appar på.

Till att börja med skapade jag ett utkast av mitt UI i Figma och har sedan stämt av min html/css mot denna för att efterlikna den så mycket som möjligt. Jag valde att göra en mörk och stilren design med gula detaljer för att användaren ska få ett proffsigt och seriöst intryck.

I själva appen har jag använt mig av "Router", som är ett navigeringsverktyg för att användaren ska kunna ta sig till olika adresser av appen. I samband med detta har jag också använt mig av importen "Link" som gör det smidigt för programmeraren (mig) att skicka en användare till olika adresser vid exempelvis knapp-, bild- och text-tryck. Detta installerades via "react-router-dom"-paketet. Jag valde också att göra en Header och en Footer-komponent i "app.jsx" eftersom jag vill att det UI't ska synas i alla komponenter.

Jag har framförallt använt mig av "hooksen" useState och useEffect i mina komponenter. useState för att mina variabler ska initieras med specifika värden och kunna uppdateras vid senare tillfällen och på så sätt rendera om appen. useEffect används för att köra metoder vid uppstart och genom att skicka variabler med dependency injection, körs metoderna vid förändringar av just dessa variabler.

I projektet har jag haft stor nytta av localStorage. Jag har dels använt mig av det för att berätta om en användare är inloggad eller ej och dels för att kontrollera vilka produkter användaren har lagt i sin varukorg. Jag har skapat items genom att skicka in en key och ett eller flera values. I några fall har jag skickat in hela objekt för att enkelt kunna använda mig av dem som properties i andra komponenter. Eftersom localStorage hela tiden finns i det "lokala molnet" har det varit ett smidigt och tacksamt verktyg.

Jag har använt mig av ternary operators i nästan alla komponenter för att reglera vad som visas för användaren. Då har jag skickat in en bool, som validerats till true/false och visar dynamiskt två olika UI beroende på värdet.

Vid två tillfällen i projektet skrev jag Vanilla JavaScript. Den ena gången vid en animation för klick på "Add to cart" och den andra för att toggla menyval för min "hamburger-meny-ikon" på små skärmar. Det var för mig den enklaste lösningen när det kom till att hämta ett specifikt element i DOM'en och sedan lägga till/ta bort klassnamn för denna.

Vad har jag lärt mig och vad tar jag med mig till nästa projekt?

Jag sa tidigt till mig själv att inte lägga för mycket tid på css till en början, utan sätta igång med den logiska programmeringen. Det ångrar jag nu i efterhand. Jag har insett att jag borde ha lagt mer tid på att skapa grundlig html och css i början av projektet. När jag väl kom till delen med att göra min app responsiv insåg jag fort hur svårt det var att få element att göra som jag ville. Jag tror att jag hade haft stor hjälp av att skapa mina element på ett mer systematiskt sätt från början. Vare sig det gäller att använda fler "div's" med flex-box, grids eller att använda fler containers. Ett annat alternativ hade varit att skriva media-querys under tiden som jag skapade mina pages.

Vidare tror jag att jag hade haft nytta av "hooken" useContext gällande min inloggnings-cookie. Den används för att skapa en slags "moln-klass" som man kan skicka runt till children i appen. Detta hade minskat min kod avsevärt. Jag läste på om den, men vid det tillfället hade jag redan valt tillvägagångssättet med att hämta mitt localStorage-item i de komponenter som behövde det.

Jag har insett att många av mina komponenter blev stora snabbt och att det i många fall har gjort mig förvirrad och på så sätt saktat ner processen. I kommande projekt kommer jag att lägga mer tid på att dela upp mina funktioner i flera mindre och skapa fler komponenter. Det är trots allt det React till stor del går ut på.

Ett av mina största hinder i projektet har varit att greppa useEffect samt useState fullständigt och hur det hängt ihop med mina fetch-calls. Jag stötte på ett problem vid inloggningsdelen, där jag inte kunde logga in precis efter att ha signat upp. Detta berodde på att min app inte hann reagera på att min databas uppdaterades. Ett annat problem var att få min app att reagera på ändringar på min cart page. Jag ändrade på properties för en enskild produkt, men parent-komponenten skötte hämtningen av localStorage och därför blev jag tvungen att berätta för min parent att en uppdatering hade skett vid varje tryck.

Slutligen kommer jag att försöka minska antalet fetch-calls framöver, dels för att göra appen snabbare och dels för att minska antalet rader kod. I några fall gör jag fetch calls från mina children istället för att göra det i en parent och skicka med de objekt/properties som behövs.

För att summera projektet har jag lärt mig väldigt mycket och ökat min förståelse för React, men också insett hur mycket mer det finns att lära. Jag kommer ta med mig att arbeta mer med att bryta ner funktioner till flera stycken mindre och skapa fler komponenter för att göra koden lättläslig samt skapa en bra grund för min css redan från start så att den blir enklare att göra responsiv.
