FROM node:alpine as builder

# RUN apk update && apk add --no-cache make git

RUN npm -v
RUN node -v

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn build


FROM nginx:alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/

## From 'builder' copy website to default nginx public folder
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]