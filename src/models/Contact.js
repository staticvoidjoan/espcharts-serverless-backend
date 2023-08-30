const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    name:{type: 'string', required: true},
    email:{type:'string', required: true},
    message:{type:'string', required: true}
})


const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;