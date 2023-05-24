function handleError(Error , req,res,next) {
    if (Error.code == 404) {
        res.status(404).render("errors/404")
    }
    console.log(Error)
    res.status(500).render("errors/notfound")
    next()
}

module.exports = handleError;