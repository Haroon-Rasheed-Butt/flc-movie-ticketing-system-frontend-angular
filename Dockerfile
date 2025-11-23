# Stage 1: build the Angular application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ./node_modules/.bin/ng build MovieTicketingFrontend_Meera --configuration production

# Stage 2: serve with nginx
FROM nginx:1.26-alpine
COPY --from=builder /app/dist/movie-ticketing-frontend-meera/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
