require('marko/node-require');

let markoExpress = require('marko/express');
let express = require('express');
let app = express();
let port = 8800;
let path = require('path');
let bodyParser = require('body-parser');
let viewsDirectory = path.join(__dirname, '/server/views');
let publicDirectory = path.join(__dirname, '/public');
let comments = [{name: 'Izaya Orihara', comment: 'This is a very good website. I like most the places featured here.', image: '/images/Izaya.png'},
                {name: 'Tetsuya Kuroko', comment: 'I like to go to visit the Imperial Palace soon. I am very happy this website gives information about excellence tourist spots around Tokyo.', image: '/images/Tetsuya.jpg'},
                {name: 'L Lawliet', comment: 'I recommend this website to anyone who wants to visit Tokyo for the first time.', image: '/images/Lawliet.jpg'}
                ];
let userplaces = [{placename: 'Roppongi', description: 'Roppongi (六本木, literally "six trees") is a district of Minato, Tokyo, Japan, famous for the affluent Roppongi Hills development area and popular night club scene. A few foreign embassies are located near Roppongi, and the night life is popular with locals and foreigners alike. It is in the central part of Tokyo, south of Akasaka and north of Azabu.',  image1: '/images/Roppongi1.jpg',  image2: '/images/Roppongi2.jpg'}];

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(publicDirectory));
app.use(markoExpress());

app.get('/', function(req, res){
    let view = require(path.join(viewsDirectory, 'index.marko'));
    let data = {
        title: 'HOME',
        userplaces: userplaces,
        };
    res.marko(view, data);
});

// app.get('/', function(req, res){
//     let view = path.join(viewsDirectory, 'index.html');
//     res.type('html');
//     res.sendFile(view);
// });

app.get('/palace', function(req, res){
    let view = path.join(viewsDirectory, 'palace.html');
    res.type('html');
    res.sendFile(view);
});

app.get('/comment', function(req, res){
    let view = require(path.join(viewsDirectory, 'comment.marko'));
    let data = {
        title: 'COMMENTS',
        comments: comments,
        };
    res.marko(view, data);
});

app.post('/comment', (req, res) => {
    let body =  req.body;
    comments.push({
        name: body.name,
        comment: body.comment,
        image: body.image
    });
    console.log(comments);
    res.redirect('/comment');
});

app.get('/addplace', function(req, res){
    let view = require(path.join(viewsDirectory, 'addplace.marko'));
    let data = {
        title: 'ADD PLACE',
        userplaces: userplaces,
        };
    res.marko(view, data);
});

app.post('/addplace', (req, res) => {
    let body =  req.body;
    userplaces.push({
        placename: body.name,
        description: body.description,
        image1: body.image1,
        image2: body.image2
    });
    console.log(userplaces);
    res.redirect('/');
});

app.listen(port, function(err){
    if(err){return console.error(err);}
    console.log('Listening to ' + port);
})