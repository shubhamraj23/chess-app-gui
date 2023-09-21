const user1 = {
  name: "Shubham Raj Pandit",
  userId: "ji_batti",
  password: "s_gdhG!23"
}

const user2 = {
  name: "Here There",
  userId: "abd_23",
  password: "sg_dhG!23"
}

const user3 = {
  name: "Go Somewhere",
  userId: "gdsi34w",
  password: "sgd_hG!23"
}

const validUser1 = {
  userId: "ji_batti",
  password: "s_gdhG!23"
}

const validUser2 = {
  userId: "abd_23",
  password: "sg_dhG!23"
}

const validUser3 = {
  userId: "gdsi34w",
  password: "sgd_hG!23"
}

const missing1 = {
  userId: "srp23"
}

const missing2 = {
  password: "Shub"
}

const missing3 = {
  userId: "srp23",
  password: ""
}

const missing4 = {
  userId: "",
  password: "Shub"
}

const missing5 = {
  userId: "",
  password: "Shub"
}

const dummy1 = {
  name: "Shubham Raj Pandit",
  userId: "ji_batti23",
  password: "s_gdhG!23"
}

const dummy2 = {
  name: "Here There",
  userId: "abcfd_23",
  password: "sg_dhG!23"
}

const dummy3 = {
  name: "Go Somewhere",
  userId: "gds__i34w",
  password: "sgd_hG!23"
}

const invalidUser1 = {
  userId: "ji_batti3",
  password: "s_gdG!23"
}

const invalidUser2 = {
  userId: "abcfd_23",
  password: "s_gdhG!23"
}

const invalidUser3 = {
  userId: "gds__i34",
  password: "sgd_hG!23"
}

module.exports = {
  user1, user2, user3,
  validUser1, validUser2, validUser3,
  missing1, missing2, missing3, missing4, missing5,
  dummy1, dummy2, dummy3,
  invalidUser1, invalidUser2, invalidUser3
}