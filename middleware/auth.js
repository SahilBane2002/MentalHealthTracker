const User = require('../models/User');


const requireAuth = async (req, res, next) => {
    try {
        if (!req.session.userID) {
            req.flash('error', 'Login to access this page');
            return res.redirect('/auth/login');
        }
        const user = await User.findById(req.session.userID);
        if (!user || !user.isActive) {
            req.flash('error', 'User not found or inactive');
            return res.redirect('/auth/login');
        }

        req.user = user;
        res.locals.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        req.flash('error', 'An error occurred while authenticating');
        return res.redirect('/auth/login');
    }
};

//Middle to redirect authenticated users
const redirectIfAuth = (req, res, next) => {
    if (req.session.userID) {
        return res.redirect('/dashboard');
    }
    next();
};

// Middleware to check if email is verified
const requireEmailVerification = (req, res, next) => {
    if (!req.user.isEmailVerified) {
        req.flash('error', 'Please verify your email to access this page');
        return res.redirect('/auth/verify-email');
    }
    next();
};


module.exports = {
    requireAuth,
    redirectIfAuth,
    requireEmailVerification
};