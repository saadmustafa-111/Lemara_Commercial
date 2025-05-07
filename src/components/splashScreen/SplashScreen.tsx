'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Splash() {
  const router = useRouter();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [titleText, setTitleText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const fullTitle = 'Welcome To Zara Schools';
  
  useEffect(() => {
    // Animate the text typing effect independently
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullTitle.length) {
        setTitleText(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true); // Set typing as complete to trigger animation
      }
    }, 170); // Slower typing speed (150ms per character)

    // Animate loading progress separately
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1; // Increase by 1% each time (100 steps)
      });
    }, 50);

    // Navigate after animation completes
    const timer = setTimeout(() => {
      router.push('/signin'); 
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(typingInterval);
    };
  }, [router]);

  return (
    <div className='bg-gradient-to-br from-purple-950 via-purple-900 to-blue-950 h-screen flex flex-col items-center justify-center overflow-hidden'>
      {/* Animated circles in the background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#15eb9e]/20 blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#6a00b8]/20 blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-[#15eb9e]/10 blur-3xl animate-float-fast"></div>
      </div>
      
      <div className='text-center relative z-10'>
        {/* Typing animation text with custom styling and Google Font */}
        <h1 
          className={`text-white text-6xl font-bold mb-10 drop-shadow-lg relative font-poppins ${typingComplete ? 'text-animation-complete' : ''}`}
          style={{ letterSpacing: '0.5px' }}
        >
          <span className="inline-block">{titleText}</span>
          <span 
            className="inline-block w-1 h-14 bg-[#15eb9e] ml-1 absolute" 
            style={{ 
              animation: 'blink 1s step-end infinite',
              display: titleText.length === fullTitle.length ? 'none' : 'inline-block'
            }}
          ></span>
        </h1>
  
        
        <div className='relative mb-20'>
          {/* Logo container with enhanced effects */}
          <div className="relative mx-auto w-[350px] h-[350px]">
            {/* Outer glow effect */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#15eb9e]/40 to-[#6a00b8]/40 blur-xl" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
            
            {/* Inner glow ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#15eb9e] to-[#6a00b8] opacity-70 blur-md" style={{ animation: 'spin 8s linear infinite' }}></div>
            
            {/* White backdrop to make logo pop */}
            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"></div>
            
            {/* Logo with shadow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image 
                src="/images/logo/Zara_Z.png" 
                alt="Zara School Logo" 
                width={320} 
                height={320}
                className='relative z-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]'
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(21, 235, 158, 0.8)) drop-shadow(0 0 12px rgba(106, 0, 184, 0.8))',
                  animation: 'float 6s ease-in-out infinite alternate'
                }}
              />
            </div>
          </div>
          
          <div className='absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-80'>
            {/* Loading bar container */}
            <div className='h-4 w-full bg-white/20 backdrop-blur-sm rounded-full overflow-hidden shadow-lg border border-white/30'>
              {/* Loading progress */}
              <div 
                className='h-full bg-gradient-to-r from-[#15eb9e] to-[#6a00b8] rounded-full'
                style={{ 
                  width: `${loadingProgress}%`, 
                  transition: 'width 0.2s ease-out',
                  boxShadow: '0 0 10px rgba(21, 235, 158, 0.5), 0 0 20px rgba(106, 0, 184, 0.3)' 
                }}
              />
            </div>
            
            {/* Loading text with gradient */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#15eb9e]" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                <p className='text-white text-lg font-medium font-poppins'>
                  Loading...
                </p>
              </div>
              <p 
                className='text-xl font-bold font-poppins'
                style={{ 
                  backgroundImage: 'linear-gradient(to right, #15eb9e, #6a00b8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold'
                }} 
              >
                {loadingProgress}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}