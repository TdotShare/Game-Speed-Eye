# pull the base image
FROM node:alpine as builder

# set the working direction
WORKDIR /app

# add app
COPY . .
 
RUN npm install && npm run build




# => Run container
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]