#!/bin/bash
app="sara_sleep_self_monitoring"
docker build --no-cache -t ${app} .
docker run -d -p56734:5000 --name=${app} ${app}
