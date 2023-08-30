const mongoose = require("mongoose");

const newsletterSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  confirmationToken: String,
});


const Newsletter = mongoose.model("Newsletter", newsletterSchema);

module.exports = Newsletter;
