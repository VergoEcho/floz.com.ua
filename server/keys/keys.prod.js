module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/mydb',
    JWT: process.env.JWT || 'productionMainSecret'
}
