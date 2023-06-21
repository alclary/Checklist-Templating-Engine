# App build
FROM node:lts-alpine3.18 as build
WORKDIR /usr/app
COPY . /usr/app
RUN npm ci
RUN npm run build

# Add nginx to serve app
FROM nginx:stable-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html