
FROM node:18
ARG NODE_ENV
WORKDIR /usr/src/app

COPY . .


RUN npm install

RUN npm run build

CMD ["node", "dist/src/main"]


