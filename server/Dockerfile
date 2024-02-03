FROM node:20

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install -g nodemon
RUN npm install

EXPOSE 3500

CMD [ "npm", "run", "dev" ]