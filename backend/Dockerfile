FROM python:3.9
WORKDIR /api
RUN apt-get update && \
apt-get --yes install build-essential python3-dev libmemcached-dev libldap2-dev libsasl2-dev libzbar-dev  ldap-utils tox lcov valgrind && \
apt-get clean
# COPY ./backend/requirements.txt /api/requirements.txt
# RUN pip3 install --no-cache-dir --upgrade -r /api/requirements.txt
# COPY ./backend/ /api/
ENTRYPOINT ["sh", "backend.sh"]