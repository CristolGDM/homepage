npm run build
docker rm pixelbreath -f
docker rm cristolgdm -f
docker build ./dist-pixel -f Dockerfile -t pixel
docker build ./dist-cgdm -f Dockerfile -t cristol
docker run -it --rm -d --name pixelbreath -p 8888:80 pixel
docker run -it --rm -d --name cristolgdm -p 8889:80 cristol
