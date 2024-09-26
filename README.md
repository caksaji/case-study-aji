# How to Use JSON Server

## Prerequisites:

- Node.js and npm should be installed.
- Clone or download as zip and extract it
- Go to your local directory of this project

## Steps to Run the JSON Server:

1. Open `server` directory

2. Install `json-server` (if you haven't already):

   ```bash
   npm install
   ```

3. Navigate to the project directory where the `db.json` file is located

4. Start the JSON Server using the `db.json` file:

   ```bash
   npx json-server db.json --port 3001
   ```

5. Now local server is live and ready to use

## Steps to Run the Client

1. Open `client` directory

2. This is nuxt3 project and need to use node.js v22.3.0

3. Install the packages

   ```bash
   npm install
   ```

4. Run it

   ```bash
   npm run dev
   ```

## Features

1. Everything in the test requirements (CRUD)

2. Responsive

3. Reusable components

4. Light & dark mode

5. 90% keyboard accessibility (keyboard-only users don't need to use the cursor)

6. State management (reusable loaded data from API)

7. etc.
