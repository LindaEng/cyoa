import express from 'express'
import passport from 'passport'

const getGoogleAuth = (req, res, next) => {
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })(req, res, next);
}

const getGoogleAuthCallback = (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); } // or wherever you want to redirect in case of failure
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/api/users/'); // or wherever you want to redirect in case of success
        });
    })(req, res, next);
}

export {
    getGoogleAuth,
    getGoogleAuthCallback
}
