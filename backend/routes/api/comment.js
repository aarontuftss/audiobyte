const express = require('express')
const asyncHandler = require('express-async-handler');

const { Song, User, Like, Comment } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');

router.get(
    '/:id(\\d+)',
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const songComments = await Comment.findAll({
            where: {songId: id},
            include: [{ model: User}, {model: Song}],
            order: [["createdAt", "ASC"]]
        });

        return res.json({
            songComments,
        });
    }),
);

router.put(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const comment = await Comment.findOne({
            where: {id: id}
        });
        if(comment){
            await comment.update(req.body);
            await comment.save();
            res.json(comment)
        }
    }),
)

router.delete(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const comment = await Comment.findOne({
            where: {id: id}
        });
        if(comment){
            await comment.destroy();
            res.json('comment removed')
        }else{
            res.json('could not find comment')
        }
    }),
)

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const {text, userId, songId} = req.body;
        const newComment = await Comment.create({
            text,
            userId, 
            songId
        });

        return res.json({
            newComment,
        });
    }),
)

module.exports = router