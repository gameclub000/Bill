FROM node:14.9.0

WORKDIR /app

COPY ./ /app

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]
