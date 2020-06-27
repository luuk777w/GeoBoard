# Build app
FROM node:10

COPY package.json package-lock.json ./

RUN npm install && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . .

RUN npm run build

# serve app with
FROM nginx:alpine
WORKDIR /app/

COPY --from=0 /app/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
