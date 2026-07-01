export function createAuthService(database) {
  return {
    getStatus() {
      const schema = database.getSchema();

      return {
        provider: "local-session",
        ready: Array.isArray(schema.users),
        sessionRequired: true,
      };
    },
  };
}
