

exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({msp: 'Internal Server Error'});
}