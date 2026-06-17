FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY worker/ ./worker/
COPY tsconfig.json ./
RUN npm install -g tsx
CMD ["tsx", "worker/index.ts"]
