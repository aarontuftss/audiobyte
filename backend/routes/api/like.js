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

module.exports = router