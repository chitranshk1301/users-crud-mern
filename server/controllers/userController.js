const User = require("../models/user");

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

const createUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'No User added!' });
    }
    const user = new User({
        name: req.body.name,
        department: req.body.department,
        position: req.body.position,
        salary: req.body.salary
    });
    await user.save();
    res.json(user);
    return res.json(
        {
            messaage: 'User added successfully!'
        }
    )
}

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

const updateUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
}


module.exports = {
    getAllUsers,
    createUser,
    getUserById
}