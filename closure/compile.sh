#!/bin/bash

echo "Compiling...";

# --compilation_level WHITESPACE_ONLY | SIMPLE_OPTIMIZATIONS | ADVANCED_OPTIMIZATIONS
# --formatting PRETTY_PRINT | PRINT_INPUT_DELIMITER

VERSION="EC.0.8.0"

mkdir -p ../sprint/$VERSION
cp -rf ../src/css ../sprint/$VERSION ;
echo "Job done: Style Sheets";

java -jar compiler.jar \
    --compilation_level WHITESPACE_ONLY \
    --formatting PRETTY_PRINT \
\
    --js_output_file ../sprint/$VERSION/EdgeCommons.experimental.js \
\
    --js ../src/libs/Modulog-0.0.2.js \
    --js ../src/EdgeCommons.js \
    --js ../src/modules/Core/Core.js \
    --js ../src/modules/Preload/Preload.js \
    --js ../src/modules/Sound/Sound.js \
    --js ../src/modules/Parallax/Parallax.js \
    --js ../src/modules/Spotlight/Spotlight.js \
    --js ../src/modules/Experimental/Experimental.js \
    
echo "Job done: Experimental";




java -jar compiler.jar \
    --compilation_level SIMPLE_OPTIMIZATIONS \
    --formatting PRINT_INPUT_DELIMITER \
\
    --js_output_file ../sprint/$VERSION/EdgeCommons.min.js \
\
    --js ../src/libs/Modulog-0.0.2.js \
    --js ../src/EdgeCommons.js \
    --js ../src/modules/Core/Core.js \
    --js ../src/modules/Preload/Preload.js \
    --js ../src/modules/Sound/Sound.js \
    --js ../src/modules/Parallax/Parallax.js \
    --js ../src/modules/Spotlight/Spotlight.js \

echo "Job done: Minified";






#java -jar compiler.jar \
#    --compilation_level WHITESPACE_ONLY \
#    --formatting PRETTY_PRINT \
#\
#    --js_output_file ../sprint/$VERSION/EdgeCommons.debug.js \
#\
#    --js ../src/libs/Modulog-0.0.2.js \
#    --js ../src/EdgeCommons.js \
#    --js ../src/modules/Core/Core.js \
#    --js ../src/modules/Preload/Preload.js \
#    --js ../src/modules/Sound/Sound.js \
#    --js ../src/modules/Parallax/Parallax.js \
#    --js ../src/modules/Spotlight/Spotlight.js \
#
#echo "Job done: Debug";


#java -jar compiler.jar \
#    --compilation_level SIMPLE_OPTIMIZATIONS \
#    --formatting PRINT_INPUT_DELIMITER \
#\
#    --js_output_file ../sprint/EdgeCommons-Essentials-Sprint-0.7.1.js \
#\
#    --js ../src/libs/Modulog-0.0.2.js \
#    --js ../src/EdgeCommons.js \
#    --js ../src/modules/Core/Core.js \
#
#echo "Job done: Essentials";