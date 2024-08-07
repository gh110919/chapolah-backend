FROM node

WORKDIR /home/build/backend
COPY . .

RUN npm i
RUN npm i -g nodemon
RUN npm i -g ts-node

EXPOSE 3000 8080
CMD ["npm","run","start"]