if [[ $1 == 'init' ]]; then
    docker build -t deadbox-js-library .
    docker run -it --rm -v $(pwd):/app -p 8090:8090 deadbox-js-library sh -c "npm install && npm start"
elif [[ $1 == 'start' ]]; then
    docker run -it --rm -v $(pwd):/app -p 8090:8090 deadbox-js-library sh -c "npm install && npm start"
elif [[ $1 == 'build' ]]; then
    docker run -it --rm -v $(pwd):/app -p 8090:8090 deadbox-js-library sh -c "npm install && npm run build"
else

RED='\033[0;31m'
NC='\033[0m' # No Color
BGreen='\033[1;32m'

printf """${BGreen}Docker.sh
${RED}
Start.sh Commands:
* init => Initial docker build
* start => Start
* build => Builds for productions
${NC}
"
fi