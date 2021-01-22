FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /src/
EXPOSE 3000

# FROM base as production
# ENV NODE_ENV=production
# RUN npm install
# RUN npm run build
# COPY . /src
# CMD ["npm", "run", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . /src
CMD ["npm", "run", "dev"]