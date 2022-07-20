export function unauthPage({ req, res }) {
  return new Promise((resolve, reject) => {
    const { token } = req.cookies;

    if (token)
      return res
        .writeHead(302, {
          Location: "/posts",
        })
        .end();

    return resolve("unatuhorized");
  });
}

export function authPage({ req, res }) {
  return new Promise((resolve, reject) => {
    const { token } = req.cookies;

    if (!token)
      return res
        .writeHead(302, {
          Location: "/auth/login",
        })
        .end();

    return resolve( token );
  });
}
