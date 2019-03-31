### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

# SET ENVIRONMENT VARIABLES

ENV API_BASE_CATALOG="http://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:3010"
ENV API_BASE_LOGIN="https://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:9443"
ENV API_BASE_SECURITY="http://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:3000"
ENV API_BASE_CARD="https://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:9443"
ENV API_BASE_ORDER="https://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:9443"
ENV API_BASE_PAYMENT="https://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:9443"

## Build the angular app in production mode and store the artifacts in dist folder

RUN ng build --prod

### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
# COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

# EXPOSE Port 8081
EXPOSE 8081