# Node Artive
## A digital exhibition - A home for art lovers

Node Artive is where artists share their artworks and sentiment through art. Our desire is to connect artists and art enthusiasts to form a cultural context for how art is created, discovered, and shared.  We help artists find their identity through self-expression and we believe that art is for everyone.

[Live demo](https://10.114.32.123/~artive/NodeArtive/client/pages/front/index.html)

VPN is needed to open the page.

## Features

- As an anonymous user, you can view the collection, all artworks and search collections by name. 
- As a log-in user (whether you are artist or visitor), in addition to above features, you can add new artworks, edit and delete them. You can also like the artworks, write comments. Besides, in your profile page, you can update your information and change password. 
- As a admin, you have the right to delete images and comments that are against the rules and policy of the website. 

## A hint of NodeArtive

Home page: 

<img width="1437" alt="Screenshot 2021-12-16 at 21 01 54" src="https://user-images.githubusercontent.com/31731738/146432671-b02e1961-f414-4c4f-acd8-0ef3cc0ad855.png">

Collection page:

<img width="1437" alt="Screenshot 2021-12-16 at 21 02 08" src="https://user-images.githubusercontent.com/31731738/146432737-b39b355d-b515-49e6-93c6-a7133c4d1daa.png">

## How to use

- The website contains 5 main pages: Front page, Profile page, Collection page, Single Collection page and Image Details page. 
- On Front page, you can view the 3 most popular artworks, arranged based on the number of likes for each image. If you log in, you can see your name on the top right of the page. 
- On Profile page, you can upload your artwork and it will be displayed in the artwork section. You can also update your profile and change your password on this page.
- On Collection page, you can search for collection name within our wide range of collections.
- On Single Collection page, you can view all the artwork that belongs to this collection. Hover on each image to see artwork's name and artist.
- On Image Details page, you can edit the artwork's title/date/description/collection, delete the artwork, like the artwork add comments below it. 
- On every page, there is also menu button which direct you to wherever you want. At the bottom of the menu is logout button which you can use to end your session. Next time, you will need to login again.

## Stack

- Front-end: HTML and CSS for creating and styling all the pages. Javascript for changing the DOM and communicating with Back-end.
- Back-end: NodeJS and Express
- Database: MariaDB
- The app is deployed on server provided by Metropolia. 

## Installation

Clone the repo:
```
git clone https://github.com/Nischhal3/NodeArtive.git
```

To run the back-end: 

```
cd NodeArtive
cd server
npm install
```

Create and .env file with the following content: 
```
DB_HOST=mysql.metropolia.fi
DB_USER=<your-db-user>
DB_PASS=<your-db-user_password>
DB_NAME=<your-db-name>
JWT_SECRET=secret
```

```
nodemon app.js 
```

To run front-end: You can open the client/pages/front/index.html on VSCode/WebStorm. For VSCode, you can click the Go Live on the bottom bar to open the web on your default browser. For WebStorm, you can choose the browser which you want to go live. 

## Resources

- [Planner](https://tasks.office.com/metropoliafi.onmicrosoft.com/Home/PlanViews/3tVY9_gkz0y8osajwy54UpYAE9q1?Type=PlanLink&Channel=Link&CreatedTime=637752777204810000)
- [Mockup](https://www.figma.com/file/8bBB7hwFLfigbCBdAxKbXO/NodeArtive?node-id=0%3A1)
- [Database SQL](https://github.com/Nischhal3/NodeArtive/blob/main/server/db.sql)

## Dependencies
- nodemon
- Express
- Cors
- multer
- dotenv
- express-validator
- bcryptjs
- jsonwebtoken
- sharp
- npm i mysql2
- npm install express-validator
- npm i passport passport-local passport-jwt
- npm i exif

## Contributors
- Giang Nguyen
- My Mai
- Nischhal Shrestha
