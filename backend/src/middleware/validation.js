// Import all the required modules.
const User = require('../models/userModel')

// Check if the details provided for signup are valid or not.
const signupValidation = async (request, response, next) => {
  try {
    let data =  request.body

    // Name is missing
    if (!data.name || data.name.trim() === "") {
      return response.status(400).send({
        error: "Name is a mandatory field."
      })
    }

    // User ID is missing
    if (!data.userId || data.userId.trim() === "") {
      return response.status(400).send({
        error: "User ID is a mandatory field."
      })
    }

    // Password is missing
    if (!data.password || data.password.trim() === "") {
      return response.status(400).send({
        error: "Password is a mandatory field."
      })
    }

    // Invalid user ID.
    const invalidUserID = validateID(data.userId)
    if (invalidUserID) {
      return response.status(400).send({
        error: invalidUserID.error
      })
    }

    // Invalid Password.
    const invalidPassword = validatePassword(data.password)
    if (invalidPassword) {
      return response.status(400).send({
        error: invalidPassword.error
      })
    }

    // A user exists with the same username.
    const existingUser = await User.findOne({ userId: data.userId })
    if (existingUser) {
      return response.status(400).send({
        error: "This user ID is already taken. Please try a new one."
      })
    }

    next()

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
}

// Helper function to check if an ID is valid or not.
const validateID = (id) => {
  const alphanumericPattern = /^[^a-zA-Z0-9]+$/
  if (alphanumericPattern.test(id)) {
    return {
      error: "The User ID must contain at least one alphanumeric character."
    }
  }

  const pattern = /^[a-zA-Z0-9_]+$/
  if (!pattern.test(id)) {
    return {
      error: "User ID must only contain alphanumeric characters and/or underscores(_)."
    }
  }
}

// Helper function to check if a password is valid or not.
const validatePassword = (password) => {
  if (password.length < 7) {
    return {
      error: "Password must contain at least 7 characters."
    }
  }

  const lowerCase = /[a-z]/
  if (!lowerCase.test(password)) {
    return {
      error: "Password must contain at least one lower case character."
    }
  }

  const upperCase = /[A-Z]/
  if (!upperCase.test(password)) {
    return {
      error: "Password must contain at least one upper case character."
    }
  }

  const number = /[0-9]/
  if (!number.test(password)) {
    return {
      error: "Password must contain at least one number."
    }
  }

  const specialCharacter = /[^a-zA-Z0-9]+/
  if (!specialCharacter.test(password)) {
    return {
      error: "Password must contain at least one special character."
    }
  }
}

module.exports = {
  signupValidation
}