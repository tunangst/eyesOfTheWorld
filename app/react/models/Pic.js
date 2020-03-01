const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    fieldname: { type: String },
    originalname: { type: String, required: true },
    encoding: { type: String },
    mimetype: { type: String },
    id: { type: String },
    filename: { type: String, required: true },
    bucketName: { type: String },
    chunkSize: { type: Number },
    size: { type: Number },
    md5: { type: String },
    uploadDate: { type: Date, required: true },
    contentType: { type: String }
});

module.exports = mongoose.model('image', ImageSchema);
