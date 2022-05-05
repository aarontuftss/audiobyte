const express = require('express')
const asyncHandler = require('express-async-handler');

const { Song, User, Like, Comment } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');


router.get(
    '/',
    asyncHandler(async (req, res) => {
        const songs = await Song.findAll({
            include: [{ model: User},{model: Comment}, {model: Like}],
            order: [["createdAt", "ASC"]]
        });

        return res.json({
            songs,
        });
    }),
);

router.get(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        console.log(id)
        const song = await Song.findOne({
            where: {id: id},
            include: [{ model: User},{model: Comment}, {model: Like}],
        });

        return res.json({
            song,
        });
    }),
)

module.exports = router