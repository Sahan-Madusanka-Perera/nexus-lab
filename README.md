# NexusCare Lab Portal

Lab management system with Flask backend and React frontend.

## Requirements

- Python 3.10+
- Node.js 18+
- PostgreSQL
- Firebase project

## Backend

```bash
cd backend-lab
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Add your Firebase service key as `firebase_service_key.json` and configure `.env` (see `.env.example`).

```bash
python run.py
```

Runs on http://127.0.0.1:5050

## Frontend

```bash
cd nexus-frontend
npm install
npm run dev
```

Runs on http://localhost:5173
