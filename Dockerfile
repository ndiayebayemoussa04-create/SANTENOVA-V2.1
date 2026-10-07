# SantéNova v2.1 — Multi-stage Dockerfile
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM python:3.11-slim AS runtime
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ ./backend/
COPY --from=frontend-builder /app/dist ./dist

EXPOSE 8000 3000
ENV PORT=3000
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "8000"]
