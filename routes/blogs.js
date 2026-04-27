const express = require("express");
const mongoose = require("mongoose");
const Blog = require("../models/Blog");

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const title = req.body.title;
        const body = req.body.body;
        const author = req.body.author;

        if (!title || !body) {
            return res.status(400).json({ message: "title and body are required" });
        }

        const created = await Blog.create({ title, body, author });
        return res.status(201).json(created);
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return res.status(200).json(blogs);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json(blog);
    } catch (err) {
        next(err);
    }
});
router.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, body, author } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        if (!title || !body) {
            return res.status(400).json({ message: "title and body are required" });
        }

        const updated = await Blog.findByIdAndUpdate(
            id,
            { title, body, author },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const deleted = await Blog.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(204).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;