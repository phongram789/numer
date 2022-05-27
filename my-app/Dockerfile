FROM node:15-alpine 

# make the 'client' folder the current working directory
WORKDIR /client

# copy both package
COPY package.json /client
COPY package-lock.json .

RUN npm i


COPY . /client/

EXPOSE 3000

CMD [ "npm" ,"start"]


