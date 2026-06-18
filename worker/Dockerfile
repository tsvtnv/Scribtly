FROM node:22-alpine
WORKDIR /app
COPY package*.json .npmrc ./
RUN npm ci --omit=dev --legacy-peer-deps
COPY worker/ ./worker/
COPY tsconfig.json ./
RUN npm install -g tsx
CMD ["tail", "-f", "/dev/null"]
