import * as express from "express";

const router = express.Router({mergeParams: true});

router.route("/")
    .get((req, res, next) => {
        res.send("all users response");
    });

export default router;
