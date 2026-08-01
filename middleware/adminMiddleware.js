module.exports = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).render("error", {
            message: "Access Denied",
            status: 403
        });
    }

    next();
};