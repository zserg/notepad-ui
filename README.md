docker build . -t zserg/notepad-ui:1.0
docker run -p 3000:8080 zserg/notepad-ui:1.0
docker push zserg/notepad-ui:1.0

