/** Wrapper for client pages inside the mobile scroll area — avoids clipped content */
export default function PageShell({ children, className = '' }) {
  return (
    <div className={`w-full min-h-full flex-shrink-0 pb-8 ${className}`}>
      {children}
    </div>
  );
}
