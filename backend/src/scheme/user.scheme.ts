import Joi from 'joi';


const id = Joi.number().integer();
const username = Joi
    .string().min(8).max(20)
    .pattern(new RegExp('^[a-zA-Z0-9]*$')) // Solo letras y números
    .pattern(new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])')) // Al menos una letra y un número;
    .messages({
        'string.pattern.base': 'El nombre de usuario debe contener solo letras y números, y al menos un número.',
        'any.required': 'El nombre de usuario es obligatorio.'
    })

const password = Joi.string()
        .pattern(new RegExp('^(?=.*[0-9])(?=.*[A-Z]).{8,30}$'))
        .messages({
            'string.pattern.base': 'La contraseña debe tener al menos un número, al menos una letra mayúscula, y debe tener entre 8 y 30 caracteres.',
            'any.required': 'La contraseña es obligatoria.'
        })
const firstName = Joi.string().min(3).max(100);
const lastName = Joi.string().min(3).max(100);
const email = Joi.string().email();

const createUserScheme = Joi.object({
    creatorUserId: id.required(),
    newUser: Joi.object({
        username: username.required(),
        email: email.required(),
        password: password.required(),
        rolId: Joi.number().integer().required(),
    })
})

const updateUserScheme = Joi.object({
    username: username.required(),
    email: email.required(),
    rolId: Joi.number().integer().required(),
})

const userIdScheme = Joi.object({
    userId: id.required()
})

const loginScheme = Joi.object({
    username: username.required(),
    password: password.required()
})


export { createUserScheme, userIdScheme, updateUserScheme, loginScheme };