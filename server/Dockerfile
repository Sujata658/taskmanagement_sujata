FROM node:20.14.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# FROM node:18.16.1 as prod
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /usr/app
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist
# COPY  package.json ./

# ENTRYPOINT ["node", "dist/index.js"]

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:dev"]