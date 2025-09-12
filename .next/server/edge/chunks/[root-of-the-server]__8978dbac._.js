(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__8978dbac._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$nextjs$2f$dist$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/auth-helpers-nextjs/dist/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
;
async function middleware(request) {
    const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    const pathname = request.nextUrl.pathname;
    // Create Supabase client with middleware helper
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$nextjs$2f$dist$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createMiddlewareClient"])({
        req: request,
        res
    });
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', request.url));
    }
    // Protect all other routes
    if (!session && !isLoginPage) {
        // Save original URL to redirect back after login
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('next', pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
    }
    // If logged in and trying to access login page or root, redirect to appropriate dashboard
    if (session && isLoginPage) {
        // Redirect will be handled based on role
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/dashboard', request.url));
    }
    // If session exists but no profile cookie, fetch and store it
    const profile = request.cookies.get('user-profile')?.value;
    if (session && !profile) {
        try {
            const { data: userData, error: userError } = await supabase.from('usuarios').select('id, nombres, apellidos, email, role:roles(id, nombre_rol)').eq('id', session.user.id).single();
            if (userError) {
                // Clear session if profile cannot be found
                await supabase.auth.signOut();
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', request.url));
            }
            if (userData) {
                // Store profile in HTTP-only cookie
                res.cookies.set('user-profile', JSON.stringify(userData), {
                    httpOnly: true,
                    secure: ("TURBOPACK compile-time value", "development") === 'production',
                    sameSite: 'lax',
                    maxAge: 7 * 24 * 60 * 60
                });
                // Check role-based access
                if (userData.role?.nombre_rol) {
                    const role = userData.role.nombre_rol.toLowerCase();
                    // Redirect to appropriate section based on role
                    if (pathname === '/') {
                        let redirectTo = '/';
                        switch(role){
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
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(redirectTo, request.url));
                        }
                    }
                    // Prevent access to unauthorized sections
                    if (pathname.startsWith('/admin') && role !== 'admin' || pathname.startsWith('/staff') && ![
                        'admin',
                        'staff'
                    ].includes(role) || pathname.startsWith('/students') && ![
                        'admin',
                        'staff',
                        'estudiante'
                    ].includes(role)) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/unauthorized', request.url));
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
    return res;
}
const config = {
    matcher: [
        /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */ '/((?!_next/static|_next/image|favicon.ico|public).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__8978dbac._.js.map