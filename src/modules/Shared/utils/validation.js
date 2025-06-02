export const validation = {
    EMAIL_VALIDATION: {
        required: "Email is required",
        pattern: {
            value: /\S+@\S{3,}\.\S{2,}/,
            message: "Enter a valid email",
        },
    },
    // The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.
    PASSWORD_VALIDATION: (required) => {
        return {
            required: `${required}`,
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
            },
            validate: {
                hasUppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must contain at least one uppercase letter",
                hasLowercase: (value) =>
                    /[a-z]/.test(value) ||
                    "Password must contain at least one lowercase letter",
                hasNumber: (value) =>
                    /\d/.test(value) ||
                    "Password must contain at least one number",
                hasSpecialChar: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    "Password must contain at least one special character",
            },
        };
    },
    CONFIRM_PASSWORD_VALIDATION: (newPassword) => {
        return {
            required: "Confirm Password is required",
            validate: (value) =>
                value === newPassword || "Passwords do not match",
        };
    },

    USERNAME_VALIDATION: {
        required: "User Name is required",
        minLength: {
            value: 4,
            message: "The User Name must be at least 4 characters.",
        },
        validate: {
            isEndUpWithNumber: (value) =>
                /[0-9]+$/.test(value) ||
                "The User Name must end with numbers without spaces.",
            isContainsCharacters: (value) =>
                /[a-zA-Z]+/.test(value) ||
                "The User Name must contain characters",
        },
    },
    COUNTRY_VALIDATION: {
        required: "Country is required",
        minLength: {
            value: 3,
            message: "The Country must be at least 3 characters.",
        },
    },
    PHONE_VALIDATION: {
        required: "Phone is required",
        minLength: {
            value: 5,
            message: "The Phone must be at least 5 characters.",
        },
    },
};
