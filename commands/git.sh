#/bin/sh

# Fetch the newest code
git fetch chillbot master

# Hard reset
git reset --hard chillbot/master

# Force pull
git pull chillbot master --force