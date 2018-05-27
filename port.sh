#! /bin/sh

# yarn build

# Copy c files to lib as ts files
find . -name '*.c' -exec sh -c 'cp "$0" "$(dirname "$0")/../lib/$(basename ${0%.c}.ts)"' {} \;

#
find ./modules/*/lib -name '*.ts' \
-exec sh -c 'echo Porting "$0"' {} \; \
-exec sh -c 'sed -i.bak s/"static double"/"export function"/g "$0"' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"int b_([A-Za-z_0-9]+),"/"b_\1: 0 | 1,"/g "$0"' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"int fh_([A-Za-z_0-9]+),"/"fh_\1: 0 | 1,"/g "$0"' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"int smoke_cat,"/"smoke_cat: 0 | 1 | 2 | 3 | 4,"/g "$0"' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"int ethrisk,"/"ethrisk: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,"/g "$0"' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"int ([A-Za-z_0-9]+),"/"\1: number,"/g "$0"' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"double ([A-Za-z_0-9]+),"/"\1: number,"/g "$0"' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"double ([A-Za-z_0-9]+)$"/"\1: number"/g "$0"' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"double ([A-Za-z_0-9]+)\[([0-9]+)\] = \{"/"const \1 = ["/g "$0"' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"\};"/"];"/g "$0"' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"double ([A-Za-z_0-9]+)"/"let \1"/g $0' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"smoke_cat==([0-9]+)"/"smoke_cat === \1 ? 1 : 0"/g $0' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"pow\("/"Math.pow("/g $0' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"exp\("/"Math.exp("/g $0' {} \; \
-exec sh -c 'sed -i.bak -E -e s/"log\("/"Math.log("/g $0' {} \;

# Remove temp files
find ./modules/*/lib -name '*.ts.bak' -delete
