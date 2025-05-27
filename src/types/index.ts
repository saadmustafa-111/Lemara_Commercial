"use client";

import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface CommercialListing {
  id: string;
  source: string;
  name: string;
  city: string;
  listPrice: string;
  createDate: string;
  reInc: string;
  documents: string;
  contacts: string;
  img: string;
  status: 'Active' | 'Inactive' | 'Sold' | 'Featured';
}
