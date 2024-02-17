import mongoose from 'mongoose'
const Schema = mongoose.Schema

const lessonPlan = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sections: {
        type: [Schema.Types.Mixed],
        required: true
    },
    lessonPlan: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const LessonPlan = mongoose.model('LessonPlan', lessonPlan)

export default LessonPlan