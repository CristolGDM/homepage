FROM nginx:latest
COPY ./ /usr/share/nginx/html
RUN chown nginx:nginx /usr/share/nginx/html/*
