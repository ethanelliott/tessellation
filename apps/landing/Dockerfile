FROM nginx
COPY ./deployment/nginx/nginx.config /etc/nginx/conf.d/default.conf
COPY ./dist/apps/landing /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
