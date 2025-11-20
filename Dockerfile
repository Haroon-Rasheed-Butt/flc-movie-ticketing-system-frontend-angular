# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci || true
COPY . .
RUN npm run build || true

# Runtime stage
FROM nginx:alpine
COPY --from=build /app/dist/flc-movie-ticketing-system-frontend-angular /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
