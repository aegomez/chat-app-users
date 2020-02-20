FROM node:12.16-alpine
LABEL author="Adrian Gomez <https://github.com/aegomez>"

ENV NODE_ENV=production

WORKDIR /app

COPY package.json yarn.lock ./
COPY build build/

RUN yarn install

EXPOSE 3000:3000

USER node

CMD ["node", "build/server.js"]