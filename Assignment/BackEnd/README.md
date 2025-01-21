(\*) Project Structure:

- index.js : apps entry point.
- Configs: folder includes all config files for both the app and external services/database.
- Routes: folder includes all api routes.
- Middlewares: folder includes apps custom middlewares.
- Helpers: folder includes other utilities class or methods.
- DBs: folder for local DB file.

(\*) Notes:

- For the simplicity of this project:
  - Users sessions will be store in-memory.
  - Account password will be set by user during new account creation with no need for hashing/encryption.
