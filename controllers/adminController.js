const { Admin } = require('../models')


const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.params });
        res.json(admin)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getAdmin,
}