const mongoose = require("mongoose");


exports.connect = () => {
    mongoose.connect(process.env.DB_CONNECT, (err) => {
        if(err) console.log(err);
        else console.log('db connected..!');
    });
};