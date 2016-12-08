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

#RUN npm install -g pm2


#add sources 
ADD . .

# Expose port
EXPOSE  3000

# Run app in production mode using pm2
#CMD ["pm2", "start", "processes.json", "--no-daemon"]
CMD ["npm", "start"]