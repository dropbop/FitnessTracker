import { CSSProperties } from 'react';

interface IconProps {
  className?: string;
  style?: CSSProperties;
}

export function LiftingIcon({ className = "", style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      {/* Outer plates */}
      <rect x="1" y="9" width="3.5" height="6" rx="0.5" />
      <rect x="19.5" y="9" width="3.5" height="6" rx="0.5" />
      {/* Inner plates */}
      <rect x="3.5" y="7" width="3" height="10" rx="0.5" />
      <rect x="17.5" y="7" width="3" height="10" rx="0.5" />
      {/* Center bar */}
      <rect x="6" y="10.5" width="12" height="3" rx="0.5" />
    </svg>
  );
}

export function CardioIcon({ className = "", style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      <circle cx="11.5" cy="4" r="2.5" />
      <path d="M9.5 7H13.5L13 14H10L9.5 7Z" />
      <path d="M10.5 13L5.5 21L8.5 22L12.5 15Z" />
      <path d="M12.5 13L18 18L20 16L14.5 12Z" />
      <path d="M10 8L5 12L7 14L11 10Z" />
      <path d="M13 8L17 5L18.5 7.5L14 10Z" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "", style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      <path d="M15 6L9 12L15 18" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "", style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      <path d="M9 6L15 12L9 18" />
    </svg>
  );
}

export function CloseIcon({ className = "", style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      <path d="M6 6L18 18M6 18L18 6" />
    </svg>
  );
}

export function EditIcon({ className = "", style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      <path d="M16.5 3.5L20.5 7.5L7.5 20.5H3.5V16.5L16.5 3.5Z" />
    </svg>
  );
}

export function DeleteIcon({ className = "", style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      <path d="M6 6H18V20H6V6Z" />
      <path d="M4 6H20V4H4V6Z" />
      <path d="M9 4V2H15V4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function PlusIcon({ className = "", style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      <path d="M12 5V19M5 12H19" />
    </svg>
  );
}
