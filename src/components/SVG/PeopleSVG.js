import React from 'react';

export default function PeopleSVG() {

return (
<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>icon-user</title>
    <defs>
        <rect id="path-1" x="0" y="0" width="390" height="296" rx="2"></rect>
        <filter x="-1.4%" y="-1.2%" width="102.8%" height="103.7%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.108695652 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
    </defs>
    <g id="Design" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="01-1-1-Dashboard" transform="translate(-156.000000, -475.000000)">
            <g id="01" transform="translate(120.000000, 232.000000)">
                <g id="Rectangle-4">
                    <use fill="black" fillOpacity="1" filter="url(#filter-2)"></use>
                    <use fill="#FFFFFF" fillRule="evenodd"></use>
                </g>
                <g id="icon-user" transform="translate(32.000000, 239.000000)">
                    <polygon id="Stroke-1" strokeOpacity="0.00784313771" stroke="#000000" strokeWidth="1.33333335e-11" points="0 0 23.9999985 0 23.9999985 23.9999985 0 23.9999985"></polygon>
                    <path d="M11.9999993,11.9999993 C14.2099991,11.9999993 15.999999,10.2099994 15.999999,7.99999952 C15.999999,5.78999961 14.2099991,3.99999976 11.9999993,3.99999976 C9.78999937,3.99999976 7.99999952,5.78999961 7.99999952,7.99999952 C7.99999952,10.2099994 9.78999937,11.9999993 11.9999993,11.9999993 Z M11.9999993,13.9999992 C9.32999936,13.9999992 3.99999976,15.3399992 3.99999976,17.9999989 L3.99999976,19.9999988 L19.9999988,19.9999988 L19.9999988,17.9999989 C19.9999988,15.3399992 14.6699991,13.9999992 11.9999993,13.9999992 Z" id="Fill-2" fill="#949EA8"></path>
                </g>
            </g>
        </g>
    </g>
</svg>
)
}