# Recipe API and Frontend

Simple web app with FastAPI backend and a frontend interface to add, list, and delete recipes. Built with Python (FastAPI, Uvicorn) and frontend using HTML, CSS, and JavaScript. Run the API server and open `index.html` to interact. Supports REST endpoints for recipe management.

## Features
- Add/view/delete recipes
- Clean, responsive UI
- Simple REST API

## Setup
1. Create and activate Python virtual environment
2. Install dependencies with `pip install -r requirements.txt`
3. Run API: `uvicorn main:app --reload`
4. Open `index.html` in browser

## API Endpoints
- GET `/receitas` — list recipes
- POST `/receitas` — add recipe
- DELETE `/receitas/{id}` — delete recipe

MIT License
