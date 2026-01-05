export function LiftingIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em' }}
    >
      {/* Dumbbell icon - bold, chunky style */}
      <rect x="1" y="9" width="4" height="6" rx="0.5" />
      <rect x="19" y="9" width="4" height="6" rx="0.5" />
      <rect x="3" y="7" width="3" height="10" rx="0.5" />
      <rect x="18" y="7" width="3" height="10" rx="0.5" />
      <rect x="6" y="10.5" width="12" height="3" rx="0.5" />
    </svg>
  );
}

export function CardioIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em' }}
    >
      {/* Running figure - bold, chunky style */}
      <circle cx="14" cy="4" r="2.5" />
      <path
        d="M9 8.5L12 7L15 9L18 7.5L19.5 9L17 11L14 20H11L12.5 14L9 12L6 15L4 13.5L7 10L9 8.5Z"
        strokeWidth="0"
      />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      className={className}
      style={{ width: '1em', height: '1em' }}
    >
      <path d="M15 6L9 12L15 18" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      className={className}
      style={{ width: '1em', height: '1em' }}
    >
      <path d="M9 6L15 12L9 18" />
    </svg>
  );
}

export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      className={className}
      style={{ width: '1em', height: '1em' }}
    >
      <path d="M6 6L18 18M6 18L18 6" />
    </svg>
  );
}

export function EditIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em' }}
    >
      <path d="M16.5 3.5L20.5 7.5L7.5 20.5H3.5V16.5L16.5 3.5Z" />
    </svg>
  );
}

export function DeleteIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em' }}
    >
      <path d="M6 6H18V20H6V6Z" />
      <path d="M4 6H20V4H4V6Z" />
      <path d="M9 4V2H15V4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      className={className}
      style={{ width: '1em', height: '1em' }}
    >
      <path d="M12 5V19M5 12H19" />
    </svg>
  );
}
