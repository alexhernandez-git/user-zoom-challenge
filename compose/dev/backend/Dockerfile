FROM node:14

# Create app directory
WORKDIR /app

RUN npm install
RUN npm install nodemon -g
RUN npm install jest -g

# Create app directory  
COPY ./backend/package.json .

RUN yarn
# If you are building your code for production
# RUN npm ci --only=production