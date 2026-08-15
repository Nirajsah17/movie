export default function HorizontalLoader(){
  return (
    <svg className="h-1 w-full" viewBox="0 0 100 4" preserveAspectRatio="none">
      <defs>
        <linearGradient id="loader" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="transparent" />
          <animate attributeName="x1" values="-100%;100%" dur="1.2s" repeatCount="indefinite"/>
          <animate attributeName="x2" values="0%;200%" dur="1.2s" repeatCount="indefinite"/>
        </linearGradient>
      </defs>
      <rect width="100" height="4" fill="#262626" rx="2" />
      <rect width="100" height="4" fill="url(#loader)" rx="2" />
    </svg>
  )
}