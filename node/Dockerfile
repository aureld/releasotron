# Set the base image to Ubuntu
FROM    node:argon

# File Author / Maintainer
MAINTAINER Aurelien Duval

# create app dir
RUN mkdir -p usr/src/app
WORKDIR /usr/src/app

#add dependencies
COPY package.json /usr/src/app
RUN npm install

#add sources 
COPY . .

# Expose port
EXPOSE  8080

# Run app using nodemon
CMD ["npm", "start"]