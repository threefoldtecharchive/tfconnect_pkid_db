FROM node:alpine as pkid_builder
WORKDIR /app

COPY *.json ./

COPY yarn.lock ./

COPY ./src ./src

RUN yarn
RUN yarn build


FROM node
RUN apt-get -y update && apt-get -y upgrade

WORKDIR /backend
COPY --from=pkid_builder /app/node_modules ./node_modules
COPY --from=pkid_builder /app/dist ./dist
COPY --from=pkid_builder /app/package.json .

RUN npm install pm2 -g

WORKDIR /
COPY ./start.sh /start.sh
RUN chmod +x /start.sh

CMD /start.sh