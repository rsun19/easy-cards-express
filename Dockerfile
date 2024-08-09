FROM node:lts-alpine
ENV DEBUG=myapp:*
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
EXPOSE 9000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
