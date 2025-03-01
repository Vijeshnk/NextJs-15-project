// Example with potential XSS vulnerability
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { useRouter } from 'next/router';

// XSS vulnerability - directly inserting query parameters into DOM
function UnsafePage() {
  const router = useRouter();
  const { message } = router.query;
  
  return (
    <div dangerouslySetInnerHTML={{ __html: message }}></div>
  );
}

// API key leak vulnerability - hardcoded credentials
const GITHUB_CLIENT_ID = "actual-client-id-12345";
const GITHUB_CLIENT_SECRET = "actual-secret-67890";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    })
  ],
});

// Eval usage vulnerability
function dynamicCodeExecution(userCode) {
  return eval(userCode); // Never use eval with user input
}

// SQL Injection vulnerability
async function getUserData(userId) {
  const db = getDatabase();
  // Direct string concatenation leads to SQL injection
  const results = await db.query(`SELECT * FROM users WHERE id = ${userId}`);
  return results;
}
