import { lucia } from "@/lib/lucia";
import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";

// Middleware function to handle user authentication
export default async function middleware(c: Context, next: Next) {
  // Get the session ID from the cookie
  const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;

  // If there's no session ID, set user and session to null and continue
  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  // Validate the session using the session ID
  const { session, user } = await lucia.validateSession(sessionId);

  // If the session is valid and fresh, set a new session cookie
  if (session && session.fresh) {
    // Use `header()` instead of `setCookie()` to avoid TypeScript errors
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });
  }

  // If the session is invalid, set a blank session cookie
  if (!session) {
    c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
      append: true,
    });
  }

  // Set the user and session in the context
  c.set("user", user);
  c.set("session", session);

  // Continue to the next middleware or route handler
  return next();
}
