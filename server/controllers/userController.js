const User = require("../models/user");

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if(!users) {
        return res.json(
            {
                message: 'No users found!'
            }
        )
    }
    res.json(users);
}

const createUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'No user data provided!' });
    }

    const existingUserByEmail = await User.findOne({ email: req.body.email });
    const existingUserByPhone = await User.findOne({ phone: req.body.phone });

    if (existingUserByEmail) {
        return res.status(400).json({ message: 'Email is already in use!' });
    }

    if (existingUserByPhone) {
        return res.status(400).json({ message: 'Phone number is already in use!' });
    }

    const user = new User({
        name: req.body.name,
        department: req.body.department,
        email: req.body.email,
        age: req.body.age,
        phone: req.body.phone,
        position: req.body.position,
        salary: req.body.salary
    });

    try {
        await user.save();
        return res.json({
            user,
            message: 'User added successfully!'
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};


const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(400).json({ message: 'No user with provided data found!' }); 
    }
    res.json(user);
}

const updateUserById = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'No user data provided!' });
    }

    const userId = req.params.id; // Assuming the user ID is part of the route parameters
    const existingUserByEmail = await User.findOne({ email: req.body.email, _id: { $ne: userId } });
    const existingUserByPhone = await User.findOne({ phone: req.body.phone, _id: { $ne: userId } });

    if (existingUserByEmail) {
        return res.status(400).json({ message: 'Email is already in use!' });
    }

    if (existingUserByPhone) {
        return res.status(400).json({ message: 'Phone number is already in use!' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            name: req.body.name,
            department: req.body.department,
            email: req.body.email,
            age: req.body.age,
            phone: req.body.phone,
            position: req.body.position,
            salary: req.body.salary
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found!' });
        }

        return res.json({
            user: updatedUser,
            message: 'User updated successfully!'
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found!' });
        }

        return res.json({
            user: deletedUser,
            message: 'User deleted successfully!'
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};


module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUser
}