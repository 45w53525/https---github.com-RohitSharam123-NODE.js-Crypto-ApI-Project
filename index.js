const express = require("express");
const path = require("path");
const axios = require("axios");
const qs = require("querystring");

const url = "http://localhost:8888/get?";
// const string = "Search= Search.value";



const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || "8888";


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));

// /// Home page////////
app.get("/", (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
        params: { q: "Hitman" },
        headers: {
            'X-RapidAPI-Key': 'f8e4702006mshdb35cd56cad02c0p113563jsnb60f9ccb8bf2',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        var image = response.data.d[0].i.imageUrl;

        console.log(response.data);
        res.render("index", { title: "MOVIE FLEX", movies: response.data.d, img: image });
    }).catch(function (error) {
        console.error(error);

    });
});

/////Hollywood-News////////////  

app.get("/info", (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://online-movie-database.p.rapidapi.com/actors/get-all-news',
        params: { nconst: 'nm0001667' },
        headers: {
            'X-RapidAPI-Key': 'f8e4702006mshdb35cd56cad02c0p113563jsnb60f9ccb8bf2',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {

        // var img  = response.data.items[0].image.url;
        // var news = response.data.items[0].body;
        console.log(response.data.items);

        res.render("info", { title: "HOLLYWOOD-NEWS", items: response.data.items });
    }).catch(function (error) {
        console.error(error);
    });

});


//Search poster///

app.get("/Search", (req, res) => {

    var id = req.query.Search;

    getTrendingMovies(res, req, id);
});

function getTrendingMovies(res, req, id) {

    const options = {

        method: 'GET',
        url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
        params: { q: id },
        headers: {
            'X-RapidAPI-Key': 'f8e4702006mshdb35cd56cad02c0p113563jsnb60f9ccb8bf2',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        var image = response.data.d[0].i.imageUrl;
        console.log(response.data);
        res.render("Search", { title: "Home", movies: response.data.d, img: image });
        req.render("Search", { title: "Home", movies: response.data.d, img: image });

    }).catch(function (error) {
        console.error(error);

    });

};




////////  Live Crypto Price Page //////////


app.get("/Crypto", (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://live-crypto-prices.p.rapidapi.com/pricefeed',
        headers: {
            'X-RapidAPI-Key': 'f8e4702006mshdb35cd56cad02c0p113563jsnb60f9ccb8bf2',
            'X-RapidAPI-Host': 'live-crypto-prices.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {

        console.log(response.data);

        res.render("crypto", { title: "Crypto", crypto: response.data.result });

    }).catch(function (error) {
        console.error(error);
    });

});


//HTTP server listening////
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);

});


