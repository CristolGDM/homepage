docker rm pixelbreath -f
docker rm cristolgdm -f
docker run -it --rm -d -p 8888:80 --name cristolgdm -v ./dist-cgdm:/usr/share/nginx/html nginx
docker run -it --rm -d -p 8889:80 --name pixelbreath -v ./dist-pixel:/usr/share/nginx/html nginx