
//console.log("=== Middleware loaded ==="); // Dodaj ovo

import { NextRequest, NextResponse } from 'next/server';



export function middleware(req: NextRequest) {
    // throw new Error("Middleware je pokrenut!"); // Test
  const token = req.cookies.get('token')?.value;
   console.log('Middleware triggered. Token:', token);

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/login/dashboard/:path*', '/login/dashboard'],
};

/*

console.log("✅ middleware.ts LOADED");



export function middleware(req: NextRequest) {
  console.log('🔥 Middleware executed on:', req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/login/:path*', '/login'],
};
*/
/*
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Ako neko pokuša da uđe na dashboard
  if (req.nextUrl.pathname === '/login/dashboard') {
    url.pathname = '/test-redirect';
    return NextResponse.redirect(url); // PREUSMERI
  }

  return NextResponse.next(); // inače pusti normalno
}

export const config = {
  matcher: ['/login/:path*', '/login'], // matcher koji pokreće middleware
};
*/
/*
throw new Error("Middleware test error");



export function middleware(req: NextRequest) {
  // Za test, umesto console.log, vraćamo JSON odgovor
  return NextResponse.json({ message: "Middleware radi!", pathname: req.nextUrl.pathname });
}
*/
