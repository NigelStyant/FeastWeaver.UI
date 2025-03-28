export async function GET() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/csrf`);
  const data = await response.json();
  
  return Response.json(data);
}
