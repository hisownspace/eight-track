FROM node:12 AS build-stage

WORKDIR /react-app
COPY react-app/. .

# You have to set this because it should be set during build time.
ENV REACT_APP_BASE_URL=https://0.0.0.0:8000

# Build our React App
RUN npm install
RUN npm run build

FROM ubuntu:20.04

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=development
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Install Python Dependencies

RUN apt update
ARG DEBIAN_FRONTEND=noninteractive
RUN apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev wget libpq-dev -y
RUN apt install python3.9 -y
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:chris-needham/ppa
RUN apt-get update
RUN apt-get install audiowaveform -y
RUN apt-get install python3-pip -y

RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD ["gunicorn", "app:app", "--bind=0.0.0.0:8000"]
