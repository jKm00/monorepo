export const load = async ({ url }) => {
    const username = url.searchParams.get('username')

    return {
        username
    }
};