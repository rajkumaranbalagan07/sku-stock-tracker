FROM registry.access.redhat.com/ubi8/nodejs-18
USER root
WORKDIR /home/node/app
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "dist/main"]