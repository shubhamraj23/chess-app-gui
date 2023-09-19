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
  userId: "zxcf45",
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
  userId: "zxcf45",
  password: "sssgdhG!23"
}

const duplicate3 = {
  name: "Go Somewhere Else",
  userId: "zse456",
  password: "sgdhG!23"
}

module.exports = {
  user1, user2, user3,
  missing1, missing2, missing3, missing4, missing5, missing6,
  dummy1, dummy2, dummy3, duplicate1, duplicate2, duplicate3
}