As per the requirement application need a json input to render the data. So I have implemented as according to it. It will accept json input from get request and parse the data using json parse method of javascript. In order to make it run on local please run this application either with brackets live connection or deploy it in web server.

:::::Implemented functionality :::::

1) We can edit the JSON properties available in the project to see changes in the application.

2) Remove functionality, if all items gets removed it will show message to the user.

3) On clicking of Edit Pop up will open with correct data, however update functionality is pending.

4) Shipping charges (5 dollar) and information beneath it will get change if total value of the cart is greater or less than 50 dollar.

5) Validation of promotions and promo code can be applied. Default promo code MKY10, JF7 & RF8 to verify.

6) Responsive design using media queries

Note: 
Earlier I have used arrow functions, backticks but it's not working in IE11, so updated the code to ES5
Arrow function not working in IE11
Backtics not working in IE11