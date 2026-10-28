import { useEffect, useState } from 'react';
import { fetchPokemonDetail } from '../api/pokeApi';

// Loads one Pokémon every time `idOrName` changes (or when the user taps "Reintentar").
export default function usePokemonDetail(idOrName) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0); // changing it re-runs the effect

  // CONCEPT: useEffect dependency array — the request runs only when the search term
  // or the retry counter changes, not on every render.
  useEffect(() => {
    let cancelled = false; // ignore the answer if the user already left the screen

    async function load() {
      setLoading(true);
      setError(null);
      setPokemon(null);
      try {
        const data = await fetchPokemonDetail(idOrName);
        if (!cancelled) setPokemon(data);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [idOrName, attempt]);

  return {
    pokemon,
    loading,
    error,
    notFound: error?.code === 'NOT_FOUND',
    retry: () => setAttempt((value) => value + 1),
  };
}
