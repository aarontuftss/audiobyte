const express = require('express')
const asyncHandler = require('express-async-handler');

const { Song, User, Like, Comment } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');


router.get(
    '/user/:id(\\d+)',
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const userLikes = await Like.findAll({
            where: {userId: id},
            include: [{ model: User}, {model: Song}],
            order: [["createdAt", "ASC"]]
        });

        return res.json({
            userLikes,
        });
    }),
);

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const {userId, songId} = req.body;
        const newLike = await Like.create({
            userId,
            songId
        });

        return res.json({
            newLike,
        });
    }),
)

router.delete(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const like = await Like.findOne({
            where: {id: id},
        });

        if(like){
            like.destroy()
        }
    }),
)


module.exports = router