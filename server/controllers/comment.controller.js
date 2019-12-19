const Comment = require('../models/comment.model')
const Product = require('../models/product.model')

module.exports.create = async (req, res) => {
    try {
        const {name, text, postId} = req.body
        const comment = new Comment({
            name: name,
            text: text,
            postId: postId
        })

        await comment.save()

        const product = await Product.findById(postId)
        product.comments.push(comment._id)
        await product.save()

        res.status(201).json(comment)

    } catch (e) {
        res.status(500).json(e)
    }
}