FROM node:16-alpine as build
WORKDIR /app
ARG ZAGENV=production
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app/
RUN yarn install --frozen-lockfile
RUN yarn build:${ZAGENV}

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]