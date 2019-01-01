import * as express from "express";

const router = express.Router({mergeParams: true});

router.route("/login").post((req, res, next) => {
    res.cookie("session", "some-token");
    res.sendStatus(204);
}).get((req, res, next) => {
    if (!req.cookies) {
        res.sendStatus(401);
        return;
    }

    const sessionToken = req.cookies["session"];//TODO search for session and close it

    if (sessionToken) {
        res.sendStatus(204);
    } else {
        res.sendStatus(401);
    }
});

router.route("/logout")
    .post((req, res, next) => {
        const sessionToken = req.cookies["session"];//TODO search for session and close it
        res.clearCookie("session");
        res.sendStatus(204);
    });

export default router;
