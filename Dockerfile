# node (builder)
FROM node:16-alpine AS builder
WORKDIR /usr

# For cache package.json and package-lock.json when package.json is not changed
COPY ./package* yarn.lock ./
RUN yarn install

COPY ./ ./
RUN yarn run build

# nginx
FROM nginx:1.23.2-alpine
COPY --from=builder /usr/dist/ /usr/share/nginx/html
EXPOSE 80