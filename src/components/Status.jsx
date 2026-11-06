// Two tiny reusable components for loading / error states.

// Shown while a fetch is in progress
export function Loading() {
  // role="status" tells screen readers this is a live update
  return <p className="muted" role="status">Loading menus…</p>;
}

// Shown when a fetch fails - receives message + retry callback
export function ErrorMessage({ message, onRetry }) {
  return (
    // role="alert" → screen readers announce it
    <div className="card error" role="alert">
      <p>Could not load menus: {message}</p>
      {/* Calls the parent's reload when clicked */}
      <button className="btn" onClick={onRetry}>Try again</button>
    </div>
  );
}

// ============================================================
// SUMMARY
// ============================================================
// Two small pre-built components used by pages that fetch data:
//   <Loading />            → "Loading menus…" text
//   <ErrorMessage message onRetry /> → red box + Try again button
// Think of them as pre-made "wait" and "oops" signs.
// ============================================================