import joi from 'joi';

const signUpSchema = joi.object({
    name: joi
        .string()
        .max(40)
        .required(),
    email: joi
        .string()
        .max(40)
        .email()
        .required(),
    password: joi
        .string()
        .min(6)
        .max(40)
        .required(),
    repeat_password: joi
        .ref('password')
}).with('password', 'repeat_password');

const signInSchema = joi.object({
    email: joi
        .string()
        .max(40)
        .email()
        .required(),
    password: joi
        .string()
        .max(40)
        .required()
});


export { signUpSchema, signInSchema };
