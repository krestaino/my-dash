FROM node:10.16.1-jessie-slim
WORKDIR /usr/my-dash
COPY . .
RUN [ "yarn", "setup" ]
RUN [ "yarn", "build" ]
