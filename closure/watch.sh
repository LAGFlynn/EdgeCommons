#!/bin/bash

echo "watching...";

check() {
    # Folder to watch
    dir="../src"

    f1=`find $dir -exec stat -f "%m" \{} \; | sort -n -r | head -1`

    while [ true ]
    do
        #echo "before sleep";
        sleep 2

        f2=`find $dir -exec stat -f "%m" \{} \; | sort -n -r | head -1`

        if [ $f1 != $f2 ]
            then
                ./compile.sh
                f1=`find $dir -exec stat -f "%m" \{} \; | sort -n -r | head -1`
                echo "compiling done";
         fi
    done

    #eval $2
    echo "done";
}

check $*