"use client";

export interface IPhoneFrameProps {
  hideBackground?: boolean;
  videoSrc?: string;
  imageSrc?: string;
  poster?: string;
  children?: React.ReactNode;
}

export function IPhoneFrame({ 
  hideBackground = false,
  videoSrc,
  imageSrc,
  poster,
  children
}: IPhoneFrameProps) {
  return (
    <div className="relative w-[180px] h-auto sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px] 2xl:w-[360px]">
      {/* Media Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full" style={{ paddingTop: '210.57%' }}>
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              clipPath: 'inset(0.1% 0.1% 0.1% 0.1% round 15.7% / 7.5%)',
            }}
          >
            {children ? (
              children
            ) : videoSrc ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={poster}
                className="absolute top-0 left-0 w-full h-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : imageSrc ? (
              <img
                src={imageSrc}
                alt="iPhone screen content"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            ) : null}
          </div>
        </div>
      </div>
      
      {/* iPhone Frame SVG */}
      <svg
        width="369"
        height="777"
        viewBox="0 0 369 777"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-auto"
      >
          <g clipPath="url(#clip0_4202_99)">
            {!hideBackground && <rect width="369" height="777" rx="58" fill="transparent" />}
            <g>
              <rect
                x="2"
                y="2"
                width="365"
                height="773"
                rx="56"
                stroke="url(#paint0_radial_4202_99)"
                strokeWidth="4"
              />
            </g>
          </g>
          <defs>
            <radialGradient
              id="paint0_radial_4202_99"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(184.965 179.272) rotate(90) scale(318.289 352.568)"
            >
              <stop stopColor="#879194" />
              <stop offset="1" />
            </radialGradient>
            <clipPath id="clip0_4202_99">
              <rect width="369" height="777" rx="58" fill="white" />
            </clipPath>
          </defs>
      </svg>
    </div>
  );
}
