// Helper générique : mémoire + localStorage

export async function fetchWithCache<T>(storageKey: string, fetcher: () => Promise<T>): Promise<T> {
  // 1) Mémoire
  const inMemory = (window as any)[storageKey] as T | undefined;
  if (inMemory) return inMemory;

  // 2) localStorage
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved) as T;
      (window as any)[storageKey] = parsed;
      return parsed;
    }
  } catch {
    /* ignore */
  }

  // 3) Réseau
  const data = await fetcher();
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch {
    /* ignore */
  }
  (window as any)[storageKey] = data;
  return data;
}
