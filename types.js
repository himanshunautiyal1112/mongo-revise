const { z } = require("zod");

const SignupSchema = z.object({
    username: z.email(),
    password: z.string().min(5).max(10),
    name: z.string()
})

const SigninSchema = z.object({
    username: z.email(),
    password: z.string().min(5).max(10)
});

module.exports = {
    SignupSchema,
    SigninSchema
}