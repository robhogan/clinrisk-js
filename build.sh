#! /bin/sh

# yarn build
rsync -a --include '*/' --include 'package.json' --exclude '*' modules/ dist/
rsync -a --include '*/' --include 'README.md' --exclude '*' modules/ dist/
rsync -a --include '*/' --include 'LICENSE' --exclude '*' modules/ dist/
