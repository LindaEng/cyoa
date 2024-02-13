import LessonPlan from '../models/lessonPlan.js';
import User from '../models/userSchema.js';

//CRUD
const getLessons = async (req, res) => {   
    try {
        const lessons = await LessonPlan.find({})
        res.status(200).json(lessons)
    } catch (error) {
       console.log(error); 
       res.status(500).json({message: "Sorry no lessons found"})
    }
}

const getLessonById = async (req, res) => {
    try {
        const id = req.params.id
        const lesson = await LessonPlan.findById(id)
        res.status(200).json(lesson)
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Lesson Not Found"})
    }
}

const createLesson = async (req, res) => {
    try {
        const newLesson = req.body
        console.log(newLesson);
        const savedLesson = await LessonPlan.create(newLesson)
        const user = await User.findById(savedLesson.user)
        user.lessonPlans.push(savedLesson._id)
        await user.save()
        res.status(201).json({savedLesson, user})
    } catch (error) {
       console.error(error);
       res.status(500).json({message: "Error creating lesson"}) 
    }
}

const updateLesson = async (req, res) => {
    try {
        const userId = req.params.id
        const lessonId = req.params.lessonId
        const updatedLesson = req.body

        await LessonPlan.updateOne({ _id: lessonId, user: userId }, updatedLesson);

        res.status(200).json({message: "Lesson updated successfully"})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error updating lesson"})
    }
}

const deleteLesson = async (req, res) => {
    try {
        const userId = req.params.id
        const lessonId = req.params.lessonId
        await LessonPlan.deleteOne({ _id: lessonId, user: userId });
        await User.updateOne({ _id: userId }, { $pull: { lessons: lessonId } });
        res.status(200).json({message: "Lesson deleted successfully"})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error deleting lesson"})
    }
}

export { getLessons, getLessonById, createLesson, updateLesson, deleteLesson }