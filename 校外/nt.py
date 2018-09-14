#import psutil
import time
from OpenSSL import SSL
from flask import Flask,  request
from flask_socketio import SocketIO, emit
# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
context = SSL.Context(SSL.SSLv23_METHOD)
context.use_privatekey_file('www.jl-lagrange.com.cn-key.pem')
context.use_certificate_file('www.jl-lagrange.com.cn-crt.pem')
async_mode = None
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)

@socketio.on('connect', namespace='/update')
def index():
    #emit('update','123')
    print('123')

@app.route('/')
def index():
    return "hello world"

@app.route('/update', methods=['POST'])
def register():
    data=request.form['data']
    #status=request.form['status']
    #img=request.form['img']
    socketio.emit('update',{'data':data},namespace='/update')
    return 'success'

if __name__ == '__main__':
    #context=("www.jl-lagrange.com.cn.crt","www.jl-lagrange.com.cn.key")
    socketio.run(app, host="0.0.0.0",debug=True,certfile='www.jl-lagrange.com.cn-crt.pem', keyfile='www.jl-lagrange.com.cn-key.pem',ca_certs='ca-www.jl-lagrange.com.cn-crt.pem')