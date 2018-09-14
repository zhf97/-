import cv2
import numpy as np
import colorList
from http.server import BaseHTTPRequestHandler
#import requests
import pycurl
import cgi
import os
import uuid
import json
# 处理图片

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
	    #print (filename)
            basename = os.path.basename(filename)
            name, ext = os.path.splitext(basename)
            filename = str(uuid.uuid1()) + ext
            with open("./tmp/"+filename,'wb') as f:
                 f.write(filevalue)
            result_1=SendPhoto_1("./tmp/"+filename)
            result_json=json.loads(result_1)
            choice=max(result_json,key=result_json.get)
            if(choice=='mcookie'):
                result=get_color("./tmp/"+filename)
                if(result=='green'):
                    fr=SendPhoto(5002,"./tmp/"+filename)
                elif(result=='yellow'):
                    fr=SendPhoto(5003,"./tmp/"+filename)
                elif(result=='red'):
                    fr=SendPhoto(5004,"./tmp/"+filename)
                elif(result=='blue'):
                    fr=SendPhoto(5005,"./tmp/"+filename)
                self.wfile.write(fr.encode('utf-8'))
            else:
                self.wfile.write(result_1.encode('utf-8'))
        return

def SendPhoto(dk,filename):
    cmd = 'curl ' +'http://10.106.128.100:'+str(dk) + '/ -F "file=@' + filename +'"'
    print(cmd)
    #c=pycurl.Curl()
	#c.setopt(c.URL,url)
	#files = {'file': open(filename, 'rb')}
    #r = requests.post(url, files=files)
    #print r.text
    result = os.popen(cmd)
    return result.read()

def SendPhoto_1(filename):
    cmd = 'curl ' +'http://10.106.128.100:5006'+ '/ -F "file=@' + filename +'"'
    print(cmd)
    #c=pycurl.Curl()
	#c.setopt(c.URL,url)
	#files = {'file': open(filename, 'rb')}
    #r = requests.post(url, files=files)
    #print r.text
    result = os.popen(cmd)
    return result.read()
		
def StartServer():
    from http.server import HTTPServer
    sever = HTTPServer(("",5001),PostHandler)
    sever.serve_forever()

def get_color(filename):
    frame = cv2.imread(filename)
    #print('go in get_color')
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    maxsum = -100
    color = None
    color_dict = colorList.getColorList()
    for d in color_dict:
        mask = cv2.inRange(hsv, color_dict[d][0], color_dict[d][1])
        cv2.imwrite(d + '.jpg', mask)
        binary = cv2.threshold(mask, 127, 255, cv2.THRESH_BINARY)[1]
        binary = cv2.dilate(binary, None, iterations=2)
        img, cnts, hiera = cv2.findContours(binary.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        sum = 0
        for c in cnts:
            sum += cv2.contourArea(c)
        if sum > maxsum:
            maxsum = sum
            color = d

    return color

if __name__ == '__main__':
    StartServer()

