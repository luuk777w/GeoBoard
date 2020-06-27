# Build app
FROM node:10
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir dist

CMD [ "npm", "run build" ]

# serve app with nginx
FROM nginx:1.15.2-alpine
WORKDIR /app/

COPY --from=0 /usr/src/app/dist /var/www
COPY --from=0 /usr/src/app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
