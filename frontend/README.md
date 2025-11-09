Front-end (Vite + React) for RPNPC Survey

Quick start (Codespaces):

1. Open a new terminal tab in Codespaces.
2. cd frontend
3. npm install
4. npm run dev

Codespaces will prompt to forward the Vite dev port (usually 5173). Click "Open in Browser" or "Make Public" if you want to share the port.

Notes:
- The frontend posts to http://localhost:3001/submit by default. If you run the backend in Codespaces and make port 3001 public, your frontend in Codespaces can reach it via http://localhost:3001.
- You can split the form into more components under src/components/; PartA.jsx and PartB.jsx are provided as examples.
