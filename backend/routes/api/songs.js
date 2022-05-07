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
            order: [["createdAt", "DESC"]]
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
        const song = await Song.findOne({
            where: {id: id},
            include: [{ model: User},{model: Comment}, {model: Like}],
        });

        return res.json({
            song,
        });
    }),
)

router.put(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const song = await Song.findOne({
            where: {id: id},
            include: [{ model: User},{model: Comment}, {model: Like}],
        });
        if(song){
            await song.update(req.body);
            await song.save();
            res.json(song)
        }
    }),
)

router.delete(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const song = await Song.findOne({
            where: {id: id},
            include: [{ model: User},{model: Comment}, {model: Like}],
        });
        if(song){
            await song.destroy();
        }else{
            res.json('could not find song')
        }
    }),
)

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const {name, artistId, image, songUrl} = req.body;
        const newSong = await Song.create({
            name, 
            artistId, 
            image, 
            songUrl
        });

        return res.json({
            newSong,
        });
    }),
)

module.exports = router