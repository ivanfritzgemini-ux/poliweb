import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  
  // Create Supabase client with middleware helper
  const supabase = createMiddlewareClient({ req: request, res });
  
  // Check auth status
  const { data: { session } } = await supabase.auth.getSession();
  
  // Handle public routes
  const isLoginPage = pathname === '/login' || pathname === '/';
  const isPublicRoute = pathname.startsWith('/_next') || pathname.startsWith('/api/auth');
  
  if (isPublicRoute) {
    return res;
  }

  // Redirect root to login if not authenticated
  if (pathname === '/' && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect all other routes
  if (!session && !isLoginPage) {
    // Save original URL to redirect back after login
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If logged in and trying to access login page or root, redirect to appropriate dashboard
  if (session && isLoginPage) {
    // Redirect will be handled based on role
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If session exists but no profile cookie, fetch and store it
  const profile = request.cookies.get('user-profile')?.value;
  if (session && !profile) {
    try {
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('id, nombres, apellidos, email, role:roles(id, nombre_rol)')
        .eq('id', session.user.id)
        .single();

      if (userError) {
        // Clear session if profile cannot be found
        await supabase.auth.signOut();
        return NextResponse.redirect(new URL('/login', request.url));
      }

      if (userData) {
        // Store profile in HTTP-only cookie
        res.cookies.set('user-profile', JSON.stringify(userData), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60, // 1 week
        });

        // Check role-based access
        if (userData.role?.nombre_rol) {
          const role = userData.role.nombre_rol.toLowerCase();
          
          // Redirect to appropriate section based on role
          if (pathname === '/') {
            let redirectTo = '/';
            switch (role) {
              case 'admin':
                redirectTo = '/admin';
                break;
              case 'staff':
                redirectTo = '/staff';
                break;
              case 'estudiante':
                redirectTo = '/students';
                break;
            }
            if (redirectTo !== '/') {
              return NextResponse.redirect(new URL(redirectTo, request.url));
            }
          }

          // Prevent access to unauthorized sections
          if (
            (pathname.startsWith('/admin') && role !== 'admin') ||
            (pathname.startsWith('/staff') && !['admin', 'staff'].includes(role)) ||
            (pathname.startsWith('/students') && !['admin', 'staff', 'estudiante'].includes(role))
          ) {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  return res;
}

// Specify which routes should be protected by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};