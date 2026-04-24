# Bajaj Finserv Health SRM Challenge

A full-stack web app built for the Bajaj Finserv Health SRM challenge. Send it a list of node relationship strings, and it builds trees, detects cycles, flags duplicates, and handles invalid entries — all through a single API endpoint.

**Live Demo:** [bajaj-finserv-6s6p.vercel.app](https://bajaj-finserv-6s6p.vercel.app)  
**API Base URL:** [bajaj-finserv-ten-flax.vercel.app](https://bajaj-finserv-ten-flax.vercel.app)  
**Repo:** [github.com/meyyappan055/Bajaj-Finserv](https://github.com/meyyappan055/Bajaj-Finserv)

---

## Stack

- **Frontend:** React + Vite, deployed on Vercel
- **Backend:** Node.js + Express, deployed on Vercel

---

## API

### `POST /bfhl`

Takes an array of strings in `"A->B"` format and returns the parsed tree structure along with metadata.

**Request**
```json
{
  "nodes": ["A->B", "A->C", "B->D", "C->C"]
}
```

**Response**
```json
{
  "is_success": true,
  "trees": [
    {
      "root": "A",
      "children": {
        "A": ["B", "C"],
        "B": ["D"]
      }
    }
  ],
  "cycles_detected": ["C->C"],
  "duplicates": [],
  "invalid_entries": []
}
```

The endpoint handles:
- Valid tree/graph relationships (`A->B`)
- Self-referencing cycles (`C->C`) and longer cycles
- Duplicate edges
- Malformed or invalid strings

---

## Project Structure

```
Bajaj-Finserv/
├── backend/
│   ├── index.js          # Express app entry point
│   ├── routes/
│   │   └── bfhl.js       # POST /bfhl route handler
│   ├── utils/
│   │   └── parser.js     # Tree building, cycle detection logic
│   └── vercel.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── components/
    ├── index.html
    └── vite.config.js
```

---

## Local Setup

**Backend**
```bash
cd backend
npm install
node index.js
# Runs on http://localhost:3000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Make sure the frontend's API base URL points to `http://localhost:3000` when running locally. You can set this in a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

---
