ARG CIRCLE_BRANCH

# Take note that the image itself is already logged-in in the cloud CLI
FROM unnotechpromotion/staryu:$CIRCLE_BRANCH as project

FROM node:8.12.0

WORKDIR /usr/src/app

COPY --from=project /usr/src/app/node_modules node_modules
COPY package.json package.json
RUN npm install && \
    npm install --only=dev && \
    npm rebuild node-sass

# To include everything
COPY . .

CMD npm run build