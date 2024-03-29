import mongoose from 'mongoose'

const user = new mongoose.Schema({
    googleId: {
        type: String,
        default: null
    },
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,   
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,   
        required: function() {
            return this.googleId === null
        }
    },
    lessonPlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LessonPlan'
    }]
})

const User = mongoose.model('User', user)

export default User