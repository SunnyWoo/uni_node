const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/News', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false
});
