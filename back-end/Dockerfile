FROM node:10.15.0

RUN apt-get -y update \
  && apt-get install -y apt-transport-https ca-certificates curl gnupg software-properties-common \
  && curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - \
  && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
  && apt-get -y update \
  && apt-get -y install docker-ce

RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

COPY . /app

EXPOSE 4000
CMD [ "yarn", "start" ]
