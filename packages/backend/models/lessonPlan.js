import mongoose from 'mongoose'

const lessonPlan = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lesson: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const LessonPlan = mongoose.model('LessonPlan', lessonPlan)

export default LessonPlan