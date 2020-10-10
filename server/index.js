const express = require("express");
const consola = require("consola");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const database = require("../config/database");
const { Nuxt, Builder } = require("nuxt");
const app = express();

//setting up body parser middleware to handle post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("json spaces", 2);

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

// database configuration ===============================================================

config.MONGODB_URI = database.MONGODB_URI;
mongoose.Promise = Promise;
mongoose
    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        console.log(
            `Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`
        );
    })
    .catch(err => console.log("There was an error with your connection:", err));

// Configure mongo store ================================================================
const store = new MongoDBStore({
    uri: config.database,
    collection: "sessions"
});

store.on("error", function(error) {
    assert.ifError(error);
    assert.ok(false);
});

// pass passport for configuration
require("../config/passport.js")(passport);

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    const { host, port } = nuxt.options.server;

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    } else {
        await nuxt.ready();
    }

    // required for passport
    app.use(
        session({
            secret: "sdf897ghjty78s97d8gd4bgf4d65st4fg453g43r5tgh786g4b65dz1s",
            cookie: { maxAge: 24 * 60 * 60 * 1000 },
            resave: true,
            saveUninitialized: false,
            store: store
        })
    ); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

    // Routes go here
    require("../routes/routes.js")(app, passport);
    // Give nuxt middleware to express
    app.use(nuxt.render);

    // Listen the server
    app.listen(port, host);
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    });
}
start();
