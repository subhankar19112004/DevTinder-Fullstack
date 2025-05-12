const validator = require("validator");

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First name and last name are required");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("emailId is required or not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is required or not strong enough");
    }
};

const validsateEditProfileData = (req) => {
    const allowedEditFields = [
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills",
        "firstName",
        "lastName",
        "emailId",
    ];

    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
);

 return isEditAllowed;

};

const validateEditPassworData = (req) => {
    const editPassword = ["password"];
    const isEditAllow = Object.keys(req.body).every((field) =>
        editPassword.includes(field)
    );
    return isEditAllow;
}

module.exports = {
    validateSignupData,
    validsateEditProfileData,
    validateEditPassworData,
};
