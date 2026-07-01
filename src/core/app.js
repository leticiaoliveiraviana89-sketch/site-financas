export function createApp({ auth, database, environment, root }) {
  if (!root) {
    throw new Error("Application root was not found.");
  }

  return {
    mount(renderer) {
      root.innerHTML = renderer({
        authStatus: auth.getStatus(),
        databaseStatus: database.healthCheck(),
        environment,
      });
    },
  };
}
