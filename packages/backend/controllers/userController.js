import bcrypt from 'bcrypt'
import passport from 'passport'
import User from '../models/userSchema.js'


//CRUD
const getUsers = async (req, res) => {
    console.log("getting users ", req.isAuthenticated());
    try {
        const users = await User.find({})
        res.status(200).json(users) 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Sorry no users found"})
    }

}

const getMe = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)       
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "User Not Found"})
    }
}



const updateUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await User.updateOne({ _id: req.params.id }, data);

        if (result.nModified == 0) {
            res.status(404).json({ message: "User Not Found or No Changes Made" });
        } else {
            res.status(200).json({ message: "User updated successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            //Invalidate the session
            req.session.destroy((err) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error deleting user" });
                }
                //clear the cookie
                res.clearCookie('connect.sid')

                res.status(200).json({ message: "User deleted successfully" });
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting user" });
    }
}

//Login + Sign up

const createUser = async (req, res) => {
    const { password, ...userInfo} = req.body
    try {
        const user = await User.create({ password: bcrypt.hashSync(password, 10), ...userInfo})
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
}

const login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.status(500).json({ message: "Error logging in" });
        }
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            req.logIn(user, (err) => {
                if (err) {
                    res.status(500).json({ message: "Error logging in" });
                }
                res.status(200).json(user);
            });
        }
    })(req, res, next)
}

const logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.send(200);
      });
}


export {
    getUsers,
    getMe,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout
}