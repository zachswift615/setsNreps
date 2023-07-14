# Sets & Reps

<img width="372" alt="image" src="https://user-images.githubusercontent.com/9255115/159035366-3328c724-c3e5-44f0-b422-83f5323911a9.png">


Local set up
```
$ git clone git@github.com:zachswift615/setsNreps.git
$ cd setsNreps
$ virtualenv venv --python=python3.6
$ source venv/bin/activate 
$ pip install -r requirements.txt
$ cd setsNreps
$ npm install
$ python manage.py migrate
$ python manage.py runserver # in one terminal 
$ npm start # in another terminal
```
That will open the UI at localhost:3000

If you want to add exercises, visit localhost:8000/admin after you `python manage.py createsuperuser --email "youremail@example.com"`
