# pull the base image
FROM node:14 as build

# set the working direction
WORKDIR /app

# add app
COPY . .
 

RUN npm i
RUN npm i caniuse-lite browserslist
RUN npm run build



# => Run container
FROM nginx:1.21.5-alpine

COPY --from=build /app/build /usr/share/nginx/html/
#COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]