import express from "express";

const router = express.Router();

router.route("/")
    .get((req, res, next) => {
        res.send("all users response");
    });

export default router;