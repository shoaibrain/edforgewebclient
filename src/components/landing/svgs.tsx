import React from "react";

export const GridPattern = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
            >
                <path
                    d="M0 40L40 0H20L0 20M40 40V20L20 40"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.1"
                />
            </pattern>
            <pattern
                id="small-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
            >
                <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    opacity="0.1"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#small-grid)" />
    </svg>
);

export const DotPattern = ({ className }: { className?: string }) => (
    <svg className={className} width="100%" height="100%">
        <defs>
            <pattern
                id="dot-pattern"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
            >
                <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
);

export const MultiTenantIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 4v16" />
        <path d="M15 4v16" />
        <path d="M4 12h16" />
    </svg>
);

export const CloudIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19" />
        <path d="M12 13.5V4.5" />
        <path d="M12 4.5L15.5 8" />
        <path d="M12 4.5L8.5 8" />
    </svg>
);

export const DataIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
    </svg>
);

export const SecurityIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

export const GlobalIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);
