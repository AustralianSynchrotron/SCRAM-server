from SCRAMserver import app,logger


@app.route('/')
def hello_world():
    return 'Hello World! Just imagine a fancy new web interface to the <b>Superior Control Room Alarm Management</b> software right here on this page'


@app.route('/input/<source>/<input_string>', methods=['POST'])
def input(source,input_string):
    if source == 'ALH':
        logger.info("Received [%s]: %s" % (source,input_string))
