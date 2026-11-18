import React from 'react';

export const IconActivity = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M1.83334 11H6.41668L9.16668 3.66666L12.8333 18.3333L15.5833 11H20.1667" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#168567"}/>
    </svg>
  );
};

export const IconBack = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M12.8333 4.58334L6.41663 11L12.8333 17.4167" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#172B4D"}/>
    </svg>
  );
};

export const IconBell = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M9.16668 19.25H12.8333M4.58334 15.5833H17.4167L15.5833 12.8333V8.24999C15.5833 7.03441 15.1005 5.86863 14.2409 5.00908C13.3814 4.14954 12.2156 3.66666 11 3.66666C9.78443 3.66666 8.61865 4.14954 7.7591 5.00908C6.89956 5.86863 6.41668 7.03441 6.41668 8.24999V12.8333L4.58334 15.5833Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#172B4D"}/>
    </svg>
  );
};

export const IconBook = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M11 4.58333V5.5M11 5.5V18.3333M11 18.3333C13.75 16.5 15.5833 15.5833 19.25 16.5V3.66667C15.5833 2.75 13.75 3.66667 11 5.5C8.25 3.66667 6.41667 2.75 2.75 3.66667V16.5C6.41667 15.5833 8.25 16.5 11 18.3333Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#8060C2"}/>
    </svg>
  );
};

export const IconCalendar = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M5.25 4.375H15.75C17.1997 4.375 18.375 5.55025 18.375 7V15.75C18.375 17.1997 17.1997 18.375 15.75 18.375H5.25C3.80025 18.375 2.625 17.1997 2.625 15.75V7C2.625 5.55025 3.80025 4.375 5.25 4.375Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#64748B"}/>
<path d="M6.125 2.625V6.125M14.875 2.625V6.125M2.625 9.625H18.375M7 13.125H8.75M12.25 13.125H14M7 15.75H8.75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#64748B"}/>
    </svg>
  );
};

export const IconCheck = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M3.75 9L6.75 12L14.25 4.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "white"}/>
    </svg>
  );
};

export const IconChevron = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M6.75 3.75L12 9L6.75 14.25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#172B4D"}/>
    </svg>
  );
};

export const IconClock = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#64748B"}/>
<path d="M10 5.83333V10L12.5 11.6667" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#64748B"}/>
    </svg>
  );
};

export const IconClose = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M5.5 5.5L11 11M11 11L16.5 16.5M11 11L5.5 16.5M11 11L16.5 5.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#64748B"}/>
    </svg>
  );
};

export const IconFlame = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M11.9166 2.75C13.75 8.25 18.3333 8.25 17.4166 13.75C17.4166 15.4518 16.7406 17.0839 15.5372 18.2873C14.3339 19.4906 12.7018 20.1667 11 20.1667C9.29817 20.1667 7.66607 19.4906 6.46271 18.2873C5.25935 17.0839 4.58331 15.4518 4.58331 13.75C4.58331 11 6.41665 8.25 8.24998 6.41667C8.24998 10.0833 10.0833 10.0833 10.0833 10.0833C10.0833 10.0833 12.8333 7.33333 11.9166 2.75Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#B86A13"}/>
    </svg>
  );
};

export const IconHome = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M3.9375 2.625H7.4375C8.16237 2.625 8.75 3.21263 8.75 3.9375V7.4375C8.75 8.16237 8.16237 8.75 7.4375 8.75H3.9375C3.21263 8.75 2.625 8.16237 2.625 7.4375V3.9375C2.625 3.21263 3.21263 2.625 3.9375 2.625Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#3B82F6"}/>
<path d="M13.5625 2.625H17.0625C17.7874 2.625 18.375 3.21263 18.375 3.9375V7.4375C18.375 8.16237 17.7874 8.75 17.0625 8.75H13.5625C12.8376 8.75 12.25 8.16237 12.25 7.4375V3.9375C12.25 3.21263 12.8376 2.625 13.5625 2.625Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#3B82F6"}/>
<path d="M3.9375 12.25H7.4375C8.16237 12.25 8.75 12.8376 8.75 13.5625V17.0625C8.75 17.7874 8.16237 18.375 7.4375 18.375H3.9375C3.21263 18.375 2.625 17.7874 2.625 17.0625V13.5625C2.625 12.8376 3.21263 12.25 3.9375 12.25Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#3B82F6"}/>
<path d="M13.5625 12.25H17.0625C17.7874 12.25 18.375 12.8376 18.375 13.5625V17.0625C18.375 17.7874 17.7874 18.375 17.0625 18.375H13.5625C12.8376 18.375 12.25 17.7874 12.25 17.0625V13.5625C12.25 12.8376 12.8376 12.25 13.5625 12.25Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#3B82F6"}/>
    </svg>
  );
};

export const IconLeaf = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M4.58331 17.4167C-0.916692 4.58333 11.9166 2.75 19.25 2.75C19.25 12.8333 17.4166 18.3333 7.33331 16.5M4.58331 19.25L15.5833 7.33333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#3B82F6"}/>
    </svg>
  );
};

export const IconMoon = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M18.3333 13.75C16.938 14.1186 15.4703 14.1147 14.077 13.7386C12.6836 13.3626 11.4133 12.6277 10.3928 11.6072C9.37227 10.5867 8.63733 9.31635 8.26132 7.92299C7.88532 6.52963 7.8814 5.06201 8.24997 3.66666C6.84741 4.03714 5.56733 4.77089 4.53882 5.79393C3.51032 6.81696 2.76975 8.09311 2.39179 9.49367C2.01384 10.8942 2.01188 12.3697 2.38609 13.7713C2.7603 15.1728 3.49747 16.451 4.52324 17.4767C5.54902 18.5025 6.82713 19.2397 8.2287 19.6139C9.63027 19.9881 11.1057 19.9861 12.5063 19.6082C13.9069 19.2302 15.183 18.4897 16.206 17.4611C17.2291 16.4326 17.9628 15.1526 18.3333 13.75Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#64748B"}/>
    </svg>
  );
};

export const IconMore = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M5.49996 11C5.49996 11.5063 5.08955 11.9167 4.58329 11.9167C4.07703 11.9167 3.66663 11.5063 3.66663 11C3.66663 10.4937 4.07703 10.0833 4.58329 10.0833C5.08955 10.0833 5.49996 10.4937 5.49996 11Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#172B4D"}/>
<path d="M11.9167 11C11.9167 11.5063 11.5063 11.9167 11 11.9167C10.4938 11.9167 10.0834 11.5063 10.0834 11C10.0834 10.4937 10.4938 10.0833 11 10.0833C11.5063 10.0833 11.9167 10.4937 11.9167 11Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#172B4D"}/>
<path d="M18.3333 11C18.3333 11.5063 17.9229 11.9167 17.4167 11.9167C16.9104 11.9167 16.5 11.5063 16.5 11C16.5 10.4937 16.9104 10.0833 17.4167 10.0833C17.9229 10.0833 18.3333 10.4937 18.3333 11Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#172B4D"}/>
    </svg>
  );
};

export const IconPause = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M6 3.75V14.25M12 3.75V14.25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#172B4D"}/>
    </svg>
  );
};

export const IconPlus = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M13 5.41666V13M13 13V20.5833M13 13H5.41669M13 13H20.5834" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "white"}/>
    </svg>
  );
};

export const IconSearch = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M14.1667 8.75001C14.1667 11.7416 11.7416 14.1667 8.75001 14.1667C5.75847 14.1667 3.33334 11.7416 3.33334 8.75001C3.33334 5.75847 5.75847 3.33334 8.75001 3.33334C11.7416 3.33334 14.1667 5.75847 14.1667 8.75001Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#64748B"}/>
<path d="M13.3333 13.3333L17.5 17.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#64748B"}/>
    </svg>
  );
};

export const IconSettings = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <path d="M8.75 2.625L7.875 5.25L5.25 6.125L2.625 8.75L4.375 11.375L3.5 14L6.125 15.75L8.75 14.875L11.375 18.375L14 16.625L14.875 14L18.375 11.375L16.625 8.75L14 7.875L13.125 5.25L8.75 2.625Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#64748B"}/>
<path d="M13.125 10.5C13.125 11.9497 11.9497 13.125 10.5 13.125C9.05025 13.125 7.875 11.9497 7.875 10.5C7.875 9.05025 9.05025 7.875 10.5 7.875C11.9497 7.875 13.125 9.05025 13.125 10.5Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#64748B"}/>
    </svg>
  );
};

export const IconSun = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      <g clip-path="url(#clip0_2_207)">
<path d="M14.6666 11C14.6666 13.025 13.025 14.6667 11 14.6667C8.97494 14.6667 7.33331 13.025 7.33331 11C7.33331 8.97496 8.97494 7.33333 11 7.33333C13.025 7.33333 14.6666 8.97496 14.6666 11Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#3B82F6"}/>
<path d="M11 1.83333V3.66667M11 18.3333V20.1667M1.83331 11H3.66665M18.3333 11H20.1666M4.58331 4.58333L5.95831 5.95833M16.0416 16.0417L17.4166 17.4167M4.58331 17.4167L5.95831 16.0417M16.0416 5.95833L17.4166 4.58333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color || "#3B82F6"}/>
</g>
<defs>
<clipPath id="clip0_2_207">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
    </svg>
  );
};

export const StatusBarIndicators = ({ className = "w-16 h-3 text-current" }) => (
  <div className={"flex items-center gap-1.5 " + className}>
    {/* Cellular */}
    <svg className="w-4 h-3" viewBox="0 0 17 11" fill="currentColor">
      <rect x="0" y="8" width="3" height="3" rx="0.5"/>
      <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.5"/>
      <rect x="9" y="3" width="3" height="8" rx="0.5"/>
      <rect x="13.5" y="0.5" width="3" height="10.5" rx="0.5"/>
    </svg>
    {/* Wifi */}
    <svg className="w-4 h-3" viewBox="0 0 16 12" fill="currentColor">
      <path d="M8 10.5C8.41421 10.5 8.75 10.1642 8.75 9.75C8.75 9.33579 8.41421 9 8 9C7.58579 9 7.25 9.33579 7.25 9.75C7.25 10.1642 7.58579 10.5 8 10.5Z"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.75736 5.50736C6.10051 3.16421 9.89949 3.16421 12.2426 5.50736L13.3033 4.4467C10.3744 1.51777 5.62563 1.51777 2.6967 4.4467L3.75736 5.50736Z"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.87868 7.62868C7.05025 6.45711 8.94975 6.45711 10.1213 7.62868L11.182 6.56802C9.42462 4.81066 6.57538 4.81066 4.81802 6.56802L5.87868 7.62868Z"/>
    </svg>
    {/* Battery */}
    <svg className="w-6 h-3" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor"/>
      <rect x="2" y="2" width="14" height="8" rx="2" fill="currentColor"/>
      <path d="M23 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </div>
);
