from SCRAMserver import app,logger
from flask import request

@app.route('/')
def hello_world():
    return 'Hello World! Just imagine a fancy new web interface to the <b>Superior Control Room Alarm Management</b> software right here on this page'


@app.route('/input/<source>/', methods=['POST'])
def input(source):
    if source == 'ALH':
        input_string = request.form['alh_string']
        logger.info("Received [%s]: %s" % (source,input_string))

    return "Success!"
