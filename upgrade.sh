echo "I am checking out revision $1" > upgrade.output

echo "pulling from git"
git pull

echo "checking out $1"
git checkout $1

echo "running npm install"
npm install

echo "running bower install"
bower install

echo "running grunt --force"
grunt build --force
