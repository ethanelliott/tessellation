FROM node:16
ENV ENVIRONMENT prd
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ./dist/apps/example ./
EXPOSE 8881
RUN yarn install
CMD node ./main.js
