# Build app
FROM node:10
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run build" ]

# serve app
FROM nginx:1.15.2-alpine
WORKDIR /usr/src/app

COPY dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
