var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    note:{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Articles = mongoose.model("Article", ArticleSchema);

module.exports = Articles;