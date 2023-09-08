export const POST = (event) => {
    event.cookies.delete('Authorization', { path: '/' });
    event.cookies.delete('Username', { path: '/' });

    return new Response('Logged out!', { status: 200 })
}