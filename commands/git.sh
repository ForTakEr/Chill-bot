#/bin/sh

# Fetch the newest code
git fetch origin master

# Hard reset
git reset --hard origin/master

# Force pull
git pull origin master --force

# Refresh the project so the code updates
refresh