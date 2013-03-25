#!/bin/bash
echo "Compiling...";

# VARIABLES
VERSION="0.9.1"
LICENSE="// EdgeCommons v$VERSION +++ Visit edgecommons.org for documentation, updates and examples +++ Copyright (c) 2013 by Simon Widjaja +++ Distributed under the terms of the MIT license (http://www.opensource.org/licenses/mit-license.html) +++ This notice shall be included in all copies or substantial portions of the Software." 

# PREPARE
mkdir -p ../sprint/an
mkdir -p ../sprint/an/$VERSION
mkdir -p ../sprint/an/$VERSION/css
mkdir -p ../sprint/an/$VERSION/js/min

# COPY CSS
cp -rf ../src/css ../sprint/an/$VERSION
echo "Job done: Style Sheets"

# REPLACE VERSION NO
#echo $1 | sed 's#EdgeCommons.VERSION = "\([0-9].[0-9].[0-9]\)";#EdgeCommons.VERSION = "'$VERSION'"#g' ../src/EdgeCommons.js
sed -i.bak 's#EdgeCommons.VERSION = "\([0-9].[0-9].[0-9]\)";#EdgeCommons.VERSION = "'$VERSION'";#g' ../src/EdgeCommons.js
unlink ../src/EdgeCommons.js.bak

# CLOSURE FLAGS
# --compilation_level WHITESPACE_ONLY | SIMPLE_OPTIMIZATIONS | ADVANCED_OPTIMIZATIONS
# --formatting PRETTY_PRINT | PRINT_INPUT_DELIMITER


##########################################
# Job: Experimental
##########################################
FILE="../sprint/an/$VERSION/js/min/EdgeCommons.Experimental.js"
java -jar compiler.jar \
    --compilation_level SIMPLE_OPTIMIZATIONS \
    --formatting PRINT_INPUT_DELIMITER \
    --js_output_file $FILE \
    --js ../src/libs/Modulog-0.0.2.js \
    --js ../src/EdgeCommons.js \
    --js ../src/modules/Core/Core.js \
    --js ../src/modules/Sound/Sound.js \
    --js ../src/modules/Parallax/Parallax.js \
    --js ../src/modules/Spotlight/Spotlight.js \
    --js ../src/modules/SVG/SVG.js \
    --js ../src/modules/Experimental/Experimental.js \

echo $LICENSE|cat - $FILE > /tmp/out && mv /tmp/out $FILE
echo "Job done: Experimental";





##########################################
# Job: All-in-One
##########################################
FILE="../sprint/an/$VERSION/js/min/EdgeCommons.js"
java -jar compiler.jar \
    --compilation_level SIMPLE_OPTIMIZATIONS \
    --formatting PRINT_INPUT_DELIMITER \
    --js_output_file $FILE \
    --js ../src/libs/Modulog-0.0.2.js \
    --js ../src/EdgeCommons.js \
    --js ../src/modules/Core/Core.js \
    --js ../src/modules/Sound/Sound.js \
    --js ../src/modules/Parallax/Parallax.js \
    --js ../src/modules/Spotlight/Spotlight.js \
    --js ../src/modules/SVG/SVG.js \

echo $LICENSE|cat - $FILE > /tmp/out && mv /tmp/out $FILE
echo "Job done: All-in-One";


##########################################
# Job: Core
##########################################
FILE="../sprint/an/$VERSION/js/min/EdgeCommons.Core.js"
java -jar compiler.jar \
    --compilation_level SIMPLE_OPTIMIZATIONS \
    --formatting PRINT_INPUT_DELIMITER \
    --js_output_file $FILE \
    --js ../src/libs/Modulog-0.0.2.js \
    --js ../src/EdgeCommons.js \
    --js ../src/modules/Core/Core.js \

echo $LICENSE|cat - $FILE > /tmp/out && mv /tmp/out $FILE
echo "Job done: Core";


##########################################
# Job: Sound
##########################################
FILE="../sprint/an/$VERSION/js/min/EdgeCommons.Sound.js"
java -jar compiler.jar \
    --compilation_level SIMPLE_OPTIMIZATIONS \
    --formatting PRINT_INPUT_DELIMITER \
    --js_output_file $FILE \
    --js ../src/modules/Sound/Sound.js \

echo $LICENSE|cat - $FILE > /tmp/out && mv /tmp/out $FILE
echo "Job done: Sound";


##########################################
# Job: Parallax
##########################################
FILE="../sprint/an/$VERSION/js/min/EdgeCommons.Parallax.js"
java -jar compiler.jar \
    --compilation_level SIMPLE_OPTIMIZATIONS \
    --formatting PRINT_INPUT_DELIMITER \
    --js_output_file $FILE \
    --js ../src/modules/Parallax/Parallax.js \

echo $LICENSE|cat - $FILE > /tmp/out && mv /tmp/out $FILE
echo "Job done: Parallax";


##########################################
# Job: Spotlight
##########################################
FILE="../sprint/an/$VERSION/js/min/EdgeCommons.Spotlight.js"
java -jar compiler.jar \
    --compilation_level SIMPLE_OPTIMIZATIONS \
    --formatting PRINT_INPUT_DELIMITER \
    --js_output_file $FILE \
    --js ../src/modules/Spotlight/Spotlight.js \

echo $LICENSE|cat - $FILE > /tmp/out && mv /tmp/out $FILE
echo "Job done: Spotlight";


##########################################
# Job: SVG
##########################################
FILE="../sprint/an/$VERSION/js/min/EdgeCommons.SVG.js"
java -jar compiler.jar \
    --compilation_level SIMPLE_OPTIMIZATIONS \
    --formatting PRINT_INPUT_DELIMITER \
    --js_output_file $FILE \
    --js ../src/modules/SVG/SVG.js \

echo $LICENSE|cat - $FILE > /tmp/out && mv /tmp/out $FILE
echo "Job done: SVG";






<<COMMENT



COMMENT

