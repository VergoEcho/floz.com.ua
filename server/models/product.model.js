const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    maxValue: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    flask: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    sells: {
        type: Number,
        default: 0
    },
    imageUrl: String,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comments'
        }
    ]
})

module.exports = model('product', productSchema)