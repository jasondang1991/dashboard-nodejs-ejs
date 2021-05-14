// Connect MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jasondang:o4k4VyScm0adQVop@cluster0.bdkg2.mongodb.net/mean240321?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('Connect Successful !'))
.catch(() => console.log('Connect Fail !'));


