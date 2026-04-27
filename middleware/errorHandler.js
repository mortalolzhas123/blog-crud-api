module.exports = (err, req, res, next) => {
    if (err && err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }

    if (err && err.name === "CastError") {
        return res.status(400).json({ message: "Invalid id format" });
    }

    console.log(err);
    return res.status(500).json({ message: "Server error" });
};
