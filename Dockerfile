# Build app
FROM node:10
WORKDIR /usr/src/app AS builder

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run build" ]

# serve app
FROM nginx:1.15.2-alpine
WORKDIR /app/

COPY --from=builder /usr/src/app/dist /var/www
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
