FROM node:16 AS build-stage

WORKDIR /react-app
COPY react-app .

# You have to set this because it should be set during build time.
# ENV REACT_APP_BASE_URL=0.0.0.0:8000

# Build our React App
RUN npm install
RUN npm run build

FROM python:3.9

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=development
ENV SQLALCHEMY_ECHO=True
ENV SECRET_KEY=password
ENV DATABASE_URL=postgresql://david:1234@172.18.0.2:5432/eight-track

# EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app react-app

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD ["gunicorn", "app:app", "--bind=0.0.0.0:8000"]
