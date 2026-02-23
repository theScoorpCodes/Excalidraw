# Date : 17th Feb 2026

1. Initialized an empty turborepo
2. Deleted the docs app
3. Added https-server, ws-server
4. Added package.json in both places(using "npm init -y")
5. Added tsconfig.json in both the places, and imported it from @repo/typescript-config/base.json
6. Added @repo/typescript-config as a dependency in both ws-server and http-server(look in package.json) and after that running `pnpm i` at root level
7. Add a build, dev and start script to both the projects
8. Update the turbo-config in both the projectsd
9. Initialize a http server, intialize a websocket server
10. Write the signup, signin, create-room endpoint
11. Write the middlewared that decode the token and gate the create-room ep
12. Decode the token in the websocket server as well. Send the token to the websocket server in a query param(for now)
13. Initialize a new 'db' package where you write the schema of the project.
14. Import the db package in http layer and start putting things in the DB.
15. Add a common package where we add teh zod schema and the JWT_SECRET
16. Defining the schema in schema.prisma
17. Complete the HTTP backend
18. ws layer, room management, broadcast messages
19. HTTP route for GET /chats?room=123
20. frontend
