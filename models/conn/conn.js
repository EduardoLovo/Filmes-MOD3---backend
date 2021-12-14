const mongoose = require('mongoose');

function Conn(url, porta, banco) {
    mongoose.connect(`mongodb+srv://Admin:kMyw4eyxTeQHNPc@filmes.ezi8e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.error(err);
    });
}

module.exports = Conn;