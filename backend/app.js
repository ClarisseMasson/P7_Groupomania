const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressip = require('express-ip');
const helmet = require('helmet');

//on importe les routes
const accountRoutes = require('./routes/account');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const topFiveRoutes = require('./routes/topfive');

const app = express();

app.use((req, res, next) => {
    //on autorise que la communication entre le frontend et le backend
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-AccountId');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//on utilise helmet pour éviter certaines failles XSS mais aussi pour cacher des informations sur le serveur qu'on utilise
app.use(helmet());

app.use(expressip().getIpInfoMiddleware);

app.use(bodyParser.json());

//pour enregistrer les images qui est un dossier static
app.use('/images', express.static(path.join(__dirname, 'images')));

//pour enregistrer les routes
app.use('/api/account', accountRoutes);
app.use('/api/post', postRoutes);
app.use('/api/post/:postId/comment', commentRoutes);
app.use('/api/topfive', topFiveRoutes);




module.exports = app;


 