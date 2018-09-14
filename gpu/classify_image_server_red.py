from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import argparse
import os.path
import re
import sys
import tarfile
import numpy as np
from six.moves import urllib
import tensorflow as tf
import time
import os
from http.server import BaseHTTPRequestHandler
import cgi
import uuid
import json
os.environ["CUDA_VISIBLE_DEVICES"] = "0"
filename=""
class   PostHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={'REQUEST_METHOD':'POST',
                     'CONTENT_TYPE':self.headers['Content-Type'],
                     }
        )
        self.send_response(200)
        self.end_headers()
        #self.wfile.write('Client: %sn ' % str(self.client_address) )
        #self.wfile.write('User-agent: %sn' % str(self.headers['user-agent']))
        #self.wfile.write('Path: %sn'%self.path)
        #self.wfile.write('Form data:n')
        print(self.headers)
        for field in form.keys():
            field_item = form[field]
            global filename
            filename = field_item.filename
            filevalue  = field_item.value
            filesize = len(filevalue)#文件大小(字节)
            #print len(filevalue)
            print (filename)
            basename = os.path.basename(filename)
            name, ext = os.path.splitext(basename)
            filename = str(uuid.uuid1()) + ext
            with open("./tmp/"+filename,'wb') as f:
                f.write(filevalue)
            result=run_inference_on_image("./tmp/"+filename)
        self.wfile.write(result.encode('utf-8'))
        return


def StartServer():
    from http.server import HTTPServer
    sever = HTTPServer(("",5004),PostHandler)
    sever.serve_forever()

class NodeLookup(object):
    def __init__(self,
               label_path=None):
        if not label_path:
            tf.logging.fatal('please specify the label file.')
            return
        self.node_lookup = self.load(label_path)

    def load(self, label_path):
        proto_as_ascii_lines = tf.gfile.GFile(label_path).readlines()
        id_to_human = {}
        for line in proto_as_ascii_lines:
            if line.find(':') < 0:
                continue
            _id, human = line.rstrip('\n').split(':')
            id_to_human[int(_id)] = human
        return id_to_human

    def id_to_string(self, node_id):
        if node_id not in self.node_lookup:
            return ''
        return self.node_lookup[node_id]


def create_graph(model_file=None):
    with open(model_file, 'rb') as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())
        _ = tf.import_graph_def(graph_def, name='')


def init(model_file=None):
    pre=time.time()
    config = tf.ConfigProto()
    config.gpu_options.allow_growth=True
    sess = tf.Session(config=config)
    create_graph(model_file)
    softmax_tensor = sess.graph.get_tensor_by_name('InceptionV4/Logits/Predictions:0')
    #softmax_tensor = sess.graph.get_tensor_by_name('InceptionV3/Predictions/Reshape_1:0')
    print(time.time()-pre)    
    return softmax_tensor


def run_inference_on_image(image):
    num_top_predictions =10
    if not tf.gfile.Exists(image):
        tf.logging.fatal('File does not exist %s', image)
    image_data = open(image, 'rb').read()
    config = tf.ConfigProto()
    config.gpu_options.allow_growth=True
    with tf.Session(config=config) as sess:
        predictions = sess.run(softmax_tensor,{'input:0': image_data})
        predictions = np.squeeze(predictions)
        node_lookup = NodeLookup(label_file)
        top_k = predictions.argsort()[-num_top_predictions:][::-1]
        top_names = []
        for node_id in top_k:
            human_string = node_lookup.id_to_string(node_id)
            top_names.append(human_string)
            score = predictions[node_id]
            print('id:[%d] name:[%s] (score = %.5f)' % (node_id, human_string, score))
        result={}
        for node_id, human_name in zip(top_k, top_names):
            result[human_name] = float(predictions[node_id])
        return json.dumps(result)
#model_file='mcookie_inception_v3_freeze.pb'
#label_file='mcookie_inception_v3_freeze.label'
model_file='red_inception_v4_freeze.pb'
label_file='red_inception_v4_freeze.label'
image_file='13.jpg'
num_top_predictions=5
softmax_tensor=init(model_file)
for i in range(0,20):
    run_inference_on_image('0.jpg')
StartServer()