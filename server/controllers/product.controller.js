const Product = require('../models/product.model')

module.exports.create = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        text: req.body.text,
        imageUrl: `/${req.file.filename}`,
        price: req.body.price,
        maxValue: req.body.maxValue,
        sex: req.body.sex,
        brand: req.body.brand,
        flask: req.body.flask
    })

    try {
        await product.save()
        res.status(201).json(product)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const posts = await Product.find().sort({date: -1})
        res.json(posts)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.getById = async (req, res) => {
    try {
        await Product.findById(req.params.id).populate('comments').exec((error, product) => {
            res.json(product)
        })
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.update = async (req, res) => {
    const $set = {
        text: req.body.text
    }
    try {
        const product = await Product.findOneAndUpdate({
            _id: req.params.id
        }, {$set}, {new: true})
        res.json(product)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Product.deleteOne({_id: req.params.id})
        res.json({message: 'Продукт удален'})
    } catch (e) {
        res.status(500).json(e)
    }
}