const fallbackEnvironment = {
  appName: "Finance",
  appEnvironment: "development",
  storageKey: "finance-dev-db",
  authSessionKey: "finance-dev-session",
  deployTarget: "GitHub Pages",
};

export function loadEnvironment() {
  const runtimeEnvironment = window.FINANCE_ENV ?? {};

  return {
    ...fallbackEnvironment,
    ...runtimeEnvironment,
  };
}
