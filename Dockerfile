# step 1 build react app
FROM node:alpine3.18 as build 
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# step 2 server with Nginx
FROM Nginx:1.23-alpine
WORKDIR /user/share/Nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "Nginx", "-g" "deamon off;"]

