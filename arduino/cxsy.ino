#define MOTOR_FWD 5
#define MOTOR_REV 6
#define SENSOR 2
#define Light 4
#define STOP 3

static int JZ=0;
static int JSQ=0;
static int Start=0;
static int End=0; 
static int m=0;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); 
  pinMode(MOTOR_FWD,OUTPUT);
  pinMode(MOTOR_REV,OUTPUT);
  pinMode(SENSOR,INPUT);
  pinMode(Light,INPUT);
  pinMode(STOP,INPUT);
  attachInterrupt(0, JiShuQi, FALLING);
  Serial.println('START');
  //attachInterrupt(1, STOPon, CHANGE);
}
void loop() {
  String a=Serial.readStringUntil('\r');
  //Serial.println(a);
  if(a=="JZ") JZon();
  else if(isDigit(a[0]) or isDigit(a[1]))
  {
    int con=a.toInt();
    On(con);
    Serial.println("OKOKOKOKO");
  }
  delay(10);
}
void JiShuQi()
{
  JSQ++;
  //Serial.println(JSQ);
}
void JZon()
{
  //Serial.println("entering JZ");
  digitalWrite(MOTOR_FWD,HIGH);
  while(digitalRead(Light)==LOW);
  digitalWrite(MOTOR_FWD,LOW);
  Start=JSQ;
  Serial.print("Start");
  Serial.println(Start);
  delay(1000);
  digitalWrite(MOTOR_FWD,HIGH);
  //delay(1000);
  while(digitalRead(Light)==LOW);
  digitalWrite(MOTOR_FWD,LOW);
  End=JSQ;
  JZ=abs(Start-End);
  Serial.println("OK");
  Serial.print("END");
  Serial.println(End);
  Serial.print("JZ");
  Serial.println(JZ);
}
void waitForSensor(int con)
{
  Start=JSQ;
  m=JSQ;
  while((JSQ-Start)<0.385*con*JZ)
  {
    Serial.println();  
  }
}
void STOPon()
{
  Serial.println("STOP");
  digitalWrite(MOTOR_REV,LOW);
  digitalWrite(MOTOR_FWD,LOW);
  while(1);
}
void On(int con)
{
  if(con>0)
  {
    digitalWrite(MOTOR_FWD,HIGH);
    waitForSensor(con);
    digitalWrite(MOTOR_FWD,LOW);
  }
  else if(con<0)
  {
    digitalWrite(MOTOR_REV,HIGH);
    con=-con;
    waitForSensor(con);
    digitalWrite(MOTOR_REV,LOW);
  }
}
