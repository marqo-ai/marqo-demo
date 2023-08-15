#!/bin/bash

source .venv/bin/activate && gunicorn -b 0.0.0.0:5001 wsgi:app --workers 2 --threads 4 --timeout 60 --worker-class gevent
