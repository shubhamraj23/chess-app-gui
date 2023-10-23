const user1 = {
  name: "Shubham Raj Pandit",
  userId: "jali_batti",
  password: "sgdhG!23"
}

const user2 = {
  name: "Here There",
  userId: "abd23",
  password: "sgdhG!23"
}

const user3 = {
  name: "Go Somewhere",
  userId: "gdsiw",
  password: "sgdhG!23"
}

const missing1 = {
  userId: "srp23",
  password: "Shub"
}

const missing2 = {
  name: "Shubham Raj Pandit",
  password: "Shub"
}

const missing3 = {
  name: "Shubham Raj Pandit",
  userId: "srp23"
}

const missing4 = {
  userId: "srp23",
  password: ""
}

const missing5 = {
  name: "",
  password: "Shub"
}

const missing6 = {
  userId: ""
}

const dummy1 = {
  name: "Shubham Raj Pandit",
  userId: "abcd123",
  password: "sgdhG!23"
}

const dummy2 = {
  name: "Here There",
  userId: "zxcf455",
  password: "sgdhG!23"
}

const dummy3 = {
  name: "Go Somewhere",
  userId: "zse456",
  password: "sgdhG!23"
}


const duplicate1 = {
  name: "Shubham Raj Pandit",
  userId: "abcd123",
  password: "sgdhG!23"
}

const duplicate2 = {
  name: "There",
  userId: "zxcf455",
  password: "sssgdhG!23"
}

const duplicate3 = {
  name: "Go Somewhere Else",
  userId: "zse456",
  password: "sgdhG!23"
}

const invalidUser1 = {
  name: "Shubham Raj Pandit",
  userId: "asf#",
  password: "sgdhG!23"
}

const invalidUser2 = {
  name: "There",
  userId: "__#",
  password: "sssgdhG!23"
}

const invalidUser3 = {
  name: "Go Somewhere Else",
  userId: "asf_#",
  password: "sgdhG!23"
}

const invalidUserOutput1 = "Username must only contain alphanumeric characters and/or underscores(_)."
const invalidUserOutput2 = "The username must contain at least one alphanumeric character."
const invalidUserOutput3 = "Username must only contain alphanumeric characters and/or underscores(_)."

const invalidPassword1 = {
  name: "Shubham Raj Pandit",
  userId: "jali_batti",
  password: "sS9#"
}

const invalidPassword2 = {
  name: "Shubham Raj Pandit",
  userId: "jali_batti",
  password: "S53GKE9#"
}

const invalidPassword3 = {
  name: "Shubham Raj Pandit",
  userId: "jali_batti",
  password: "stue9_9#"
}

const invalidPassword4 = {
  name: "Shubham Raj Pandit",
  userId: "jali_batti",
  password: "sSsmU)#"
}

const invalidPassword5 = {
  name: "Shubham Raj Pandit",
  userId: "jali_batti",
  password: "sS9S78df"
}

const invalidPasswordOutput1 = "Password must contain at least 7 characters."
const invalidPasswordOutput2 = "Password must contain at least one lower case character."
const invalidPasswordOutput3 = "Password must contain at least one upper case character."
const invalidPasswordOutput4 = "Password must contain at least one number."
const invalidPasswordOutput5 = "Password must contain at least one special character."

module.exports = {
  user1, user2, user3,
  missing1, missing2, missing3, missing4, missing5, missing6,
  dummy1, dummy2, dummy3, duplicate1, duplicate2, duplicate3,
  invalidUser1, invalidUser2, invalidUser3, invalidUserOutput1, invalidUserOutput2, invalidUserOutput3,
  invalidPassword1, invalidPassword2, invalidPassword3, invalidPassword4, invalidPassword5,
  invalidPasswordOutput1, invalidPasswordOutput2, invalidPasswordOutput3, invalidPasswordOutput4, invalidPasswordOutput5
}