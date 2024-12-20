# SOEN287project

## Members:
Chris Anglin 40216346  
Lyne Seddaoui 40252125  
MD Azmain Jashim 40228746  
Navpreet Nandra 40213630

##DELIVERABLE 1
### Features Implemented:
-We were able to implement only a few features as we are pretty new to web development. 
Here is a list of features we implemented on the client side, and by who it was done:


Here is a list of features we implemented on the business side, and by who it was done:
- Created adminProfile, which displays the information relating to the business, their business name, number, email, and address. It also allows for the admin to modify the data within. Done by Navpreet, inspired by code done by Lyne and Azmain..
- Created adminServices.html, which contains all the services that the business offers. The business can then add, modify or edit the services offered. Consulted sources which shall be listed soon. Worked on by Navpreet and Lyne.
- Created adminSignIn.html which is a page allowing the business to decide what to do once logged in. They can choose to edit their profile information, delete their account, check out the services they offer, etc. Done by Navpreet, inspired by code done by Lyne and Azmain.
- created adminSignUP.html, which allows a business to signup for an admin account. Done by Navpreet, inspired by code done by Lyne and Azmain.
- created adminportal.html which is the login page for the admin. Worked on by Chris and Navpreet.

Client Side
- created userSignUp which lets the user create an account. Done by Lyne.
- created userLogIn which is able to recognize if an email and password is associated with an account. Done by Lyne.
- created userProfile where a user has their information displayed. They can edit their information, log out and delete their account for now. Done by Lyne.
- created index which is the homepage of the website. It has the a button that either connects to the login or to the profile if the user is already logged in. There is a search bar and a place to request a service. Page done by Azmain. LogIn button done by Lyne.

Here are the sources used for deliverabe #1:
To handle a form submission:

Jason Lengstorf, "Get Form Values as JSON," Learn With Jason, accessed October 31, 2024, https://www.learnwithjason.dev/blog/get-form-values-as-json.

To get info from a form to a variable:

"HTML DOM Input Email value Property," W3Schools, accessed October 31, 2024, https://www.w3schools.com/jsref/prop_email_value.asp.

To do the display of services:

"Display Dynamic Content HTML," Code Boxx, accessed October 31, 2024, https://code-boxx.com/display-dynamic-content-html/.

Kevin Chisholm, "Dynamic HTML with JavaScript," Kevin Chisholm Blog, accessed October 31, 2024, https://blog.kevinchisholm.com/javascript/dynamic-html-with-javascript/.

## Features To Be Implemented For Next Deliverable:
Business Side
- Will need to create an array to store the business data given by admin in adminProfile, so that this data can then be used to display it on the website.
- will need to optimize the code a bit, make sure no repetitiveness.
- will need to make the styling cohesive throughout the website.
- Implement a feature that will follow up with clients who have not paid their bill yet.
- implement a feature that will display past orders at any selected time of all or any customer(s).
- implement a feature that will confirm a service requested by the customer.

Client Side
- update the search bar
- update the request service form so that the data is saved
- implement the page where client can see their services
- implement the page where client can see their bill
  

## Install Guide:
Our website should be deployed by first opening the index.html which is the home page of our website. From there, a client and admin can access their login/ sign up pages

## User Guide:
For an admin:
Click on the login button and create an account using the Admin sign up form. Then, the admin would have access to the Admin Options page to manage their business.
Admin should first start by clicking the Business Information button to add their business details, such as the name, the email address, the phone number and their address.
Then, by clicking Go Back, admin are back to the Admin Options page. 
They should then click on the Edit Services button to add services.
When this is all set up, admin can then log out and be brought to the home page again.

For a client:
Click on the login and create an account using the Sign Up page. Then, the client will be brought back to the home page, but they now have access to their profile.
On the home page, a client can search for a specific service and is able to request a service. (to be updated)
By clicking the My Profile button at the top, the client is able to access and edit their information. 
Clients are able to see in the Services and Payments page the service that they have requested. (to be implemented)
Client can then log out and be brought back to the home page again. 






##DELIVERABLE 2
Here are the sources used for deliverable #2:

Previous notes from COMP353 (Databases) course were referenced for structuring and creating the sqlite database

"How to Build a Fast and Lightweight API with Node.js and SQLite", S. Pandey, 2023, https://dextrop.medium.com/how-to-build-a-fast-and-lightweight-api-with-node-js-and-sqlite-676cbbec1b6a
Verify login info:

"Validation of Password and Username in Node.js and MySQL," Stack Overflow, https://stackoverflow.com/questions/53594691/validation-of-password-and-username-nodejs-mysql.

"Basic Login System with Node.js, Express, and MySQL," CodeShack, https://codeshack.io/basic-login-system-nodejs-express-mysql/#creatingthelogintemplate.

Session:

"Understanding Session-Based Authentication in Node.js," Medium, https://medium.com/@anandam00/understanding-session-based-authentication-in-nodejs-bc2a7b9e5a0b.

Display services in form:

"Displaying Database Content on a Web Page Using HTML, CSS, and JavaScript," Codementor, https://www.codementor.io/@anthonyelam/displaying-database-content-on-a-web-page-using-html-css-and-javascript-2ejhvtl4cd.

Homepage style:

"CSS Website Layout," W3Schools, https://www.w3schools.com/css/css_website_layout.asp.

"How To Create a Search Bar," W3Schools,https://www.w3schools.com/howto/howto_css_searchbar.asp.

Query:

"SQL JOINS". https://www.w3schools.com/sql/sql_join.asp



Here is a list of things implemented on business side and who it was done by:
- All database table creations and most endpoints creations on business side in server.js were done by Chris.
- running project on local server set-up done by Chris.
- Chris Implemented backend code for admin login, user sign-up, user log-in, edit/modify/delete business info, edit/modify/delete service.
- Chris worked on admin login with popups to get information and implemented it to backend.
- Chris also started the endpoints and the modify/add/delete service on the business side using popups.
- Navpreet made the admin login use forms over pop-ups and implemented the backend according to this new frontend method.
- Navpreet completed the modify/add/delete services in business side, implementing it to the backend, and making it accessible for user side as well.
- Navpreet worked on styling of the website and created all pages that were missing in previous deliverable, even if there is no code in them.
- Navpreet created a few endpoints for the features worked on above.
- Lyne was able to get the confirm order page working at the last minute but we were unable to style it.

Here is a list of things implemented on user side and who it was done by:
- Lyne worked on most of the user endpoints and all the user features, getting the old ones connected to backend, and creating new ones as well, including:
  -   userEdit.html
  -   userLogin.html
  -   userPayment.html
  -   userPortal.html
  -   userProfile.html
  -   userReceipts.html
  -   userRequest.html
  -   userServices.html
  -   userSignUp.html
 

## Install Guide:
Our website should be deployed by first opening the index.html which is the home page of our website. From there, a client and admin can access their login/ sign up pages. The database is local. To install make sure all html files that belong to the frontend folder are in this folder. To use our website on the server, one will need to download Node.js and NPM, and from there download express, mysql, sqlite3, and express-session. Run the command 'nodemon server.js' from within the root directory of the project to start the server, then navigate to https://localhost:5000/

## User Guide:
For an admin:
Click on the login button and log in using the password and username given to them. These are hardcoded in the database. 
Then, the admin would have access to the Admin Options page to manage their business.
Admin should first start by clicking the Business Information button to add their business details, such as the name, the email address, the phone number and their address. This will display all information on the homepage.
Then, by clicking Go Back, admin are back to the Admin Options page. 
They should then click on the Edit Services button to add services, modify them or even delete them. 
They can then go back and view confirmed/unconfirmed orders and bills. 
When this is all set up, admin can then log out and be brought to the home page again.

For a client:
Click on the login and create an account using the Sign Up page. Then, the client will be brought back to the home page, but they now have access to their profile.
On the home page, a client can search for a specific service and is able to request a service. (to be updated)
By clicking the My Profile button at the top, the client is able to access and edit their information. 
Clients are able to see in the Services and Payments page the service that they have requested. In the services requested page they will see what services have been confirmed and which have not. And will also be able to cancel such services. In payments page, they can pay for their services using a form. 
Client can then log out and be brought back to the home page again. 




