FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /src/
EXPOSE 8000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /src
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install && npm install -g nodemon
COPY . /src
CMD ["nodemon", "bin/www"]