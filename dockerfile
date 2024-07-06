FROM node

WORKDIR /home/build
COPY . .

RUN npm i
RUN npm i -g nodemon
RUN npm i -g ts-node

EXPOSE 80
CMD ["npm","run","start"]