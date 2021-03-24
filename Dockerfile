#Specify a base image
FROM node:alpine

#Specify a working directory
WORKDIR /usr/app

#Copy the dependencies file
COPY ./package*.json ./package*.json

#Install dependencies
RUN npm install 

#Copy remaining files
COPY ./ ./

EXPOSE 7000

#Default command
CMD ["npm","run","dev"]