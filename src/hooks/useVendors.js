// useState for data/loading/error. useEffect to fire the fetch on mount.
import { useState, useEffect } from 'react';

// Custom hook: fetch /api/vendors.json and expose { vendors, loading, error, reload }
export function useVendors() {
  const [vendors, setVendors] = useState([]);       // the vendor array
  const [loading, setLoading] = useState(true);     // true while fetching
  const [error, setError] = useState(null);         // null=OK, string=failed
  const [reloadKey, setReloadKey] = useState(0);    // bump → re-run effect

  // Runs on mount and whenever reloadKey changes
  useEffect(() => {
    // AbortController lets us cancel the fetch if the component unmounts
    const controller = new AbortController();
    setLoading(true);
    setError(null);

      fetch('/api/vendors.json', { signal: controller.signal })      .then((res) => {
        // Non-2xx → treat as an error
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVendors(data);                            // success
      })
      .catch((err) => {
        // Ignore AbortError - it's not a real failure
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => {
        // Only flip loading off if not aborted
        if (!controller.signal.aborted) setLoading(false);
      });

    // Cleanup: cancel the request on unmount
    return () => controller.abort();
  }, [reloadKey]); // dependency

  // Exposed retry function - increments reloadKey
  const reload = () => setReloadKey((k) => k + 1);

  return { vendors, loading, error, reload };
}

// ============================================================
// SUMMARY
// ============================================================
// Fetches vendors.json once, tracks loading/error, and gives a
// reload() function so the UI can retry after a failure.
// Usage: const { vendors, loading, error, reload } = useVendors();
// Think of it as the waiter who fetches the menu from the kitchen.
// ============================================================