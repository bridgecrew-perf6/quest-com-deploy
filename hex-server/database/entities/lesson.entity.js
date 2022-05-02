const e = require('express');
const LessonModel = require('../models/Lesson');

class LessonEntity {

    async getLessons({ classroomId }) {
        try {
            const Lessons = await LessonModel.find({ classroom: classroomId })
                .populate('creator',['username','email'])
                .populate('classroom',['title'])
                .sort({ createdAt: -1 });
            return Lessons;
        }
        catch (error) {
            throw error;
        }
    }

    async getLessonById({ lessonId }) {
        try {
            const Lesson = await LessonModel.findById(lessonId).populate('creator',['username','email']).populate('classroom',['title']);
            return Lesson;
        }
        catch (error) {
            throw error;
        }
    }

    async createLesson({ classroomId, userId, title, description, lessonImg, lessonFile }) {
        try {
            const NewLesson = new LessonModel({
                classroom: classroomId,
                creator: userId,
                title,
                description,
                lessonImg,
                lessonFile,
            });
            const CreatedLesson = await NewLesson.save();
            return CreatedLesson;
        }
        catch (error) {
            throw error;
        }
    }

    async updateLesson({ lessonId, title, description, lessonImg, lessonFile }) {
        try {
            const UpdatedLesson = await LessonModel.findByIdAndUpdate(lessonId, {
                title,
                description,
                lessonImg,
                lessonFile,
                updateAt: Date.now(),
            }, { new: true });
          
            return UpdatedLesson;
        }
        catch (error) {
            throw error;
        }
    }

    async deleteLesson({ lessonId }) {
        try {
            const DeletedLesson = await LessonModel.findByIdAndDelete(lessonId);
            return DeletedLesson;
        }
        catch (error) {
            throw error;
        }
    }

    async pushLikeLesson({ lessonId, userId }) {
        try {
            const Lesson = await LessonModel.findById(lessonId);
            // check if user already liked this lesson
            if (Lesson.likes.find(like => like.user.toString() === userId)) {
                // Lesson Already liked, unlike it
                Lesson.likes = Lesson.likes.filter(like => like.user.toString() !== userId);
                Lesson.likeCount--;
            } else {
                // Lesson not liked, like it
                Lesson.likes.push({ user: userId });
                Lesson.likeCount++;
            }

            const UpdatedLesson = await Lesson.save();
            return UpdatedLesson;
        }

        catch (error) {
            throw error;
        }
    }

    async findCommentLessonById ({ lessonId, commentId }) {
        try {
            
            const Lesson = await LessonModel.findById(lessonId);

            // find Lesson Comment by find 
            // console.log("found ",Lesson.comments.find(comment => comment._id.toString() === commentId)) 
            const Comment = Lesson.comments.find(comment => comment._id.toString() === commentId);
            return Comment;
        }
        catch (error) {
            throw error;
        }
    }

    async pushComment ({ lessonId, userId, username, comment }) {
        try {
            const Lesson = await LessonModel.findById(lessonId);
            Lesson.comments.push({ user: userId, username, body:comment });

            const UpdatedLesson = await Lesson.save();
            return UpdatedLesson;
        }

        catch (error) {
            throw error;
        }
    }

    async deleteComment ({ lessonId, commentId }) {
        try {
            const Lesson = await LessonModel.findById(lessonId);
            Lesson.comments.id(commentId).delete();

            const UpdatedLesson = await Lesson.save();
            return UpdatedLesson;
        }

        catch (error) {
            throw error;
        }
    }

    async pushLikeCommentLesson ({ lessonId, commentId, userId }) {
        try {
            const Lesson = await LessonModel.findById(lessonId);

            // console.log("found ",Lesson.comments.find(comment => comment._id.toString() === commentId)) 

            const Comment = Lesson.comments.find(comment => comment._id.toString() === commentId);
            // check if user already liked this comment
            if (Comment.likes.find(like => like.user.toString() === userId)) {
                // console.log("already like comment, dislike it")
                // Comment Already liked, unlike it
                Comment.likes = Comment.likes.filter(like => like.user.toString() !== userId);
                Comment.likeCount--;
            } else {
                // console.log("not like comment, like it")
                // Comment not liked, like it
                Comment.likes.push({ user: userId });
                Comment.likeCount++;
            }
            const UpdatedLessonComment = await Lesson.save();
            return UpdatedLessonComment;
        }catch (error) {
            throw error;
        }
    }

}

module.exports = LessonEntity;

