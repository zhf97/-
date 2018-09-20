import serial
import copy
#import binascii
import time
import threading
import os
import cv2
import time
import urllib
from urllib import parse
from urllib import request
import json
import random
import uuid
import requests
import RPi.GPIO as GPIO
from PIL import Image

laser=37
motor2=35
push=33
STOP_w=31
GPIO.setmode(GPIO.BOARD)
#GPIO.setup(laser, GPIO.IN)
GPIO.setup(motor2, GPIO.OUT)
GPIO.setup(STOP_w,GPIO.OUT)
GPIO.setup(push,GPIO.OUT)
GPIO.setup(laser, GPIO.IN, pull_up_down=GPIO.PUD_UP)
ser=serial.Serial('/dev/ttyACM0',9600)
#GLOBL var begins
host="www.jl-lagrange.com.cn"
working_uuid=""
order=""
DUSTMAX=20
round=0
finish_round=0
DUSTlist=[]
DUST_count=0
current=0
BIN=5
THING=19
DUST=0
DUST_t=0
port=5000
#arr=[[0,0,0,0,0,0,0],[1,2,3,4,0,0,0],[1,1,1,1,3,5,6],[1,2,4,5,6,5,4],[1,2,4,5,6,5,4],[1,2,4,5,6,5,4],[1,2,4,5,6,5,4],[1,2,4,5,6,5,4]]
part={"core_f":1,"core_b":1,"TTL_f":2,"TTL_b":2,"zigbee_b":3,"zigbee_f":3,"wifi_b":4,'wifi_f':4,"RTC_f":5,"RTC_b":5,"OLED_f":6,"OLED_b":6,"motor_f":7,"motor_b":7,"bluetooth_f":8,"bluetooth_b":8,"base_b":9,"base_f":9,"audio_b":10,"audio_f":10,"audioshield_b":11,"audioshield_f":11,"amp_b":12,"amp_f":12,"battery":13,"cable":14,"motor":15,"remote":16,"speaker":17,"sensor_black":18,"sensor_green":18,"sensor_trans":18}
arr=[]
for i in range (0,BIN):
     tt=[]
     for j in range(0,THING):
         tt.append(0)
     arr.append(tt)
count=0
DUST_ct=0
#ser=serial.Serial('/dev/ttyACM0',9600)

#CLASS BEGINS
class UARTrec(threading.Thread):#UART recieved used for emergency stop
    def __init__(self,ser):
        threading.Thread.__init__(self)
        self.ser=ser
    def run(self):
        while True:
            time.sleep(0.1)
            n = self.ser.inWaiting()
            if(n==0): continue
            data=self.ser.read(n)
            #print(n)
            print(data)
            if(data==b'STOP'): 
                STOP_all()
                #update('emergencystop','',[],'','','')
                #raise Exception("Emergency STOP!")
                #quit()
                os.system('exit')
                
class GUI():#LCD operation dependency
    'LCD display class,page0 startup, page1 QR,page2 operating, page3 stop'
    def __init__(self):
        self.ser=serial.Serial('/dev/ttyUSB0',9600)
        self.stop=b'\xff\xff\xff'     
    def send(self,cmd):
        self.ser.write(cmd.encode('gb2312'))
        print(cmd)
        self.ser.write(self.stop)
    def startup(self):
        self.send('page page0')
    def selfcheck(self,pro):
        if(pro==1):
            self.send('t1.txt="自检中：网络联通性"')
            for i in range(0,26):
                time.sleep(0.1)
                self.send('t2.txt="'+str(i)+'%"')
                self.send('j0.val='+str(i))
        if(pro==2):
            self.send('t1.txt="自检中：摄像头"')
            for i in range(26,51):
                time.sleep(0.1)
                self.send('t2.txt="'+str(i)+'%"')
                self.send('j0.val='+str(i))
        if(pro==3):
            self.send('t1.txt="自检中：电机初始化"')
            for i in range(51,76):
                time.sleep(0.1)
                self.send('t2.txt="'+str(i)+'%"')
                self.send('j0.val='+str(i))
        if(pro==4):
            self.send('t1.txt="自检中：模型预热"')
            for i in range(76,101):
                time.sleep(0.1)
                self.send('t2.txt="'+str(i)+'%"')
                self.send('j0.val='+str(i))
    def standby(self):
        self.send('page page2')
        self.send('t1.txt=""')
        self.send('t3.txt=""')
        self.send('t5.txt=""')
        self.send('j0.val=0')     
        self.send('g0.bco=65504')
        self.send('g0.txt="等待任务指令..."') 
    def working(self):
        self.send('t3.txt="0"')
        self.send('t5.txt="0%"')
        self.send('g0.bco=2016')
        self.send('g0.txt="运行中..."')
        self.rec=UARTrec(self.ser)  
        self.rec.start()      
    def refresh(self,mk,yc,jd):
        self.send('t1.txt="'+mk+'"')
        self.send('t3.txt="'+str(yc)+'"')
        self.send('t5.txt="'+str(jd)+'%"')
        self.send('j0.val='+str(jd))
    def full(self):
        self.send('t3.txt="满!"')
        self.send('g0.txt="故障..."')
        self.send('g0.bco=59392')
    def defull(self):
        self.send('t3.txt="0"')
        self.send('g0.bco=2016')
        self.send('g0.txt="运行中..."')
    def finish(self):
        self.send('t5.txt="100%"')
        self.send('g0.txt="完成..."')
        self.send('g0.bco=2016')
        self.send('j0.val=100')
    def QR(self):
        self.send('page page1')
        self.send('qr0.txt="http://www.jl-lagrange.com.cn"')   

#function 1 startup
def internet_check():
    # t= threading.Thread(target=LCD1.selfcheck,args=(1,))
    # t.start()
    LCD1.selfcheck(1)
    exit_code = os.system('ping '+host+' -c 1')
    #print(exit_code)
    #exit_code=0
    return exit_code
def camera_check():
    LCD1.selfcheck(2)
    cap=cv2.VideoCapture(0)
    ret,photo=cap.read()
    cap.release()
    if(not photo.any()):
        return 1
    else:
        return 0
def motor_check():
    LCD1.selfcheck(3)
    motor_JZ(ser)
    return 0
def model_check():
    #LCD1.selfcheck(4)
    t= threading.Thread(target=LCD1.selfcheck,args=(4,))
    t.start()
    import tensorflow as tf 
    return 0
def startup():
    while(internet_check()):
        pass
    while(camera_check()):
        pass
    while(motor_check()):
        pass
    while(model_check()):
        pass
    LCD1.standby()
    #time.sleep(5) 

#wait for order
def check(option=2):
    global working_uuid,order
    if(option==1):
        test_data={'option':'1',"uuid":working_uuid}
    else:
        test_data = {'option':'2'}
    test_data_urlencode = urllib.parse.urlencode(test_data).encode('utf-8')
    requrl = "https://"+host+"/cxsy/get_order.php"
    req = urllib.request.Request(url = requrl,data =test_data_urlencode)
    #print(req)
    res_data = urllib.request.urlopen(req)
    res = res_data.read()
    print(res)
    if(res):
        result=json.loads(res.decode('utf-8'))
        working_uuid=result['uuid']
        order=result['list']
        return 0
    else:
        return 1
def waiting():
    while(check()):
        print('waiting')
        pass

#working
def conv(order):
    temp=json.loads(order)
    print(temp)
    global arr
    c=0
    for i in temp:
        if(isinstance(i, dict)):
            print(i)
            for j in i:
                arr[c][int(j)-1]=i[j]
        c=c+1
    print(arr)   
def update(status,stat,arr_b,DUST,mk,id=0,flag=False):
    jd=[]
    if(flag):
        for i in range(1,BIN):
            c1=0
            c2=0
            for j in range(0,THING):
                c1=c1+arr_b[i][j]
                c2=c2+arr[i][j]
            print(c1,c2)
            if(c1!=0):
                jd.append(float('%.2f' % ((1.00-float(c2/c1)))))
        print(jd)            
    data={"status":status,"stat":jd,"stat_all":stat,"DUST":DUST,"mk":mk,"id":id}
    data=json.dumps(data)
    data={"data":data}
    test_data_urlencode = urllib.parse.urlencode(data).encode('utf-8')
    requrl = "https://"+host+":"+str(port)+"/update"
    req = urllib.request.Request(url = requrl,data =test_data_urlencode)
    #print(req)
    res_data = urllib.request.urlopen(req)    

def motor(control,ser):
    ser.write(str(control).encode('utf-8'));
    while True:
            time.sleep(0.1)
            n = ser.inWaiting()
            if(n==0): continue
            data=ser.read(n).decode("gb2312")
            print(data)
            if(data.find('OK')>=0):
                break
def motor_JZ(ser):
    ser.write("JZ".encode('utf-8'));
    while True:
            time.sleep(0.1)
            n = ser.inWaiting()
            if(n==0): continue
            data=ser.read(n)
            data=data.decode("gb2312")
            print(data)
            if(data.find('OK')>=0):
                break

def STOP_all():
    GPIO.output(STOP_w, GPIO.HIGH)
    time.sleep(0.1)
    GPIO.output(STOP_w,GPIO.LOW)
    update('emergencystop','',[],'','','')
    raise Exception("Emergency STOP!")
    GPIO.cleanup()
    quit()
def motor2_o():
    GPIO.output(motor2, GPIO.HIGH)
    while(GPIO.input(laser)):
        pass
    time.sleep(0.5)
    GPIO.output(motor2,GPIO.LOW)

def push_o():
    GPIO.output(push,GPIO.HIGH)
    time.sleep(0.1)
    GPIO.output(push,GPIO.LOW)

def sum(arr):
    count=0
    #global arr
    for j in arr:
        for i in j:
           count=count+i
    return count
def check_zero():
    global arr
    for j in range(1,BIN):
        for i in arr[j]:
            if(i!=0): return True
    return False
def check_need(id):
    search=[]
    global current
    search.append(current)
    for i in range(2,BIN+1):
        t=current+int(i/2)*(-1)**(i)
        if(t<0):t=t+BIN
        if(t>=BIN):t=t-BIN
        search.append(t)
    print(search)
    for i in search:
        flag=False
        if(arr[i][id]):
            next=i
            arr[i][id]=arr[i][id]-1
            flag=True
            break
    if(not flag):
        global DUST
        next=DUST
        global DUST_count
        global DUST_ct
        global DUST_t
        DUST_t=id
        DUST_count=DUST_count+1
        DUST_ct=DUST_ct+1
        DUSTlist.append(id)
    return next,flag
def photo(img,id):
    url="https://"+host+"/cxsy/photo.php?id="+id
    files = {'file':open(img,'rb')}
#data = {'enctype':'multipart/form-data','name':'wang'}
    reponse = requests.post(url,files=files)
    text = reponse.text
    print (text)
def compute(img):
    url="http://"+host+":8080"
    files = {'file':open(img,'rb')}
#data = {'enctype':'multipart/form-data','name':'wang'}
    reponse = requests.post(url,files=files)
    text = reponse.text
    print (text)
    return text
def capture():
    os.system('v4l2-ctl -c focus_auto=0')   
    os.system('v4l2-ctl -c focus_absolute=66')
    cap=cv2.VideoCapture(0)
    cap.set(3,1280)
    cap.set(4,720)
    ret,frame=cap.read()
    cap.release()
    photoid=str(uuid.uuid1())
#img='7.jpg'
#compute()
    img=photoid+'.jpg'
    cv2.imwrite(img,frame)
    ph=Image.open(img)
    out=ph.resize((299,299),Image.ANTIALIAS)
    out.save("resize"+img,'jpeg')
    return compute("resize"+img),img,photoid
#main
LCD1=GUI()
LCD1.startup()
startup()
waiting()
conv(order)
print(arr)
LCD1.working()
count =sum(arr)
print(count)
arr_b=copy.deepcopy(arr)
while (check_zero()): 
    print('start')
    motor2_o()
    #wait for sensor()  
    #capture()
    #i=random.randint(0,THING-1)
    result,img,photoid=capture()
    result_json=json.loads(result)
    mk=max(result_json,key=result_json.get)
    i=part[mk]
    #i=random.randint(0,THING-1)
    next,flag=check_need(i)
    print(finish_round,DUST_ct,finish_round-DUST_ct)
    jd=float('%.2f' % ((finish_round-DUST_ct)/count*100))
    jd_g=int(jd)
    #jd=round(jd,2)
    LCD1.refresh(mk=str(i),yc=DUST_count,jd=jd_g)
    if(next!=current):
        round=round+1
    finish_round=finish_round+1
    photo(img,photoid)
    photoid='1'
    if(not flag):
        update('normal',jd,arr_b,1,mk,photoid,True)
    else:
        update('normal',jd,arr_b,0,mk,photoid,True)
    if(next-current<0):
        z=next-current+BIN
    else:
        z=next-current
    print(z)
    motor(z,ser)
    time.sleep(1)
    push_o()
    print(current)
    current=next
    if(round>=10 and (current==0 or current ==1)):
        round=0
        update('jz','',arr_b,'','')
        motor_JZ(ser)    
        curren=0
    #motor(z,ser)  
    #push_o
    #print(current)
    
    print(next)
    time.sleep(2)
    if(DUST_count==DUSTMAX):
        update('GJ','',arr_b,'','')
        LCD1.full()
        time.sleep(10)
        LCD1.defull()
        DUST_count=0
LCD1.finish()
check(1)
update('finish',jd,arr_b,'','','')
