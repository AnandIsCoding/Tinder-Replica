const validator = require('validator');

function validateSignUpData(req) {
    const { firstName, lastName, email, password,  age, gender } = req.body;

    // Validate first name and last name
    if (!firstName || !lastName) {
        return 'First name and last name are required';
    }

    if (firstName.length < 3 || firstName.length > 20 || lastName.length < 3 || lastName.length > 20) {
        return 'First name and last name must be between 3 and 20 characters long';
    }

    // Validate email
    if (!validator.isEmail(email)) {
        return 'Invalid email';
    }

    // Validate password strength
    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        return 'Password should be strong: at least 8 characters long, contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character.';
    }

   // Validate user image (ensure the file exists and has an appropriate name/type)
if (!req.files || !req.files.userimage) {
    return 'User image file is required';
}

// Validate age
if (!age || isNaN(age) || parseInt(age) <= 0) {
    return 'Age is required and must be a positive number';
}


    // Validate gender (assuming it’s required and limited to "male" or "female")
    if (!gender || !['male', 'female', 'others'].includes(gender.toLowerCase())) {
        return 'Gender is required and must be either "male" or "female" or "others';
    }

    return null;  // Return null if all validation passes
}

function validateLogindata(req){
    const {  email, password } = req.body;
    
    // Validate email
    if (!validator.isEmail(email, {
        unique:true
    })) {
        return 'Invalid email';
    }

    // Validate password strength
    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        return 'Password should be strong: at least 8 characters long, contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character.';
    }
    return null;

}

module.exports = {
    validateSignUpData,
    validateLogindata
}
