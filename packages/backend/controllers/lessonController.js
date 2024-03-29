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

const getSection = async (req, res) => {
    try {
        const lessonId = req.params.lessonId
        const sectionTitle = req.params.sectionTitle
        const section = await LessonPlan.findOne({ _id: lessonId }, { sections: { $elemMatch: { title: sectionTitle } } })
        res.status(200).json(section)
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Section Not Found"})
    }
}

const getPageById = async (req, res) => {
    try {
        const lessonId = req.params.lessonId
        const sectionTitle = req.params.sectionTitle
        const pageId = req.params.pageId
        const lesson = await LessonPlan.findById(lessonId)
        const section = lesson.sections.find(section => section.title === sectionTitle)
        const page = section.pages.find(page => page.page === parseInt(pageId))
        res.status(200).json(page)
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Page Not Found"})
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
        const lessonId = req.params.id
        const updatedLesson = req.body

        await LessonPlan.updateOne({ _id: lessonId }, updatedLesson);

        res.status(200).json({message: "Lesson updated successfully"})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error updating lesson"})
    }
}

const updateSection = async (req, res) => {
    try {
        const { lessonId, sectionTitle } = req.params
        console.log("UPDATE SECtiON ROUTE", lessonId, sectionTitle);
        const updatedSection = req.body

        let updateQuery = {}
        for(let key in updatedSection) {
            updateQuery[`sections.$[elem].${key}`] = updatedSection[key]
        }

        await LessonPlan.updateOne(
            { _id: lessonId },
            { $set: updateQuery },
            { arrayFilters: [{"elem.title": sectionTitle}] }
        )

        res.status(200).json({message: "Section updated successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error updating section"})
    }
}

const updatePage = async (req, res) => {
    try {
        const { lessonId, sectionTitle, pageId } = req.params
        const updatedPage = req.body

        // Find the lesson plan
        const lessonPlan = await LessonPlan.findById(lessonId)

        // Find the correct section
        const sectionIndex = lessonPlan.sections.findIndex(section => section.title === sectionTitle)

        // Find the correct page within the section
        const pageIndex = lessonPlan.sections[sectionIndex].pages.findIndex(page => page.page === parseInt(pageId))

        // Update the page
        for(let key in updatedPage) {
            lessonPlan.sections[sectionIndex].pages[pageIndex][key] = updatedPage[key]
        }

        console.log("update page page", lessonPlan.sections[sectionIndex].pages[pageIndex]);

        // Mark the pages field as modified
        lessonPlan.markModified(`sections.${sectionIndex}.pages`);

        // Save the updated lesson plan
        await lessonPlan.save()

        res.status(200).json({message: "Page updated successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error updating page"})
    }
}

const deleteLesson = async (req, res) => {
    try {
        const userId = req.params.userId
        const lessonId = req.params.lessonId
        await LessonPlan.deleteOne({ _id: lessonId, user: userId });
        await User.updateOne({ _id: userId }, { $pull: { lessonPlans: lessonId } });
        res.status(200).json({message: "Lesson deleted successfully"})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error deleting lesson"})
    }
}

export { getLessons, getLessonById, getSection, getPageById, createLesson, updateLesson, updatePage, updateSection, deleteLesson }