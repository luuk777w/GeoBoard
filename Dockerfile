FROM node:10
WORKDIR /usr/src/app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 5001
CMD [ "npm", "start" ]