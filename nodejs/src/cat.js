var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Cat', {
    useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'error'));
db.once('open', function () {
    console.log('connected');

    var kittySchema = mongoose.Schema({
        name: String,
        id: {
            type: Number,
            index: true,
            unique: true
        }
    })
    kittySchema.methods.speak = function () {
        var greeting = this.name ? 'Meow name is ' + this.name : 'Meow do not have a name';
        console.log(greeting);

    }

    var Kitty = mongoose.model('Kitty', kittySchema);

    var Fenye = new Kitty();
    Fenye.speak();

    Fenye.save();
    console.log(Fenye.name);


});