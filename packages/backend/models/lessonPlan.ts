import mongoose from 'mongoose'

const lessonPlan = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,   
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const LessonPlan = mongoose.model('LessonPlan', lessonPlan)

module.exports = LessonPlan