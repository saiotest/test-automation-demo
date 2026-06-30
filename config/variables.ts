process.loadEnvFile();

const {
  DOJO_USER_MEMBER_EMAIL,
  DOJO_USER_MEMBER_PASSWORD,
  DOJO_USER_ADMIN_EMAIL,
  DOJO_USER_ADMIN_PASSWORD,
  USER_ROLE,
} = process.env;

if (!DOJO_USER_MEMBER_EMAIL || !DOJO_USER_MEMBER_PASSWORD) {
  console.error(
    "Error: Missing required environment variables. Please check your .env file.",
  );
  process.exit(1);
}

if (!DOJO_USER_ADMIN_EMAIL || !DOJO_USER_ADMIN_PASSWORD) {
  console.error(
    "Error: Missing required environment variables. Please check your .env file.",
  );
  process.exit(1);
}

const role = USER_ROLE || "member";

const users = {
  member: {
    email: DOJO_USER_MEMBER_EMAIL,
    password: DOJO_USER_MEMBER_PASSWORD,
  },
  admin: {
    email: DOJO_USER_ADMIN_EMAIL,
    password: DOJO_USER_ADMIN_PASSWORD,
  },
};

const urls = {
  local: "http://localhost:3000",
  staging: "https://dojo.upexgalaxy.com",
  production: "https://dojo.upexgalaxy.com", // OJO es solo por motivos educativos.
};

const environment = process.env.TEST_ENV ?? "staging";

const selectedEnv = urls[environment as keyof typeof urls];

const selectedUser = users[role as keyof typeof users];

const variables = {
  selectedUser,
  baseUrl: selectedEnv,
};

export default variables;
