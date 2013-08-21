######################################################


            MOCK MOCK MOCK MOCK MOCK MOCK MOCK


#######################################################

#! /bin/bash
# this script requires the following configurations
#   #  sysconfig_hpwidget - the sysconfig file for the application
#   #  prod_conf.js - production configuration

PROD_CONF_FILE=~/prod_conf.js
SYSCONF_FILE=~/sysconfig_hpwidget
SYSCONF_DEST=/etc/sysconfig/hpwidget

echo "verifying configuration"
check_file_exists $PROD_CONF_FILE $SYSCONF_FILE

echo "copying sysconfig file"
\cp -f ${SYSCONF_FILE} ${SYSCONF_DEST}
. ${SYSCONF_DEST}


install_nginx.sh
install_node.sh
install_grunt_cli.sh
install_ruby.sh
install_compass.sh
install_nginx.sh

echo "cloning [${GIT_LOCATION}] branch [${GIT_BRANCH}] to [${DEST_FOLDER}]"
git clone -b $GIT_BRANCH $GIT_LOCATION $DEST_FOLDER


echo "copying [${PROD_CONF_FILE}] to [${CONF_FILE}]"
\cp -f ${PROD_CONF_FILE} ${CONF_FILE}

echo "TODO : setting up nginx site configuration"

echo "upgrading system"
./upgrade.sh







