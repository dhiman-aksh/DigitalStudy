1. To start the node.js serves, first install it, then, in the terminal, write "npm start" to start the server, you will see a message : "Server started on Port 8001".
2. In "app.js", you will find everything required; and half of the routes are stored in "./routes/pages", to make it look less clumsy & a connection has been made between "app.js" and "pages.js".
3. "passport-setup.js" has Google-oauth information, it serialize and deserialize the user & verify the user.
4. ".env" has all secret information about Google Authentication.

ROUTES:
5. Many routes are defined here.

VIEWS:
6. "index.js" is the Homepage, and contains all elements. It has Google Login Button
7. "faq.ejs", contains only questions related to website.
8. "profile.ejs", is a temporary page in which the output is shown after signing in through google.
9. "login.ejs" and "signup.ejs" are extra pages.

PUBLIC:
10. "css" folder have all css files for icons.
11. "images" folder have all images for website's homapage.
12. "webfonts" folder have all icons.
13. "function_faq.js", defines the functioning of faq page.
14. "style_index.css", have styles for index.ejs.
15. "style_faq.ejs", have styles for faq.ejs.
16. "style_login" and "style_signup", have styles for login.ejs and signup.ejs.
