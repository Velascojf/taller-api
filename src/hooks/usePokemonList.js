import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchPokemonPage, PAGE_SIZE } from '../api/pokeApi';

// Owns the state of the infinite list: items, loading flags, error and pagination.
export default function usePokemonList() {
  // CONCEPT: useState — one piece of state per UI state (loading / error / success)
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true); // first page
  const [loadingMore, setLoadingMore] = useState(false); // next pages
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Refs guard against onEndReached firing twice while a request is still running.
  const offsetRef = useRef(0);
  const busyRef = useRef(false);
  const hasMoreRef = useRef(true);

  const loadMore = useCallback(async () => {
    if (busyRef.current || !hasMoreRef.current) return;
    busyRef.current = true;

    const isFirstPage = offsetRef.current === 0;
    if (isFirstPage) setLoading(true);
    else setLoadingMore(true);
    setError(null);

    try {
      const page = await fetchPokemonPage(offsetRef.current);
      setPokemon((previous) => [...previous, ...page.items]);
      offsetRef.current += PAGE_SIZE;
      hasMoreRef.current = page.hasMore;
      setHasMore(page.hasMore);
    } catch (err) {
      setError(err);
    } finally {
      busyRef.current = false;
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // CONCEPT: useEffect dependency array — `loadMore` is stable (useCallback with []),
  // so this runs once when the screen opens and never loops.
  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return { pokemon, loading, loadingMore, error, hasMore, loadMore };
}
