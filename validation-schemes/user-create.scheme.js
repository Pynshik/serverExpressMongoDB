const Joi = require('joi');

const createUserScheme = Joi.object({
    login: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    avatar: Joi.string().required(),
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    age: Joi.number()
        .integer()
        .min(10)
        .max(110)    
})

    .with('login', 'password')
    .with('login', 'avatar');

    module.exports = createUserScheme;