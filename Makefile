build:
	docker-compose build --no-cache 

build-cached:
	docker-compose build

up:
	docker-compose up -d

run-clean: build up

run-cached:	build-cached up

down:
	docker-compose down 
