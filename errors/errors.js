exports.handlePQSLErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad request' })
    } else if (err.code === '42703') {         
        res.status(404).send({ msg: 'Column does not exist'})
    } else { 
        next(err);
    }
}

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        console.log(err, 'in handleCustomErrors')

        res.status(err.status).send({msg: err.msg});
    } else {
        next(err);
    }
};

exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({msp: 'Internal Server Error'});
}