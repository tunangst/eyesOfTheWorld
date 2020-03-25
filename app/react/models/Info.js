const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    altitude: { type: Number },
    camera: { type: String },
    date: { type: Date },
    width: { type: Number },
    height: { type: Number },
    aperture: { type: String },
    shutter: { type: Number },
    iso: { type: Number },
    exposure: { type: Number },
    light: { type: String },
    flash: { type: String },
    flashStrength: { type: String },
    contrast: { type: String },
    saturation: { type: String },
    sharpness: { type: String },
    brightness: { type: Number },
    whiteBalance: { type: String },
    zoom: { type: Number },
    artist: { type: String },
    software: { type: String },
    copyright: { type: String }
});

module.exports = Info = mongoose.model('info', InfoSchema);
