const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync({...JSON.parse(req.body.data), avatar: req.file.path});
        next();
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = validate;