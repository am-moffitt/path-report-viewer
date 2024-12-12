#!/bin/bash
# cd /api
pip3 install --no-cache-dir --upgrade -r /api/requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000