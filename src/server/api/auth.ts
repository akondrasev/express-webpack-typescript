import * as express from "express";

const router = express.Router({mergeParams: true});

router.route("/login").post((req, res, next) => {
    console.log("req.sessionID: ", req.sessionID);

    if (req.session.user) {
        res.sendStatus(204);
        return;
    }

    req.session.regenerate(() => {
        req.session.user = {
            email: req.body.email
        };

        res.sendStatus(204);
    });
}).get((req, res, next) => {
    if (req.session.user) {
        req.session.reload(() => {
            res.sendStatus(204);
        });
    } else {
        res.sendStatus(401);
    }
});

router.route("/logout")
    .post((req, res, next) => {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.sendStatus(204);
        });
    });

export default router;
