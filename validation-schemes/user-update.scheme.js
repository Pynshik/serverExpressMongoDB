const Joi = require('joi');

const updateUserScheme = Joi.object({
    login: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    avatar: Joi.string(),
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    age: Joi.number()
        .integer()
        .min(10)
        .max(110)    
})

    module.exports = updateUserScheme;