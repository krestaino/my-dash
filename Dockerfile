FROM node:10-slim
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
CMD [ "yarn", "setup" ]
CMD [ "yarn", "build" ]
CMD [ "yarn", "serve"]