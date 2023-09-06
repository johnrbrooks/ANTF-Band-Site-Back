const { Admin } = require('../models')

const getAdmin = async (req, res) => {
    try {
        const { email } = req.params
        const admin = await Admin.findOne({ email: email })

        if(!admin) {
            return res.status(404).json({ message: "Admin not found." })
        }

        res.json(admin)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAdmin,
}