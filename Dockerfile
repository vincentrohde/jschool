FROM node:12

# Create app directory
WORKDIR /app

# gulp shenanigans
RUN npm install -g gulp

# Bundle app source
COPY package.json .
RUN npm i

# Mount persistent storage
# VOLUME /app/data
# VOLUME /app/public/uploads

# Add the environment variable
# to copy files rather than use symlinks
# ENV APOS_ALWAYS_COPY_ASSETS=1

COPY lib lib
COPY public public
COPY sample-profiles sample-profiles
COPY src src
COPY scripts/wait-for-it.sh scripts/wait-for-it.sh
COPY views views
COPY Gulpfile.js .
COPY app.js .

RUN ["chmod", "+x", "scripts/wait-for-it.sh"]
# EXPOSE 3000

RUN gulp

CMD [ "./scripts/wait-for-it.sh", "mongo:27017", "--", "node", "app.js" ]
