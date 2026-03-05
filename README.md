# AI Autocorrect & Writing Assistant 🤖✍️

A full-stack, "Agentic" writing tool that uses Large Language Models (LLMs) to refine text for tone, grammar, and professional fluency.

## 🚀 Overview
Unlike standard spellcheckers, this tool uses **Llama 3.3** to understand user intent. It doesn't just fix typos; it re-writes text based on a selected tone (Professional, Casual, Creative, or Formal) and provides structured feedback on why changes were made.

## 🛠️ Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS (Hosted on Vercel)
- **Backend:** Python, FastAPI, LangChain (Hosted on Render)
- **AI Brain:** Llama 3.3-70b-versatile via Groq API
- **Deployment:** CI/CD via GitHub integration



## 📂 Project Structure
```text
.
├── backend/            # FastAPI Server & AI Logic
│   ├── main.py         # API Endpoints & LangChain Logic
│   └── requirements.txt
└── frontend/           # React Web Interface
    ├── src/            # Components & App Logic
    └── index.html      # UI Entry Point
