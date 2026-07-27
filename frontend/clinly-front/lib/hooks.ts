"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = []
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;

    const run = async () => {
      if (!cancelled && mountedRef.current) {
        setState((prev) => ({ ...prev, loading: true, error: null }));
      }
      try {
        const result = await fetcher();
        if (!cancelled && mountedRef.current) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err: unknown) {
        if (!cancelled && mountedRef.current) {
          const message =
            err instanceof Error ? err.message : "Erro ao carregar dados.";
          setState({ data: null, loading: false, error: message });
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const refetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await fetcher();
      if (mountedRef.current) {
        setState({ data: result, loading: false, error: null });
      }
    } catch (err: unknown) {
      if (mountedRef.current) {
        const message =
          err instanceof Error ? err.message : "Erro ao carregar dados.";
        setState({ data: null, loading: false, error: message });
      }
    }
  }, [fetcher]);

  return { data: state.data, loading: state.loading, error: state.error, refetch };
}

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const queryRef = useRef(query);

  useEffect(() => {
    const media = window.matchMedia(queryRef.current);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return matches;
}
