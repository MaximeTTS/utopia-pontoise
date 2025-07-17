// Simple in-memory cache that resets each day
function getNextMidnightTimestamp(): number {
  const now = new Date();
  // On crée une date à 00:00:00 du jour suivant
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  return tomorrow.getTime();
}

interface CacheEntry<T> {
  expiresAt: number; // timestamp ms où le cache devient invalide
  data: T;
}

// Cache en mémoire (perd ses données au refresh complet de la page)
const memoryCache: Record<string, CacheEntry<any>> = {};

/**
 * Récupère la donnée en cache ou la recharge via fetcher,
 * et fait expirer chaque entrée à minuit.
 *
 * @template T
 * @param cacheKey
 * @param fetcher Fonction async retournant Promise<T>
 * @returns Promise<T>
 */
export async function fetchWithCache<T>(cacheKey: string, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();

  // 1️⃣ Vérification du cache en mémoire
  const memEntry = memoryCache[cacheKey] as CacheEntry<T> | undefined;
  if (memEntry && now < memEntry.expiresAt) {
    return memEntry.data;
  }

  // 2️⃣ Vérification du cache dans localStorage
  const raw = localStorage.getItem(cacheKey);
  if (raw) {
    try {
      const stored: CacheEntry<T> = JSON.parse(raw);
      if (now < stored.expiresAt) {
        // on alimente la mémoire pour le prochain appel
        memoryCache[cacheKey] = stored;
        return stored.data;
      }
      // sinon, c'est expiré → on passera au fetch
    } catch {
      // parse KO → on ignore
    }
  }

  // 3️⃣ Pas de cache valide → on appelle la fetcher
  const freshData = await fetcher();

  // 4️⃣ On calcule l'expiration à minuit et on stocke
  const expiresAt = getNextMidnightTimestamp();
  const entry: CacheEntry<T> = { expiresAt, data: freshData };
  memoryCache[cacheKey] = entry;

  try {
    localStorage.setItem(cacheKey, JSON.stringify(entry));
  } catch {
    // localStorage peut être plein ou indisponible, on ne bloque pas
  }

  return freshData;
}
