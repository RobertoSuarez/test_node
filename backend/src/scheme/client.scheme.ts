import Joi from 'joi';

const name = Joi.string().min(3).max(100);
const lastName = Joi.string().min(3).max(100);
const identification = Joi.string().pattern(/^[0-9]+$/).min(10).max(13);
const email = Joi.string().email();
const phoneNumber = Joi.string().pattern(/^09[0-9]{8}$/).min(10).max(10).messages({
    'string.pattern.base': 'El número de teléfono debe tener al menos 10 dígitos y solo números y debe comenzar con 09'
});
const address = Joi.string().min(20).max(100);
const referenceAddress = Joi.string().min(20).max(100);


const createClientScheme = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    identification: identification.required(),
    email: email.required(),
    phoneNumber: phoneNumber.required(),
    address: address.required(),
    referenceAddress: referenceAddress.required(),
});

const updateClienteScheme = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    identification: identification.required(),
    email: email.required(),
    phoneNumber: phoneNumber.required(),
    address: address.required(),
    referenceAddress: referenceAddress.required(),
})

const clientIdScheme = Joi.object({
    clientId: Joi.number().integer().required()
})


export { createClientScheme, clientIdScheme, updateClienteScheme };