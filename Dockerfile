FROM nginx:stable
COPY dist/build/h5 /usr/share/nginx/html
WORKDIR /etc/nginx/conf.d
COPY ./nginx.conf /etc/nginx/nginx.conf.tmpl
EXPOSE 80
CMD /bin/sh -c "DOLLAR='$' envsubst < /etc/nginx/nginx.conf.tmpl > /etc/nginx/nginx.conf && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf"
