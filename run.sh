#!/bin/sh

docker build -t pricecheck/practical .

docker run -p 3330:3330 pricecheck/practical
