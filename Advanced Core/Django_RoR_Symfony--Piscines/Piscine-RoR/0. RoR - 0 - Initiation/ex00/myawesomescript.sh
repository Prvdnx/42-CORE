#!/bin/sh

# Purpose: Fetches the headers of a bit.ly link and extracts 
# the 'Location' header to reveal the final destination URL.
#
# Constraints: Only curl, grep, and cut are allowed.

if [ $# -ne 1 ]; then
    echo "Usage: ./myawesomescript.sh <bit.ly link>"
    exit 1
fi

# -s: silent mode
# -I: fetch headers only
# grep -i: case-insensitive search for Location header
# cut -d' ': split by space and take the second field (the URL)
curl -sI "$1" | grep -i "Location" | cut -d' ' -f2
