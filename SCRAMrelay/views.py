from SCRAMrelay import app,logger
from flask import request
import requests



@app.route('/')
def hello_world():
    return 'Hello World! Just imagine a fancy new web RELAY interface to the <b>Superior Control Room Alarm Management</b> software right here on this page'


@app.route('/relay/<source>/', methods=['POST'])
def input(source):
    if source == 'ALH':
        input_string = request.form['alh_string']
        logger.info("Received [%s]: %s" % (source,input_string))
        url = "http://10.6.100.198:9669/input/%s/" % (source)
        r = requests.post( url , data={"alh_string":input_string})
        logger.info("Forwarded [%s]: %s to %s with result: %s" % (source,input_string,url,r.text))
