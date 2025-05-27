"use client";

import './styles.css';
import { LayoutProps } from "../../../../../types";

export default function CommercialListingsLayout({ children }: LayoutProps) {
  return (
    <div className="commercial-listings-layout">
      {children}
    </div>
  );
}
