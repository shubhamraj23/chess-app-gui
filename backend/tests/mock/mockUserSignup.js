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

module.exports = {
  user1, user2, user3,
  missing1, missing2, missing3, missing4, missing5, missing6
}