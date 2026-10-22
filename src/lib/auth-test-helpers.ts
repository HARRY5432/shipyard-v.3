// Test user credentials for development
export const TEST_USERS = {
  admin: {
    email: "admin@shipyards.dev",
    password: "AdminPass123!"
  },
  user: {
    email: "user@shipyards.dev",
    password: "UserPass123!"
  },
  demo: {
    email: "demo@shipyards.dev",
    password: "DemoPass123!"
  }
};

export const getTestUser = (role: "admin" | "user" | "demo") => TEST_USERS[role];
