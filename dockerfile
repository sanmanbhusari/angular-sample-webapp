#For anugular
FROM node:10.16.0 AS build-angular

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY  package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.1.0

# add app
COPY . .

# generate build
RUN ng build --prod --aot --output-path=dist

FROM nginx:alpine
COPY --from=build-angular /app/dist/* /usr/share/nginx/html/
