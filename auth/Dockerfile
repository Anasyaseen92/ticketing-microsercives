FROM node:alpine

WORKDIR /app
COPY package.json .
COPY aytix-common-1.0.4.tgz .
RUN npm install --omit=dev
COPY . .

CMD [ "npm", "start" ]
