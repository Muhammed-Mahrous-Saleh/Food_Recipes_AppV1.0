export const validation = {
    EMAIL_VALIDATION: {
        required: "Email is required",
        pattern: {
            value: /\S+@\S{3,}\.\S{2,}/,
            message: "Enter a valid email",
        },
    },
};
