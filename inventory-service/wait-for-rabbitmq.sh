#!/bin/bash
# wait-for-rabbitmq.sh

echo "Waiting for RabbitMQ..."
while ! nc -z rabbitmq 5672; do
  sleep 1
done

echo "RabbitMQ is up! Starting inventory service..."
exec "$@"
