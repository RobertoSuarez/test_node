import Joi from 'joi';

const id = Joi.number().integer();
const description = Joi.string().pattern(/^[A-Z]{2}[0-9]{4}$/).messages({
    'string.pattern.base': 'La descripción del turno debe tener 6 dígitos y estar conformada por 2 letras mayúsculas y 4 números.'
});
const date = Joi.date();
const userGestorId = Joi.number().integer();
const cashId = Joi.number().integer();

const createTurnScheme = Joi.object({
    description: description.required(),
    date: date.required(),
    userGestorId: userGestorId.required(),
    cashId: cashId.required(),
});

const updateTurnScheme = Joi.object({
    description: description.required(),
    date: date.required(),
    userGestorId: userGestorId.required(),
    cashId: cashId.required()
});

const turnIdScheme = Joi.object({
    turnId: id.required(),
})

export { createTurnScheme, updateTurnScheme, turnIdScheme };