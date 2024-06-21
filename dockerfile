
# Stage 2: Serve the built Vue.js application using Nginx
FROM nginx:alpine 
COPY /MaHIS-Release /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
