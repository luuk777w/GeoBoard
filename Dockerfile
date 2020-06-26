FROM node:10
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir dist

CMD [ "npm", "run build" ]

FROM nginx:1.15.2-alpine
COPY dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
