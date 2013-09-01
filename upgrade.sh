SYSCONF_DEST=/etc/sysconfig/hpwidget
. $SYSCONF_DEST

echo "I am checking out revision $1" > upgrade.output

echo "pulling from git"
git pull origin master

echo "checking out $1"
git checkout $1

echo "running npm install"
npm install

echo "running bower install"
bower install

echo "running grunt --force"
grunt build --force

echo "updating monit configuration"
MONIT_PIDFILE=$DEST_DIR/RUNNING_PID
cat conf/monit.conf | sed 's,__monit_pidfile__,'"$MONIT_PIDFILE"',' > /etc/monit.d/hpwidget

echo "copying service script"
\cp -f conf/initd.conf /etc/init.d/hpwidget

echo "restarting server"
nohup service hpwidget restart &
