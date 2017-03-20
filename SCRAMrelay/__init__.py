from flask import Flask
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

st = logging.StreamHandler()
st.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s [%(name)s] %(levelname)s :: %(message)s")
st.setFormatter(formatter)
logger.addHandler(st)

app = Flask(__name__)

import SCRAMrelay.views
