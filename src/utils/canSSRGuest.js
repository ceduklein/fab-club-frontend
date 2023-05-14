import { parseCookies } from "nookies";

// Função para páginas que só podem ser acessadas por usuários não logados/ não cadastrados.
export function canSSRGuest(fn) {
  return async (ctx) => {
    const cookies = parseCookies(ctx);

    if (cookies['@auth.userId']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }

    return await fn(ctx);
  }
}