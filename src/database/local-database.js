const initialSchema = {
  budgets: [],
  goals: [],
  metadata: {
    createdAt: new Date().toISOString(),
    schemaVersion: 1,
  },
  transactions: [],
  users: [],
};

export function createLocalDatabase(storageKey) {
  function ensureDatabase() {
    const storedValue = window.localStorage.getItem(storageKey);

    if (storedValue) {
      return JSON.parse(storedValue);
    }

    window.localStorage.setItem(storageKey, JSON.stringify(initialSchema));
    return initialSchema;
  }

  return {
    getSchema() {
      return ensureDatabase();
    },
    healthCheck() {
      const schema = ensureDatabase();

      return {
        connected: Boolean(schema.metadata?.schemaVersion),
        engine: "localStorage",
        schemaVersion: schema.metadata?.schemaVersion ?? 0,
        storageKey,
      };
    },
  };
}
