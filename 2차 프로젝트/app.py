from flask import Flask, session, render_template, redirect, request, url_for
from markupsafe import escape
from datetime import timedelta, datetime
import random

app = Flask(__name__)
app.secret_key = f"I'm_on_TOP!{random.randint(0, 99999):0>5}"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=60) # 로그인 지속 시간

######### 메인 화면 #########
@app.route('/') # home 
def index() :
    return render_template('mapAPI.html')

if __name__ == '__main__' :
    app.run(debug=True)