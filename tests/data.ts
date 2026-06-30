const users = [
  { name: "Ana",  role: "admin"  },
  { name: "Luis", role: "viewer" },
  { name: "Mia",  role: "admin"  },
];

const admins = users.find(u => u.role === "admin");

console.log(admins);