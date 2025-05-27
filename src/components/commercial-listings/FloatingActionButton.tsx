"use client";

import { Plus } from 'lucide-react';
import Link from 'next/link';

interface FloatingActionButtonProps {
  href: string;
  label?: string;
}

export default function FloatingActionButton({ href, label = "Add New" }: FloatingActionButtonProps) {
  return (
    <Link 
      href={href}
      className="fixed bottom-8 right-8 z-40 group flex items-center gap-2 bg-[#00a0d1] hover:bg-[#0088b3] text-white py-3 px-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
      title={label}
    >
      <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
      <span className="font-medium transition-opacity duration-300">{label}</span>
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full overflow-hidden">
        <span className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-full" />
      </span>
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse opacity-30" />
    </Link>
  );
}
