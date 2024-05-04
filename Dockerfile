FROM node:21-alpine

WORKDIR /home/node/app

# Copy source code into app folder
COPY --chown=node:node . .

USER node
