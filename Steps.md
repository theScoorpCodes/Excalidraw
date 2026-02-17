# Date : 17th Feb 2026

1. Initialized an empty turborepo
2. Deleted the docs app
3. Added https-server, ws-server
4. Added package.json in both places(using "npm init -y")
5. Added tsconfig.json in both the places, and imported it from @repo/typescript-config/base.json
6. Added @repo/typescript-config as a dependency in both ws-server and http-server(look in package.json) and after that running `pnpm i` at root level
