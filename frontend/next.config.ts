import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes";

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'map'],
  
  images: {
    domains: ['barber_booking_app.local'], // <- OVO JE KLJUČNO
  },
  
   async rewrites(): Promise<Rewrite[]> {
    return [
      {

        source: "/api/:path*", // kad zoveš /api/neki-fajl.php
        destination: "http://barber_booking_app.local/api/:path*", // pravi PHP backend URL
      },
    ];
  },
  /* config options here */
  
};

export default nextConfig;
