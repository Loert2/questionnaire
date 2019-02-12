FROM node:10.15.0

RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

COPY . /app

EXPOSE 5000
CMD [ "yarn", "start" ]
