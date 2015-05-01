//import geomerative.*;
//
//RFont f;
//RShape grp;
//RShape grp1;
//RShape grp2;
//RShape grp3;
//RShape grp4;
//RShape grp5;
//RShape grp6;
//RShape grp7;
//RShape grp8;
//RPoint[] points;

ParticleSystem ps;
ParticleSystem1 ps1;
ParticleSystem2 ps2;
ParticleSystem3 ps3;

int maze = 550;
Button [] button = new Button[maze];
boolean[] start = new boolean [maze];
Mover0[] movers0 = new Mover0[3];
Mover[] movers = new Mover[250];
Mover2[] movers2 = new Mover2[150];
Mover3[] movers3 = new Mover3[550];
Mover4[] movers4 = new Mover4[1250];
Mover5[] movers5 = new Mover5[12];
Mover6[] movers6 = new Mover6[50];
Mover7[] movers7 = new Mover7[5];
float a = 0.0;
float xsp=1.1;
float ysp=1.3;
Ball[] balls =  { 
  new Ball(320, 180, 10),
  new Ball(320, 220, 10) 
};

Ball0[] balls0 = {
  new Ball0(320, 220, 30) 
};
Ball2[] balls2 =  { 
  new Ball2(100, 180, 10),
  new Ball2(230, 250, 10),
  new Ball2(360, 230, 10),
  new Ball2(490, 500, 10), 
  new Ball2(420, 600, 10),
};

Ball3[] balls3 = {
  new Ball3(320, 220, 70) 
};

Ball4[] balls4 = {
  new Ball4(320, 220, 140) 
};

Rect rects;
boolean[] bt = new boolean[550];

PGraphics pdf;

float angle;
float jitter;

class Button{
  int x,y;
  int size;
  color bGray;
  color oGray;
  color pGray;
  boolean over = false;
  boolean pressed = false;
  
  Button(int xp, int yp, int s, color b, color o, color p){
    x = xp;
    y = yp;
    size = s;
    bGray = b;
    oGray = o;
    pGray = p;      
  }
  
  Button(){
  }
  
  
  void update(){
    if((mouseX>=x)&&(mouseX<=x+size)&&(mouseY>=y)&&(mouseY<=y+size)){
      over = true;
    }else{
      over = false;
    }
  }
  
  boolean press(){
   if (over == true){
     pressed = true;
     return true;
   }else{
     return false;
   }
  }
  
  void release(){
    pressed = false;
  }
  
  void display(){
    if( pressed == true){
      fill(pGray);
    }else if(over == true){
      fill(oGray);
    }else{
      fill(bGray);
    }
    stroke(20);
    strokeWeight(0.75);
    rect(x,y,size,size);
     
  }
}



class Rect {
  PVector position;
  PVector velocity;
  float x,y;
  int size;
  color bGray;
  color oGray;
  color pGray;
  boolean over = false;
  boolean pressed = false;
  
  Rect(int xp, int yp, int s, color b, color o, color p){
    x = xp;
    y = yp;
    size = s;
    bGray = b;
    oGray = o;
    pGray = p;      
  }
  
  void update(){
    if((mouseX>=x)&&(mouseX<=x+size)&&(mouseY>=y)&&(mouseY<=y+size)){
      over = true;
    }else{
      over = false;
    }
  }
  
  boolean press(){
    if(over == true){
      pressed = true;
      return true;
    }else{
      return false;
    }
  }
  
  void release(){
    pressed = false;
  }
  
  void display(){
    x = x + xsp;
    y = y + ysp;
    if ((x > width-size) || (x < 0)) {
      xsp = xsp * -1;
    }
    if ((y > height-size)||(y<0)){
      ysp = ysp * -1;
    }
    if( pressed == true){
      fill(pGray);
    }else if(over == true){
      fill(oGray);
    }else{
      fill(bGray);
    }
    stroke(100);
    strokeWeight(0.75);
    rect(x,y,size,size);
  }
}

class Ball {
  PVector position;
  PVector velocity;

  float r, m;

  Ball(float x, float y, float r_) {
    position = new PVector(x, y);
    velocity = new PVector(random(-1,1),random(-1,1));
    velocity.mult(5);
    r = r_;
    m = r*.1;
  }

  void update() {
    position.add(velocity);
  }

  void checkBoundaryCollision() {
    if (position.x > width-r) {
      position.x = width-r;
      velocity.x *= -1;
    } 
    else if (position.x < r) {
      position.x = r;
      velocity.x *= -1;
    } 
    else if (position.y > height-r) {
      position.y = height-r;
      velocity.y *= -1;
    } 
    else if (position.y < r) {
      position.y = r;
      velocity.y *= -1;
    }
  }
  
  void checkCollision(Ball other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }


  void display() {
    stroke(0);
    strokeWeight(0.75);
    fill(240);
    ellipse(position.x, position.y, r*2, r*2);
  }
}

class Ball0 {
  PVector position;
  PVector velocity;

  float r, m;

  Ball0(float x, float y, float r_) {
    position = new PVector(x, y);
    velocity = new PVector(random(-1,1),random(-1,1));
    velocity.mult(5);
    r = r_;
    m = r*.1;
  }

  void update() {
    position.add(velocity);
  }

  void checkBoundaryCollision() {
    if (position.x > width-r) {
      position.x = width-r;
      velocity.x *= -1;
    } 
    else if (position.x < r) {
      position.x = r;
      velocity.x *= -1;
    } 
    else if (position.y > height-r) {
      position.y = height-r;
      velocity.y *= -1;
    } 
    else if (position.y < r) {
      position.y = r;
      velocity.y *= -1;
    }
  }
  
  void checkCollision(Ball other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }
  
  void checkCollision(Ball2 other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }


  void display() {
    stroke(20);
    strokeWeight(0.75);
    noFill();
    ellipse(position.x, position.y, r*2, r*2);
  }
}

class Ball3 {
  PVector position;
  PVector velocity;

  float r, m;

  Ball3(float x, float y, float r_) {
    position = new PVector(x, y);
    velocity = new PVector(random(-1,1),random(-1,1));
    velocity.mult(5);
    r = r_;
    m = r*.1;
  }

  void update() {
    position.add(velocity);
  }

  void checkBoundaryCollision() {
    if (position.x > width-r) {
      position.x = width-r;
      velocity.x *= -1;
    } 
    else if (position.x < r) {
      position.x = r;
      velocity.x *= -1;
    } 
    else if (position.y > height-r) {
      position.y = height-r;
      velocity.y *= -1;
    } 
    else if (position.y < r) {
      position.y = r;
      velocity.y *= -1;
    }
  }
  
  void checkCollision(Ball0 other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }
  
  void checkCollision(Ball other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  } 
 
  void display() {
    stroke(20);
    strokeWeight(0.75);
    fill(255);
    ellipse(position.x, position.y, r*2, r*2);
  }
  
}

class Ball2 {
  PVector position;
  PVector velocity;

  float r, m;

  Ball2(float x, float y, float r_) {
    position = new PVector(x, y);
    velocity = new PVector(random(-1,1),random(-1,1));
    velocity.mult(3);
    r = r_;
    m = r*.1;
  }

  void update() {
    position.add(velocity);
  }

  void checkBoundaryCollision() {
    if (position.x > width-r) {
      position.x = width-r;
      velocity.x *= -1;
    } 
    else if (position.x < r) {
      position.x = r;
      velocity.x *= -1;
    } 
    else if (position.y > height-r) {
      position.y = height-r;
      velocity.y *= -1;
    } 
    else if (position.y < r) {
      position.y = r;
      velocity.y *= -1;
    }
  }
  
  void checkCollision(Ball2 other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }
  
  void checkCollision(Ball other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }
  
   void checkCollision(Ball3 other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }


  void display() {
    stroke(20);
    strokeWeight(0.75);
    noFill();
    ellipse(position.x, position.y, r*2, r*2);
  }
}

class Ball4 {
  PVector position;
  PVector velocity;

  float r, m;

  Ball4(float x, float y, float r_) {
    position = new PVector(x, y);
    velocity = new PVector(random(-1,1),random(-1,1));
    velocity.mult(4);
    r = r_;
    m = r*.1;
  }

  void update() {
    position.add(velocity);
  }

  void checkBoundaryCollision() {
    if (position.x > width-r) {
      position.x = width-r;
      velocity.x *= -1;
    } 
    else if (position.x < r) {
      position.x = r;
      velocity.x *= -1;
    } 
    else if (position.y > height-r) {
      position.y = height-r;
      velocity.y *= -1;
    } 
    else if (position.y < r) {
      position.y = r;
      velocity.y *= -1;
    }
  }
  
  void checkCollision(Ball other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }
  
  void checkCollision(Ball0 other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }
 
 void checkCollision(Ball2 other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }
  
  void checkCollision(Ball3 other) {

    PVector bVect = PVector.sub(other.position, position);

    float bVectMag = bVect.mag();

    if (bVectMag < r + other.r) {
      float theta  = bVect.heading();
      float sine = sin(theta);
      float cosine = cos(theta);

      PVector[] bTemp = {
        new PVector(), new PVector()
        };

      bTemp[1].x  = cosine * bVect.x + sine * bVect.y;
      bTemp[1].y  = cosine * bVect.y - sine * bVect.x;

      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

     
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

     
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  } 
 
  void display() {
    stroke(20);
    strokeWeight(0.75);
    noFill();
    ellipse(position.x, position.y, r*2, r*2);
  }
  
}



class Mover {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float topspeed;

  Mover() {
    location = new PVector(random(width),random(height));
    velocity = new PVector(0,0);
    topspeed = 4;
  }

  void update() {
    PVector mouse = new PVector(500+cos(a)*50.0, 80+sin(a)*50.0);
    PVector dir = PVector.sub(mouse,location);  
    dir.normalize();     
    dir.mult(0.5);        
    acceleration = dir;  
    a++;

    velocity.add(acceleration);
    velocity.limit(topspeed);
    location.add(velocity);
  }
  
  void display() {
    stroke(0);
    strokeWeight(0.75);
    fill(175);
    ellipse(location.x,location.y,2,2);
  }
 
  void checkEdges() {
    if (location.x > width) {
      location.x = 0;
    } else if (location.x < 0) {
      location.x = width;
    }
    if (location.y > height) {
      location.y = 0;
    }  else if (location.y < 0) {
      location.y = height;
    }
  }
}

class Mover0 {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float topspeed;

  Mover0() {
    location = new PVector(random(width),random(height));
    velocity = new PVector(0,0);
    topspeed = 3;
  }

  void update() {

    PVector mouse = new PVector(120+cos(a)*50.0, 80+sin(a)*50.0);
    PVector dir = PVector.sub(mouse,location); 
    dir.normalize();     
    dir.mult(0.5);        
    acceleration = dir;  
    a++;

    velocity.add(acceleration);
    velocity.limit(topspeed);
    location.add(velocity);
  }
  
  void display() {
    stroke(0);
    strokeWeight(0.75);
    fill(175);
    ellipse(location.x,location.y,2,2);
  }
  
   void checkEdges() {
    if (location.x > width) {
      location.x = 0;
    } else if (location.x < 0) {
      location.x = width;
    }
    if (location.y > height) {
      location.y = 0;
    }  else if (location.y < 0) {
      location.y = height;
    }
  }
}

class Mover2 {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float topspeed;

  Mover2() {
    location = new PVector(random(width),random(height));
    velocity = new PVector(0,0);
    topspeed = 6;
  }

  void update() {
    PVector mouse = new PVector(390+cos(a)*60.0, 770+sin(a)*60.0);
    PVector dir = PVector.sub(mouse,location); 
    dir.normalize();     
    dir.mult(0.7);        
    acceleration = dir;  
    a++;

    velocity.add(acceleration);
    velocity.limit(topspeed);
    location.add(velocity);
  }
  
  void display() {
    stroke(0);
    strokeWeight(0.75);
    fill(175);
    ellipse(location.x,location.y,2,2);
  }
  
  void checkEdges() {
    if (location.x > width) {
      location.x = 0;
    }else if (location.x < 0) {
      location.x = width;
    }
    if (location.y > height) {
      location.y = 0;
    }else if (location.y < 0) {
      location.y = height;
    }
  }
}

class Mover3 {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float topspeed;

  Mover3() {
    location = new PVector(random(width),random(height));
    velocity = new PVector(0,0);
    topspeed = 6;
  }

  void update() {
    PVector mouse = new PVector(120+cos(a)*140.0, 700+sin(a)*140.0);
    PVector dir = PVector.sub(mouse,location); 
    dir.normalize();     
    dir.mult(0.4);        
    acceleration = dir;  
    a++;

    velocity.add(acceleration);
    velocity.limit(topspeed);
    location.add(velocity);
  }
  
  void display() {
    stroke(0);
    strokeWeight(0.75);
    fill(175);
    ellipse(location.x,location.y,2,2);
  }

  void checkEdges() {
    if (location.x > 190) {
      location.x = 190;
    }else if (location.x < 50) {
      location.x = 50;
    }
    if (location.y > 770) {
      location.y = 770;
    }else if (location.y < 230) {
      location.y = 230;
    }
  }
}

class Mover4 {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float topspeed;

  Mover4() {
    location = new PVector(random(width),random(height));
    velocity = new PVector(0,0);
    topspeed = 6;
  }

  void update() {
    PVector mouse = new PVector(310+cos(a)*250.0, 410+sin(a)*250.0);
    PVector dir = PVector.sub(mouse,location); 
    dir.normalize();     
    dir.mult(0.3);        
    acceleration = dir;  
    a++;

    velocity.add(acceleration);
    velocity.limit(topspeed);
    location.add(velocity);
  }
  
  void display() {
    stroke(0);
    strokeWeight(0.75);
    fill(175);
    ellipse(location.x,location.y,2,2);
  }
}

class Mover5 {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float topspeed;

  Mover5() {
    location = new PVector(random(width),random(height));
    velocity = new PVector(0,0);
    topspeed = 6;
  }

  void update() {
    PVector mouse = new PVector(240+cos(a)*50.0, 200+sin(a)*50.0);
    PVector dir = PVector.sub(mouse,location); 
    dir.normalize();     
    dir.mult(0.7);        
    acceleration = dir;  
    a++;

    velocity.add(acceleration);
    velocity.limit(topspeed);
    location.add(velocity);
  }
  
  void display() {
    stroke(0);
    strokeWeight(0.75);
    fill(175);
    ellipse(location.x,location.y,2,2);
  }
}

class Mover6 {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float topspeed;

  Mover6() {
    location = new PVector(random(width),random(height));
    velocity = new PVector(0,0);
    topspeed = 6;
  }

  void update() {
    PVector mouse = new PVector(510+cos(a)*30.0, 700+sin(a)*30.0);
    PVector dir = PVector.sub(mouse,location); 
    dir.normalize();     
    dir.mult(0.7);        
    acceleration = dir;  
    a++;

    velocity.add(acceleration);
    velocity.limit(topspeed);
    location.add(velocity);
  }
  
  void display() {
    stroke(0);
    strokeWeight(0.75);
    fill(175);
    ellipse(location.x,location.y,2,2);
  }
}

class Mover7 {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float topspeed;

  Mover7() {
    location = new PVector(random(width),random(height));
    velocity = new PVector(0,0);
    topspeed = 6;
  }

  void update() {
    PVector mouse = new PVector(120+cos(a)*50.0, 80+sin(a)*50.0);
    PVector dir = PVector.sub(mouse,location); 
    dir.normalize();     
    dir.mult(0.7);        
    acceleration = dir;  
    a++;

    velocity.add(acceleration);
    velocity.limit(topspeed);
    location.add(velocity);
  }
  
  void display() {
    stroke(0);
    strokeWeight(0.75);
    fill(175);
    ellipse(location.x,location.y,2,2);
  }
}

class Particle {
  PVector location;
  PVector velocity;
  PVector acceleration;
  float lifespan;
  
  float r, m;

  Particle(PVector l) {
    acceleration = new PVector(0,0.05);
    velocity = new PVector(random(-1,1),random(-2,0));
    location = new PVector(525,20);
    lifespan = 200.0;
  }

  void run() {
    update();
    display();
  }

  void update() {
    velocity.add(acceleration);
    location.add(velocity);
    lifespan -= 1.0;
  }

  void display() {
    noStroke();
    fill(random(location.y),random(location.y),random(location.y));
    ellipse(location.x,location.y,8,8);
  }
  
  boolean isDead() {
    if (lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}

class Particle1 {
  PVector location1;
  PVector velocity1;
  PVector acceleration1;
  float lifespan1;
  
  float r, m;

  Particle1(PVector l) {
    acceleration1 = new PVector(0,0.05);
    velocity1 = new PVector(random(-1,1),random(-2,0));
    location1 = new PVector(75,20);
  
    lifespan1 = 200.0;
  }

  void run1() {
    update();
    display();
  }

  void update() {
    velocity1.add(acceleration1);
    location1.add(velocity1);
    lifespan1 -= 1.0;
  }

  void display() {
    noStroke();
    fill(random(location1.y),random(location1.y),random(location1.y));
    ellipse(location1.x,location1.y,8,8);
  }
  
  boolean isDead() {
    if (lifespan1 < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}

class Particle2 {
  PVector location2;
  PVector velocity2;
  PVector acceleration2;
  float lifespan2;
  
  float r, m;

  Particle2(PVector l) {
    acceleration2 = new PVector(0,0.05);
    velocity2 = new PVector(random(-1,1),random(-2,0));
    location2 = new PVector(225,20);
  
    lifespan2 = 200.0;
  }

  void run2() {
    update();
    display();
  }

  void update() {
    velocity2.add(acceleration2);
    location2.add(velocity2);
    lifespan2 -= 1.0;
  }

  void display() {
    noStroke();
    fill(random(location2.y),random(location2.y),random(location2.y));
    ellipse(location2.x,location2.y,8,8);
  }
  
  boolean isDead() {
    if (lifespan2 < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}

class Particle3 {
  PVector location3;
  PVector velocity3;
  PVector acceleration3;
  float lifespan3;
  
  float r, m;

  Particle3(PVector l) {
    acceleration3 = new PVector(0,0.05);
    velocity3 = new PVector(random(-1,1),random(-2,0));
    location3 = new PVector(375,20);
  
    lifespan3 = 200.0;
  }

  void run3() {
    update();
    display();
  }

  void update() {
    velocity3.add(acceleration3);
    location3.add(velocity3);
    lifespan3 -= 1.0;
  }

  void display() {
    noStroke();
    fill(random(location3.y),random(location3.y),random(location3.y));
    ellipse(location3.x,location3.y,8,8);
  }
  
  boolean isDead() {
    if (lifespan3 < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}


class ParticleSystem {
  ArrayList<Particle> particles;
  PVector origin;

  ParticleSystem(PVector location) {
    origin = location.get();
    particles = new ArrayList<Particle>();
  }

  void addParticle() {
    particles.add(new Particle(origin));
  }
  
  void run() {
    for (int i = particles.size()-1; i >= 0; i--) {
      Particle p = particles.get(i);
      p.run();
      if (p.isDead()) {
        particles.remove(i);
      }
    }
  }
}

class ParticleSystem1 {
  ArrayList<Particle1> particles;
  PVector origin;

  ParticleSystem1(PVector location1) {
    origin = location1.get();
    particles = new ArrayList<Particle1>();
  }

  void addParticle1() {
    particles.add(new Particle1(origin));
  }
  
  void run1() {
    for (int i = particles.size()-1; i >= 0; i--) {
      Particle1 p = particles.get(i);
      p.run1();
      
      if (p.isDead()) {
        particles.remove(i);
      }
    }
  }
}

class ParticleSystem2 {
  ArrayList<Particle2> particles;
  PVector origin;

  ParticleSystem2(PVector location2) {
    origin = location2.get();
    particles = new ArrayList<Particle2>();
  }

  void addParticle2() {
    particles.add(new Particle2(origin));
  }
  
  void run2() {
    for (int i = particles.size()-1; i >= 0; i--) {
      Particle2 p = particles.get(i);
      p.run2();
      if (p.isDead()) {
        particles.remove(i);
      }
    }
  }
}

class ParticleSystem3 {
  ArrayList<Particle3> particles;
  PVector origin;

  ParticleSystem3(PVector location3) {
    origin = location3.get();
    particles = new ArrayList<Particle3>();
  }

  void addParticle3() {
    particles.add(new Particle3(origin));
  }
  
  void run3() {
    for (int i = particles.size()-1; i >= 0; i--) {
      Particle3 p = particles.get(i);
      p.run3();
      if (p.isDead()) {
        particles.remove(i);
      }
    }
  }
}


void setup() {
  size(600,840);
  smooth();
  background(220);
  for (int i = 0; i < movers.length; i++) {
    movers[i] = new Mover(); 
  }
  for (int i = 0; i < movers0.length; i++) {
    movers0[i] = new Mover0(); 
  }
  
  for (int i = 0; i < movers2.length; i++) {
    movers2[i] = new Mover2(); 
  }
  
  for (int i = 0; i < movers3.length; i++) {
    movers3[i] = new Mover3(); 
  }
  
  for (int i = 0; i < movers4.length; i++) {
    movers4[i] = new Mover4(); 
  }
  
  for (int i = 0; i < movers5.length; i++) {
    movers5[i] = new Mover5(); 
  }
  
  for (int i = 0; i < movers6.length; i++) {
    movers6[i] = new Mover6(); 
  }
  
  for (int i = 0; i < movers7.length; i++) {
    movers7[i] = new Mover7(); 
  }
  
  for (int i = 0; i < maze; i++) {
    button[i] = new Button(); 
  }
  color g = color(220,0);
  color w = color(255);
  color b = color(0);
  rects = new Rect(60, 560, 20, g,w,b);
  button[0] = new Button (240, 800,20, g,w,b);
  button[1] = new Button (240, 780,20, g,w,b);
  button[2] = new Button (260, 780,20, g,w,b);
  button[3] = new Button (280, 780,20, g,w,b);
  button[4] = new Button (300, 780,20, g,w,b);
  button[5] = new Button (320, 780,20, g,w,b);
  button[6] = new Button (340, 780,20, g,w,b);
  button[7] = new Button (360, 780,20, g,w,b);
  button[8] = new Button (380, 780,20, g,w,b);
  button[9] = new Button (400, 780,20, g,w,b);
  button[10] = new Button (380, 760,20, g,w,b);
  button[11] = new Button (420, 780,20, g,w,b);
  button[12] = new Button (440, 780,20, g,w,b);
  button[13] = new Button (460, 780,20, g,w,b);
  button[14] = new Button (480, 780,20, g,w,b);
  button[15] = new Button(500, 780, 20, g,w,b);
  button[16] = new Button (520, 780,20, g,w,b);
  button[17] = new Button (540, 780,20, g,w,b);
//  button[18] = new Button (560, 790,20, g,w,b);
//  button[19] = new Button (580, 790,20, g,w,b);
  button[20] = new Button (380, 740,20, g,w,b);
  button[21] = new Button (400, 740,20, g,w,b);
  button[22] = new Button (360, 740,20, g,w,b);
  button[23] = new Button (420, 740,20, g,w,b);
  button[24] = new Button (440, 740,20, g,w,b);
  button[25] = new Button (460, 740,20, g,w,b);
  button[26] = new Button (480, 740,20, g,w,b);
  button[27] = new Button (500, 740,20, g,w,b);
  button[28] = new Button (520, 740,20, g,w,b);
  button[29] = new Button (540, 740,20, g,w,b);
  button[30] = new Button (340, 740,20, g,w,b);
  button[31] = new Button (320, 740,20, g,w,b);
  button[32] = new Button (340, 720,20, g,w,b);
  button[33] = new Button (300, 740,20, g,w,b);
  button[34] = new Button (280, 740,20, g,w,b);
  button[35] = new Button (260, 740,20, g,w,b);
  button[36] = new Button (240, 740,20, g,w,b);
  button[37] = new Button (220, 740,20, g,w,b);
  button[38] = new Button (200, 740,20, g,w,b);
  button[39] = new Button (200, 760,20, g,w,b);
  button[40] = new Button (200, 780,20, g,w,b);
  button[41] = new Button (180, 780,20, g,w,b);
  button[42] = new Button (180, 800,20, g,w,b);
  button[43] = new Button (160, 780,20, g,w,b);
  button[44] = new Button (140, 780,20, g,w,b);
  button[45] = new Button (140, 800,20, g,w,b);
  button[46] = new Button (120, 780,20, g,w,b);
  button[47] = new Button (100, 780,20, g,w,b);
  button[48] = new Button (100, 800,20, g,w,b);
  button[49] = new Button (80, 780,20, g,w,b);
  button[50] = new Button (60, 780,20, g,w,b);
  button[51] = new Button (60, 800,20, g,w,b);
  button[52] = new Button (40, 780,20, g,w,b);
  button[53] = new Button(40, 760, 20, g,w,b);
  button[54] = new Button (40, 740,20, g,w,b);
  button[55] = new Button (60, 740,20, g,w,b);
  button[56] = new Button (80, 740,20, g,w,b);
  button[57] = new Button (100, 740,20, g,w,b);
  button[58] = new Button (100, 720,20, g,w,b);
  button[59] = new Button (100, 700,20, g,w,b);
  button[60] = new Button (80, 700,20, g,w,b);
  button[61] = new Button (40, 720,20, g,w,b);
  button[62] = new Button (40, 700,20, g,w,b);
  button[63] = new Button (40, 680,20, g,w,b);
  button[64] = new Button (40, 660,20, g,w,b);
  button[65] = new Button (60, 660,20, g,w,b);
  button[66] = new Button (60, 640,20, g,w,b);
  button[67] = new Button (80, 660,20, g,w,b);
  button[68] = new Button (100, 660,20, g,w,b);
  button[69] = new Button (120, 660,20, g,w,b);
  button[70] = new Button (140, 660,20, g,w,b);
  button[71] = new Button (160, 660,20, g,w,b);
  button[72] = new Button (140, 680,20, g,w,b);
  button[73] = new Button (140, 700,20, g,w,b);
  button[74] = new Button (140, 720,20, g,w,b);
  button[75] = new Button (140, 740,20, g,w,b);
  button[76] = new Button (160, 700,20, g,w,b);
  button[77] = new Button (180, 700,20, g,w,b);
  button[78] = new Button (200, 700,20, g,w,b);
  button[79] = new Button (220, 700,20, g,w,b);
  button[80] = new Button (240, 700,20, g,w,b);
  button[81] = new Button (260, 700,20, g,w,b);
  button[82] = new Button (280, 700,20, g,w,b);
  button[83] = new Button (300, 700,20, g,w,b);
  button[84] = new Button (340, 700,20, g,w,b);
  button[85] = new Button (340, 680,20, g,w,b);
  button[86] = new Button (340, 660,20, g,w,b);
  button[87] = new Button (320, 660,20, g,w,b);
  button[88] = new Button (300, 660,20, g,w,b);
  button[89] = new Button (280, 660,20, g,w,b);
  button[90] = new Button (260, 660,20, g,w,b);
  button[91] = new Button(240, 660, 20, g,w,b);
  button[92] = new Button (220, 660,20, g,w,b);
  button[93] = new Button (200, 660,20, g,w,b);
  button[94] = new Button (280, 640,20, g,w,b);
  button[95] = new Button (280, 620,20, g,w,b);
  button[96] = new Button (300, 620,20, g,w,b);
  button[97] = new Button (320, 620,20, g,w,b);
  button[98] = new Button (340, 620,20, g,w,b);
  button[99] = new Button (340, 600,20, g,w,b);
  button[100] = new Button (340, 580,20, g,w,b);
  button[101] = new Button (340, 560,20, g,w,b);
  button[102] = new Button (340, 540,20, g,w,b);
  button[103] = new Button (340, 520,20, g,w,b);
  button[104] = new Button (340, 500,20, g,w,b);
  button[105] = new Button (360, 500,20, g,w,b);
  button[106] = new Button (380, 500,20, g,w,b);
  button[107] = new Button (380, 520,20, g,w,b);
  button[108] = new Button (380, 540,20, g,w,b);
  button[109] = new Button (400, 540,20, g,w,b);
  button[110] = new Button (420, 540,20, g,w,b);
  button[111] = new Button (440, 540,20, g,w,b);
  button[112] = new Button (460, 540,20, g,w,b);
  button[113] = new Button (480, 540,20, g,w,b);
  button[114] = new Button (480, 560,20, g,w,b);
  button[115] = new Button (480, 580,20, g,w,b);
  button[116] = new Button (480, 600,20, g,w,b);
  button[117] = new Button (480, 620,20, g,w,b);
  button[118] = new Button (480, 640,20, g,w,b);
  button[119] = new Button (480, 660,20, g,w,b);
  button[120] = new Button (460, 660,20, g,w,b);
  button[121] = new Button (440, 660,20, g,w,b);
  button[122] = new Button (420, 660,20, g,w,b);
  button[123] = new Button (420, 640,20, g,w,b);
  button[124] = new Button (420, 620,20, g,w,b);
  button[125] = new Button (440, 620,20, g,w,b);
  button[126] = new Button (440, 600,20, g,w,b);
  button[127] = new Button (440, 580,20, g,w,b);
  button[128] = new Button (420, 580,20, g,w,b);
  button[129] = new Button(400, 580, 20, g,w,b);
  button[130] = new Button (380, 580,20, g,w,b);
  button[131] = new Button (380, 600,20, g,w,b);
  button[132] = new Button (380, 620,20, g,w,b);
  button[133] = new Button (380, 640,20, g,w,b);
  button[134] = new Button (380, 660,20, g,w,b);
  button[135] = new Button (380, 680,20, g,w,b);
  button[136] = new Button (380, 700,20, g,w,b);
  button[137] = new Button (400, 700,20, g,w,b);
  button[138] = new Button (420, 700,20, g,w,b);
  button[139] = new Button (440, 700,20, g,w,b);
  button[140] = new Button (460, 700,20, g,w,b);
  button[141] = new Button (480, 700,20, g,w,b);
  button[142] = new Button (540, 720,20, g,w,b);
  button[143] = new Button (540, 700,20, g,w,b);
  button[144] = new Button (520, 700,20, g,w,b);
  button[145] = new Button (520, 680,20, g,w,b);
  button[146] = new Button (520, 660,20, g,w,b);
  button[147] = new Button (540, 660,20, g,w,b);
  button[148] = new Button (540, 640,20, g,w,b);
  button[149] = new Button (540, 620,20, g,w,b);
  button[150] = new Button (520, 620,20, g,w,b);
  button[151] = new Button (520, 600,20, g,w,b);
  button[152] = new Button (520, 580,20, g,w,b);
  button[153] = new Button (540, 580,20, g,w,b);
  button[154] = new Button (540, 560,20, g,w,b);
  button[155] = new Button (540, 540,20, g,w,b);
  button[156] = new Button (520, 540,20, g,w,b);
  button[157] = new Button (520, 520,20, g,w,b);
  button[158] = new Button (520, 500,20, g,w,b);
  button[159] = new Button (540, 500,20, g,w,b);
  button[160] = new Button (540, 480,20, g,w,b);
  button[161] = new Button (540, 460,20, g,w,b);
  button[162] = new Button (520, 460,20, g,w,b);
  button[163] = new Button (500, 460,20, g,w,b);
  button[164] = new Button (480, 460,20, g,w,b);
  button[165] = new Button (480, 480,20, g,w,b);
  button[166] = new Button (480, 500,20, g,w,b);
  button[167] = new Button(460, 500, 20, g,w,b);
  button[168] = new Button (440, 500,20, g,w,b);
  button[169] = new Button (420, 500,20, g,w,b);
  button[170] = new Button (420, 480,20, g,w,b);
  button[171] = new Button (420, 460,20, g,w,b);
  button[172] = new Button (440, 460,20, g,w,b);
  button[173] = new Button (400, 460,20, g,w,b);
  button[174] = new Button (380, 460,20, g,w,b);
  button[175] = new Button (360, 460,20, g,w,b);
  button[176] = new Button (340, 460,20, g,w,b);
  button[177] = new Button (320, 460,20, g,w,b);
  button[178] = new Button (300, 460,20, g,w,b);
  button[179] = new Button (280, 460,20, g,w,b);
  button[180] = new Button (280, 440,20, g,w,b);
  button[181] = new Button (280, 420,20, g,w,b);
  button[182] = new Button (260, 420,20, g,w,b);
  button[183] = new Button (340, 440,20, g,w,b);
  button[184] = new Button (380, 440,20, g,w,b);
  button[185] = new Button (380, 420,20, g,w,b);
  button[186] = new Button (360, 420,20, g,w,b);
  button[187] = new Button (340, 420,20, g,w,b);
  button[188] = new Button (320, 420,20, g,w,b);
  button[189] = new Button (320, 400,20, g,w,b);
  button[190] = new Button (300, 400,20, g,w,b);
  button[191] = new Button (40, 560,20, g,w,b);
  button[192] = new Button (60, 560,20, g,w,b);
  button[193] = new Button (60, 580,20, g,w,b);
  button[194] = new Button (60, 600,20, g,w,b);
  button[195] = new Button (80, 600,20, g,w,b);
  button[196] = new Button (100, 600,20, g,w,b);
  button[197] = new Button (100, 620,20, g,w,b);
  button[198] = new Button (80, 560,20, g,w,b);
  button[199] = new Button (100, 560,20, g,w,b);
  button[200] = new Button (120, 560,20, g,w,b);
  button[201] = new Button (120, 540,20, g,w,b);
  button[202] = new Button (120, 520,20, g,w,b);
  button[203] = new Button (100, 520,20, g,w,b);
  button[204] = new Button (80, 520,20, g,w,b);
  button[205] = new Button(60, 520, 20, g,w,b);
  button[206] = new Button (60, 500,20, g,w,b);
  button[207] = new Button (60, 480,20, g,w,b);
  button[208] = new Button (80, 480,20, g,w,b);
  button[209] = new Button (100, 480,20, g,w,b);
  button[210] = new Button (120, 480,20, g,w,b);
  button[211] = new Button (120, 460,20, g,w,b);
  button[212] = new Button (120, 440,20, g,w,b);
  button[213] = new Button (100, 440,20, g,w,b);
  button[214] = new Button (80, 440,20, g,w,b);
  button[215] = new Button (100, 420,20, g,w,b);
  button[216] = new Button (100, 400,20, g,w,b);
  button[217] = new Button (120, 400,20, g,w,b);
  button[218] = new Button (40, 480,20, g,w,b);
  button[219] = new Button (40, 460,20, g,w,b);
  button[220] = new Button (40, 440,20, g,w,b);
  button[221] = new Button (40, 420,20, g,w,b);
  button[222] = new Button (60, 420,20, g,w,b);
  button[223] = new Button (60, 400,20, g,w,b);
  button[224] = new Button (60, 380,20, g,w,b);
  button[225] = new Button (40, 380,20, g,w,b);
  button[226] = new Button (60, 360,20, g,w,b);
  button[227] = new Button (80, 360,20, g,w,b);
  button[228] = new Button (100, 360,20, g,w,b);
  button[229] = new Button (120, 360,20, g,w,b);
  button[230] = new Button (140, 360,20, g,w,b);
  button[231] = new Button (160, 360,20, g,w,b);
  button[232] = new Button (160, 380,20, g,w,b);
  button[233] = new Button (160, 400,20, g,w,b);
  button[234] = new Button (160, 420,20, g,w,b);
  button[235] = new Button (160, 440,20, g,w,b);
  button[236] = new Button (160, 460,20, g,w,b);
  button[237] = new Button (160, 480,20, g,w,b);
  button[238] = new Button (160, 500,20, g,w,b);
  button[239] = new Button (180, 500,20, g,w,b);
  button[240] = new Button (200, 500,20, g,w,b);
  button[241] = new Button (200, 520,20, g,w,b);
  button[242] = new Button (200, 540,20, g,w,b);
  button[243] = new  Button(180, 540, 20, g,w,b);
  button[244] = new Button (160, 540,20, g,w,b);
  button[245] = new Button (160, 560,20, g,w,b);
  button[246] = new Button (160, 580,20, g,w,b);
  button[247] = new Button (200, 560,20, g,w,b);
  button[248] = new Button (200, 580,20, g,w,b);
  button[249] = new Button (180, 580,20, g,w,b);
  button[250] = new Button (140, 580,20, g,w,b);
  button[251] = new Button (140, 600,20, g,w,b);
  button[252] = new Button (140, 620,20, g,w,b);
  button[253] = new Button (160, 620,20, g,w,b);
  button[254] = new Button (180, 620,20, g,w,b);
  button[255] = new Button (200, 620,20, g,w,b);
  button[256] = new Button (220, 620,20, g,w,b);
  button[257] = new Button (240, 620,20, g,w,b);
  button[258] = new Button (240, 600,20, g,w,b);
  button[259] = new Button (240, 580,20, g,w,b);
  button[260] = new Button (260, 580,20, g,w,b);
  button[261] = new Button (280, 580,20, g,w,b);
  button[262] = new Button (300, 580,20, g,w,b);
  button[263] = new Button (300, 560,20, g,w,b);
  button[264] = new Button (300, 540,20, g,w,b);
  button[265] = new Button (300, 520,20, g,w,b);
  button[266] = new Button (300, 500,20, g,w,b);
  button[267] = new Button (280, 500,20, g,w,b);
  button[268] = new Button (260, 500,20, g,w,b);
  button[269] = new Button (240, 500,20, g,w,b);
  button[270] = new Button (240, 520,20, g,w,b);
  button[271] = new Button (240, 540,20, g,w,b);
  button[272] = new Button (260, 540,20, g,w,b);
  button[273] = new Button (240, 480,20, g,w,b);
  button[274] = new Button (240, 460,20, g,w,b);
  button[275] = new Button (220, 460,20, g,w,b);
  button[276] = new Button (200, 460,20, g,w,b);
  button[277] = new Button (220, 440,20, g,w,b);
  button[278] = new Button (220, 420,20, g,w,b);
  button[279] = new Button (200, 420,20, g,w,b);
  button[280] = new Button (220, 400,20, g,w,b);
  button[281] = new  Button(220, 380, 20, g,w,b);
  button[282] = new Button (200, 380,20, g,w,b);
  button[283] = new Button (220, 360,20, g,w,b);
  button[284] = new Button (240, 360,20, g,w,b);
  button[285] = new Button (260, 360,20, g,w,b);
  button[286] = new Button (260, 340,20, g,w,b);
  button[287] = new Button (260, 320,20, g,w,b);
  button[288] = new Button (260, 300,20, g,w,b);
  button[289] = new Button (260, 280,20, g,w,b);
  button[290] = new Button (240, 280,20, g,w,b);
  button[291] = new Button (220, 280,20, g,w,b);
  button[292] = new Button (200, 280,20, g,w,b);
  button[293] = new Button (180, 280,20, g,w,b);
  button[294] = new Button (160, 280,20, g,w,b);
  button[295] = new Button (140, 280,20, g,w,b);
  button[296] = new Button (140, 260,20, g,w,b);
  button[297] = new Button (140, 240,20, g,w,b);
  button[298] = new Button (140, 220,20, g,w,b);
  button[299] = new Button (140, 200,20, g,w,b);
  button[300] = new Button (140, 180,20, g,w,b);
  button[301] = new Button (160, 180,20, g,w,b);
  button[302] = new Button (180, 180,20, g,w,b);
  button[303] = new Button (200, 180,20, g,w,b);  
  button[304] = new Button (220, 180,20, g,w,b);
  button[305] = new Button (220, 200,20, g,w,b);
  button[306] = new Button (220, 220,20, g,w,b);
  button[307] = new Button (200, 220,20, g,w,b);
  button[308] = new Button (180, 220,20, g,w,b);
  button[309] = new Button (180, 240,20, g,w,b);
  button[310] = new Button (220, 240,20, g,w,b);
  button[311] = new Button (240, 240,20, g,w,b);
  button[312] = new Button (260, 240,20, g,w,b);
  button[313] = new Button (280, 240,20, g,w,b);
  button[314] = new Button (300, 240,20, g,w,b);
  button[315] = new Button (300, 260,20, g,w,b);
  button[316] = new Button (300, 280,20, g,w,b);
  button[317] = new Button (300, 300,20, g,w,b);
  button[318] = new  Button(300, 320, 20, g,w,b);
  button[319] = new Button (300, 340,20, g,w,b);
  button[320] = new Button (300, 360,20, g,w,b);
  button[321] = new Button (300, 380,20, g,w,b);
  button[322] = new Button (40, 140,20, g,w,b);
  button[323] = new Button (60, 140,20, g,w,b);
  button[324] = new Button (80, 140,20, g,w,b);
  button[325] = new Button (100, 140,20, g,w,b);
  button[326] = new Button (120, 140,20, g,w,b);
  button[327] = new Button (140, 140,20, g,w,b);
  button[328] = new Button (160, 140,20, g,w,b);
  button[329] = new Button (180, 140,20, g,w,b);
  button[330] = new Button (200, 140,20, g,w,b);
  button[331] = new Button (220, 140,20, g,w,b);
  button[332] = new Button (220, 120,20, g,w,b);
  button[333] = new Button (240, 120,20, g,w,b);
  button[334] = new Button (260, 120,20, g,w,b);
  button[335] = new Button (280, 120,20, g,w,b);
  button[336] = new Button (300, 120,20, g,w,b);
  button[337] = new Button (320, 120,20, g,w,b);
  button[338] = new Button (340, 120,20, g,w,b);
  button[339] = new Button (360, 120,20, g,w,b);
  button[340] = new Button (380, 120,20, g,w,b);
  button[341] = new Button (380, 140,20, g,w,b);
  button[342] = new Button (380, 160,20, g,w,b);
  button[343] = new Button (380, 180,20, g,w,b);
  button[344] = new Button (60, 120,20, g,w,b);
  button[345] = new Button (60, 100,20, g,w,b);
  button[346] = new Button (60, 80,20, g,w,b);
  button[347] = new Button (60, 60,20, g,w,b);
  button[348] = new Button (60, 40,20, g,w,b);
  button[349] = new Button (60, 20,20, g,w,b);
  button[350] = new Button (80, 20,20, g,w,b);
  button[351] = new Button (100, 20,20, g,w,b);
  button[352] = new Button (120, 20,20, g,w,b);
  button[353] = new Button (140, 20,20, g,w,b);
  button[354] = new Button (160, 20,20, g,w,b);
  button[355] = new Button (180, 20,20, g,w,b);
  button[356] = new  Button(180, 40, 20, g,w,b);
  button[357] = new Button (180, 60,20, g,w,b);
  button[358] = new Button (160, 60,20, g,w,b);
  button[359] = new Button (140, 60,20, g,w,b);
  button[360] = new Button (120, 60,20, g,w,b);
  button[361] = new Button (100, 60,20, g,w,b);
  button[362] = new Button (100, 80,20, g,w,b);
  button[363] = new Button (100, 100,20, g,w,b);
  button[364] = new Button (120, 100,20, g,w,b);
  button[365] = new Button (140, 100,20, g,w,b);
  button[366] = new Button (160, 100,20, g,w,b);
  button[367] = new Button (180, 100,20, g,w,b);
  button[368] = new Button (180, 80,20, g,w,b);
  button[369] = new Button (200, 60,20, g,w,b);
  button[370] = new Button (220, 60,20, g,w,b);
  button[371] = new Button (220, 40,20, g,w,b);
  button[372] = new Button (220, 20,20, g,w,b);
  button[373] = new Button (220, 80,20, g,w,b);
  button[374] = new Button (240, 80,20, g,w,b);
  button[375] = new Button (260, 80,20, g,w,b);
  button[376] = new Button (280, 80,20, g,w,b);
  button[377] = new Button (280, 60,20, g,w,b);
  button[378] = new Button (280, 40,20, g,w,b);
  button[379] = new Button (260, 40,20, g,w,b);
  button[380] = new Button (260, 20,20, g,w,b);
  button[381] = new Button (540, 140,20, g,w,b);
  button[382] = new Button (520, 140,20, g,w,b);
  button[383] = new Button (500, 140,20, g,w,b);
  button[384] = new Button (500, 120,20, g,w,b);
  button[385] = new Button (500, 100,20, g,w,b);
  button[386] = new Button (520, 100,20, g,w,b);
  button[387] = new Button (520, 80,20, g,w,b);
  button[388] = new Button (540, 80,20, g,w,b);
  button[389] = new Button (520, 60,20, g,w,b);
  button[390] = new Button (500, 60,20, g,w,b);
  button[391] = new Button (480, 60,20, g,w,b);
  button[392] = new Button (480, 40,20, g,w,b);
  button[393] = new Button (480, 20,20, g,w,b);
  button[394] = new Button (500, 20,20, g,w,b);
  button[395] = new Button (520, 20,20, g,w,b);
  button[396] = new Button (460, 60,20, g,w,b);
  button[397] = new Button (460, 80,20, g,w,b);
  button[398] = new Button (460, 100,20, g,w,b);
  button[399] = new Button (440, 100,20, g,w,b);
  button[400] = new Button (420, 100,20, g,w,b);
  button[401] = new Button (420, 80,20, g,w,b);
  button[402] = new Button (420, 60,20, g,w,b);
  button[403] = new  Button(420, 40, 20, g,w,b);
  button[404] = new Button (400, 40,20, g,w,b);
  button[405] = new Button (420, 20,20, g,w,b);
  button[406] = new Button (440, 20,20, g,w,b);
  button[407] = new Button (400, 80,20, g,w,b);
  button[408] = new Button (380, 80,20, g,w,b);
  button[409] = new Button (360, 80,20, g,w,b);
  button[410] = new Button (340, 80,20, g,w,b);
  button[411] = new Button (320, 80,20, g,w,b);
  button[412] = new Button (320, 60,20, g,w,b);
  button[413] = new Button (320, 40,20, g,w,b);
  button[414] = new Button (320, 20,20, g,w,b);
  button[415] = new Button (340, 20,20, g,w,b);
  button[416] = new Button (360, 20,20, g,w,b);
  button[417] = new Button (360, 40,20, g,w,b);
  button[418] = new Button (480, 140,20, g,w,b);
  button[419] = new Button (460, 140,20, g,w,b);
  button[420] = new Button (440, 140,20, g,w,b);
  button[421] = new Button (420, 140,20, g,w,b);
  button[422] = new Button (420, 160,20, g,w,b);
  button[423] = new Button (420, 180,20, g,w,b);
  button[424] = new Button (440, 180,20, g,w,b);
  button[425] = new Button (460, 180,20, g,w,b);
  button[426] = new Button (480, 180,20, g,w,b);
  button[427] = new Button (500, 180,20, g,w,b);
  button[428] = new Button (520, 180,20, g,w,b);
  button[429] = new Button (540, 180,20, g,w,b);
  button[430] = new Button (540, 200,20, g,w,b);
  button[431] = new Button (540, 220,20, g,w,b);
  button[432] = new Button (520, 220,20, g,w,b);
  button[433] = new Button (500, 220,20, g,w,b);
  button[434] = new Button (480, 220,20, g,w,b);
  button[435] = new Button (460, 220,20, g,w,b);
  button[436] = new Button (440, 220,20, g,w,b);
  button[437] = new Button (420, 220,20, g,w,b);
  button[438] = new Button (400, 220,20, g,w,b);
  button[439] = new Button (380, 220,20, g,w,b);
  button[440] = new Button (380, 240,20, g,w,b);
  button[441] = new Button (360, 240,20, g,w,b);
  button[442] = new Button (340, 240,20, g,w,b);
  button[443] = new Button (340, 220,20, g,w,b);
  button[444] = new Button (340, 200,20, g,w,b);
  button[445] = new Button (340, 180,20, g,w,b);
  button[446] = new Button (340, 160,20, g,w,b);
  button[447] = new Button (320, 160,20, g,w,b);
  button[448] = new Button (300, 160,20, g,w,b);
  button[449] = new Button (280, 160,20, g,w,b);
  button[450] = new Button (260, 160,20, g,w,b);
  button[451] = new Button (260, 180,20, g,w,b);
  button[452] = new Button (260, 200,20, g,w,b);
  button[453] = new Button (280, 200,20, g,w,b);
  button[454] = new Button (300, 200,20, g,w,b);
  button[455] = new Button (340, 260,20, g,w,b);
  button[456] = new Button(340, 280, 20, g,w,b);
  button[457] = new Button (360, 280,20, g,w,b);
  button[458] = new Button (380, 280,20, g,w,b);
  button[459] = new Button (400, 280,20, g,w,b);
  button[460] = new Button (420, 280,20, g,w,b);
  button[461] = new Button (420, 260,20, g,w,b);
  button[462] = new Button (440, 260,20, g,w,b);
  button[463] = new Button (460, 260,20, g,w,b);
  button[464] = new Button (480, 260,20, g,w,b);
  button[465] = new Button (500, 260,20, g,w,b);
  button[466] = new Button (520, 260,20, g,w,b);
  button[467] = new Button (540, 260,20, g,w,b);
  button[468] = new Button (540, 280,20, g,w,b);
  button[469] = new Button (540, 300,20, g,w,b);
  button[470] = new Button (520, 300,20, g,w,b);
  button[471] = new Button (500, 300,20, g,w,b);
  button[472] = new Button (480, 300,20, g,w,b);
  button[473] = new Button (460, 300,20, g,w,b);
  button[474] = new Button (460, 320,20, g,w,b);
  button[475] = new Button (460, 340,20, g,w,b);
  button[476] = new Button (460, 360,20, g,w,b);
  button[477] = new Button (460, 380,20, g,w,b);
  button[478] = new Button (480, 380,20, g,w,b);
  button[479] = new Button (500, 380,20, g,w,b);
  button[480] = new Button (500, 360,20, g,w,b);
  button[481] = new Button (500, 340,20, g,w,b);
  button[482] = new Button (520, 340,20, g,w,b);
  button[483] = new Button (540, 340,20, g,w,b);
  button[484] = new Button (540, 360,20, g,w,b);
  button[485] = new Button (540, 380,20, g,w,b);
  button[486] = new Button (540, 400,20, g,w,b);
  button[487] = new Button (540, 420,20, g,w,b);
  button[488] = new Button (520, 420,20, g,w,b);
  button[489] = new Button (500, 420,20, g,w,b);
  button[490] = new Button (480, 420,20, g,w,b);
  button[491] = new Button (460, 420,20, g,w,b);
  button[492] = new Button (440, 420,20, g,w,b);
  button[493] = new Button (420, 420,20, g,w,b);
  button[494] = new Button (420, 400,20, g,w,b);
  button[495] = new Button (420, 380,20, g,w,b);
  button[496] = new Button (420, 360,20, g,w,b);
  button[497] = new Button (420, 340,20, g,w,b);
  button[498] = new Button (420, 320,20, g,w,b);
  button[499] = new Button (400, 320,20, g,w,b);
  button[500] = new Button (380, 320,20, g,w,b);
  button[501] = new Button (360, 320,20, g,w,b);
  button[502] = new Button (340, 320,20, g,w,b);
  button[503] = new  Button(340, 340, 20, g,w,b);
  button[504] = new Button (340, 360,20, g,w,b);
  button[505] = new Button (360, 360,20, g,w,b);
  button[506] = new Button (360, 380,20, g,w,b);
  button[507] = new Button (380, 380,20, g,w,b);
  button[508] = new Button (380, 400,20, g,w,b);
  
  pdf = createGraphics(600, 840);
  
  ps = new ParticleSystem(new PVector());
  ps1 = new ParticleSystem1(new PVector());
  ps2 = new ParticleSystem2(new PVector());
  ps3 = new ParticleSystem3(new PVector());
  
//  RG.init(this);
//  
//  grp = RG.getText("|", "HelveticaNeueBd.ttf", 180, CENTER);
//  grp1 = RG.getText("—", "HelveticaNeueBd.ttf", 180, CENTER);
//  grp2 = RG.getText("...", "HelveticaNeueBd.ttf", 130, CENTER);
//  grp3 = RG.getText("......", "HelveticaNeueBd.ttf", 130, CENTER);
//  grp4 = RG.getText("|", "HelveticaNeueBd.ttf", 180, CENTER);
//  grp5 = RG.getText("....", "HelveticaNeueBd.ttf", 130, CENTER);
//  grp6 = RG.getText("...", "HelveticaNeueBd.ttf", 130, CENTER);
//  grp7 = RG.getText("|", "HelveticaNeueBd.ttf", 180, CENTER);
//  grp8 = RG.getText(".", "HelveticaNeueBd.ttf", 130, CENTER);
      
}

void draw() {
  
  noStroke();
  fill(220,60);
  rect(0,0,width,height);
  
  for(int i=0; i<=width; i+=20){
    stroke(240);
    line(i,0,i,height);
  }
  for(int i=0; i<=height; i+=20){
    stroke(240);
    line(0,i,width,i);
  }
  noStroke();
  fill(60);
  ellipse(310,410,20,20);
  
  if(start[0]){
    repeatDots0();
  }
  
  if(start[1]){
    repeatDots();
  }

  if(start[2]){
    bouncingBalls();
  }
  
  if(start[3]){
    bouncingBalls0();
  }
  
  if(start[4]){
    bouncingRect();
  }  
  
  if(start[6]){
    circles();
  }
  
  if(start[7]){
    repeatDots2();
  }
  
  
  if(start[9]){
    repeatDots3();
  }
  
  if(start[10]){
    repeatDots4();
  }
  
  if(start[11]){
    repeatDots5();
  }
  
  if(start[12]){
    repeatDots6();
  }
  
  if(start[13]){
    repeatDots7();
  }
  
  if(start[14]){
    bouncingBalls2();
  }
   
  if(start[15]){
    bouncingBalls3();
  }
  
  if(start[22]){
    stroke(20);
    strokeWeight(0.75);
    noFill();
    ellipse(310,410,25,25);
  }
  
//  if(start[23]){
//    machine8();
//  }
  
  if(start[24]){
    bouncingBalls4();
  }
  
  if(start[25]){
    pushMatrix();
    stroke(0);
    noFill();
    translate(320, 80);
    float a = atan2(mouseY-height/2, mouseX-width/2);
    rotate(a);
    rect(-30, -5, 60, 10);  
    popMatrix();
  }
  
  
  for (int i = 0; i < bt.length; i++) {  
  if(bt[i]){
    button[i+1].update();
    button[i+1].display();
  }
  }
  
  manageButtons();
  
  if(start[500]){
    ps.addParticle();
    ps.run();
    ps1.addParticle1();
    ps1.run1();
    ps2.addParticle2();
    ps2.run2();
    ps3.addParticle3();
    ps3.run3();
  }
//  machine2();
//  machine3();
//  machine4();
//  machine5();
//  machine6();
//  machine7();
//  machine8();
  
  
} 

void circles(){
  noFill();
  stroke(60);
  ellipse(50,height/2-10, random(0,60),random(0,60));
}


void bouncingBalls(){
  for (Ball b : balls) {
      b.update();
      b.display();
      b.checkBoundaryCollision();
    }
  balls[0].checkCollision(balls[1]);
}

void bouncingBalls0(){
  for (Ball0 b : balls0) {
      b.update();
      b.display();
      b.checkBoundaryCollision();
    }
  balls0[0].checkCollision(balls[0]);
  balls0[0].checkCollision(balls[1]);
  balls0[0].checkCollision(balls2[0]);
  balls0[0].checkCollision(balls2[1]);
  balls0[0].checkCollision(balls2[2]);
  balls0[0].checkCollision(balls2[3]);
  balls0[0].checkCollision(balls2[4]);
}

void bouncingBalls2(){
  for (Ball2 b : balls2) {
      b.update();
      b.display();
      b.checkBoundaryCollision();
    }
  balls2[0].checkCollision(balls2[1]);
  balls2[0].checkCollision(balls2[2]);
  balls2[0].checkCollision(balls2[3]);
  balls2[0].checkCollision(balls2[4]);
  balls2[1].checkCollision(balls2[2]);
  balls2[1].checkCollision(balls2[3]);
  balls2[1].checkCollision(balls2[4]);
  balls2[2].checkCollision(balls2[3]);
  balls2[2].checkCollision(balls2[4]);
  balls2[3].checkCollision(balls2[4]);
  balls2[0].checkCollision(balls[0]);
  balls2[1].checkCollision(balls[0]);
  balls2[2].checkCollision(balls[0]);
  balls2[3].checkCollision(balls[0]);
  balls2[4].checkCollision(balls[0]);
  balls2[0].checkCollision(balls[1]);
  balls2[1].checkCollision(balls[1]);
  balls2[2].checkCollision(balls[1]);
  balls2[3].checkCollision(balls[1]);
  balls2[4].checkCollision(balls[1]);
  balls2[0].checkCollision(balls3[0]);
  balls2[1].checkCollision(balls3[0]);
  balls2[2].checkCollision(balls3[0]);
  balls2[3].checkCollision(balls3[0]);
  balls2[4].checkCollision(balls3[0]);
}

void bouncingBalls3(){
  for (Ball3 b : balls3) {
      b.update();
      b.display();
      b.checkBoundaryCollision();
    }
  balls3[0].checkCollision(balls[0]);
  balls3[0].checkCollision(balls[1]);
  balls3[0].checkCollision(balls0[0]);
}

void bouncingBalls4(){
  for (Ball4 b : balls4) {
      b.update();
      b.display();
      b.checkBoundaryCollision();
    }
  balls4[0].checkCollision(balls[0]);
  balls4[0].checkCollision(balls[1]);
  balls4[0].checkCollision(balls0[0]);
  balls4[0].checkCollision(balls2[0]);
  balls4[0].checkCollision(balls2[1]);
  balls4[0].checkCollision(balls2[2]);
  balls4[0].checkCollision(balls2[3]);
  balls4[0].checkCollision(balls2[4]);
  balls4[0].checkCollision(balls3[0]);
}


void bouncingRect(){
    rects.update();
    rects.display();
}

void repeatDots0(){
  for (int i = 0; i < movers0.length; i++) {
    movers0[i].update();
    movers0[i].checkEdges();
    movers0[i].display(); 
  }
}

void repeatDots(){
  for (int i = 0; i < movers.length; i++) {
    movers[i].update();
    movers[i].checkEdges();
    movers[i].display(); 
  }
}

void repeatDots2(){
  for (int i = 0; i < movers2.length; i++) {
    movers2[i].update();
    movers2[i].checkEdges();
    movers2[i].display(); 
  }
}

void repeatDots3(){
  for (int i = 0; i < movers3.length; i++) {
    movers3[i].update();
    movers3[i].checkEdges();
    movers3[i].display(); 
  }
}

void repeatDots4(){
  for (int i = 0; i < movers4.length; i++) {
    movers4[i].update();
    movers4[i].display(); 
  }
}

void repeatDots5(){
  for (int i = 0; i < movers5.length; i++) {
    movers5[i].update();
    movers5[i].display(); 
  }
}

void repeatDots6(){
  for (int i = 0; i < movers6.length; i++) {
    movers6[i].update();
    movers6[i].display(); 
  }
}

void repeatDots7(){
  for (int i = 0; i < movers7.length; i++) {
    movers7[i].update();
    movers7[i].display(); 
  }
}
  
void manageButtons(){
  button[0].update();
  button[0].display();
  button[191].update();
  button[191].display();
  button[322].update();
  button[322].display();
  button[381].update();
  button[381].display();
}


void mousePressed(){
  if(rects.press() == true){bt[285] = true; bt[286] = true; bt[287] = true; bt[288] = true; 
                            bt[289] = true; bt[315] = true; bt[316] = true; bt[317] = true; bt[318] = true; 
                            bt[455] = true; bt[456] = true; bt[457] = true; bt[458] = true; bt[459] = true; 
                            bt[497] = true; bt[498] = true; bt[499] = true; bt[500] = true; bt[501] = true; 
                            bt[502] = true; bt[503] = true; bt[264] = true; bt[265] = true; bt[266] = true; 
                            bt[267] = true; bt[102] = true; bt[103] = true; bt[104] = true; bt[105] = true; 
                            bt[275] = true; bt[276] = true; bt[274] = true; bt[277] = true; bt[278] = true; 
                            bt[279] = true; bt[280] = true; bt[281] = true; bt[282] = true; bt[283] = true; 
                            bt[284] = true; bt[230] = true; bt[231] = true; bt[232] = true; bt[233] = true; 
                            bt[234] = true; bt[235] = true; bt[236] = true; bt[237] = true; bt[238] = true; 
                            bt[504] = true; bt[505] = true; bt[506] = true; bt[266] = true; bt[263] = true; 
                            bt[268] = true; bt[272] = true; bt[273] = true; bt[185] = true; bt[184] = true;
                            bt[455] = true; bt[456] = true; bt[457] = true; bt[458] = true; bt[459] = true;
                            bt[496] = true; bt[495] = true; bt[494] = true; bt[493] = true; bt[492] = true; 
                            bt[491] = true; bt[106] = true; bt[183] = true; bt[173] = true; bt[172] = true; 
                            bt[507] = true; bt[170] = true; bt[171] = true; bt[169] = true; bt[168] = true; 
                            bt[290] = true; bt[291] = true; bt[292] = true; bt[293] = true; bt[239] = true;
                            bt[240] = true; bt[241] = true; bt[242] = true; bt[243] = true; bt[244] = true;
                            bt[245] = true; bt[246] = true; bt[247] = true; bt[248] = true; bt[269] = true;
                            bt[270] = true; bt[271] = true; bt[262] = true; bt[261] = true; bt[260] = true;
                            bt[259] = true; bt[258] = true; bt[262] = true; bt[261] = true; bt[260] = true; 
                            bt[460] = true; bt[454] = true; bt[441] = true; bt[440] = true; bt[439] = true; 
                            bt[438] = true; bt[437] = true; bt[436] = true; bt[435] = true; bt[461] = true; 
                            bt[314] = true; bt[313] = true; bt[312] = true; bt[311] = true; bt[310] = true;
                            bt[305] = true; bt[306] = true; bt[307] = true; bt[308] = true; bt[309] = true;
                            bt[99] = true; bt[100] = true; bt[101] = true; bt[102] = true; bt[107] = true;
                            bt[108] = true; bt[109] = true; bt[110] = true; bt[167] = true; bt[126] = true;
                            bt[127] = true; bt[128] = true; bt[129] = true;}
  if(button[0].press() == true){bt[0] = true;}
  if(button[1].press() == true){bt[1] = true;}
  if(button[2].press() == true){bt[2] = true;}
  if(button[3].press() == true){start[0]= true; bt[3] = true;}
  if(button[4].press() == true){bt[4] = true;}
  if(button[5].press() == true){bt[5] = true;}
  if(button[6].press() == true){bt[6] = true;}
  if(button[7].press() == true){bt[7] = true;}
  if(button[8].press() == true){bt[8] = true; bt[9] = true;}
  if(button[9].press() == true){bt[10] = true;}
  if(button[10].press() == true){bt[19] = true;}
  if(button[11].press() == true){bt[11] = true;}
  if(button[12].press() == true){bt[12] = true;}
  if(button[13].press() == true){bt[13] = true;}
  if(button[14].press() == true){bt[14] = true;}
  if(button[15].press() == true){bt[15] = true;}
  if(button[16].press() == true){bt[16] = true;}
  if(button[17].press() == true){bt[17] = true;}
  if(button[20].press() == true){bt[20] = true; bt[21] = true;}
  if(button[21].press() == true){bt[22] = true;}
  if(button[22].press() == true){bt[29] = true;}
  if(button[23].press() == true){bt[23] = true;}
  if(button[24].press() == true){bt[24] = true;}
  if(button[25].press() == true){bt[25] = true;}
  if(button[26].press() == true){bt[26] = true;}
  if(button[27].press() == true){bt[27] = true;}
  if(button[28].press() == true){bt[28] = true;}
  if(button[29].press() == true){start[1] = true; bt[141] = true;}
  if(button[30].press() == true){bt[30] = true; bt[31] = true;}
  if(button[31].press() == true){bt[32] = true;}
  if(button[32].press() == true){bt[83] = true;}
  if(button[33].press() == true){bt[33] = true;}
  if(button[34].press() == true){bt[34] = true;}
  if(button[35].press() == true){bt[35] = true;}
  if(button[36].press() == true){bt[36] = true;}
  if(button[37].press() == true){bt[37] = true;}
  if(button[38].press() == true){bt[38] = true; start[13] = true;}
  if(button[39].press() == true){bt[39] = true;}
  if(button[40].press() == true){bt[40] = true;}
  if(button[41].press() == true){bt[41] = true; bt[42] = true;}
  if(button[43].press() == true){bt[43] = true;}
  if(button[44].press() == true){bt[44] = true; bt[45] = true;}
  if(button[45].press() == true){start[11] = true;}
  if(button[46].press() == true){bt[46] = true;}
  if(button[47].press() == true){bt[47] = true; bt[48] = true;}
  if(button[49].press() == true){bt[49] = true;}
  if(button[50].press() == true){bt[50] = true; bt[51] = true;}
  if(button[52].press() == true){bt[52] = true;}
  if(button[53].press() == true){bt[53] = true;}
  if(button[54].press() == true){bt[54] = true; bt[60] = true;}
  if(button[55].press() == true){bt[55] = true;}
  if(button[56].press() == true){bt[56] = true;}
  if(button[57].press() == true){bt[57] = true; start[13]= false;}
  if(button[58].press() == true){bt[58] = true;}
  if(button[59].press() == true){bt[59] = true;}
  if(button[61].press() == true){bt[61] = true;}
  if(button[62].press() == true){bt[62] = true;}
  if(button[63].press() == true){bt[63] = true;}
  if(button[64].press() == true){bt[64] = true;}
  if(button[65].press() == true){bt[65] = true; bt[66] = true;}
  if(button[67].press() == true){bt[67] = true;}
  if(button[68].press() == true){bt[68] = true;}
  if(button[69].press() == true){bt[69] = true;}
  if(button[70].press() == true){start[12] = true; bt[70] = true; bt[71] = true;}
  if(button[72].press() == true){bt[72] = true;}
  if(button[73].press() == true){bt[73] = true; bt[75] = true;}
  if(button[74].press() == true){bt[74] = true;}
  if(button[76].press() == true){bt[76] = true;}
  if(button[77].press() == true){bt[77] = true;}
  if(button[78].press() == true){bt[78] = true;}
  if(button[79].press() == true){bt[79] = true;}
  if(button[80].press() == true){bt[80] = true;}
  if(button[81].press() == true){bt[81] = true;}
  if(button[82].press() == true){bt[82] = true; bt[40] = false;bt[41] = false;bt[42] = false;bt[43] = false;bt[44] = false;bt[45] = false;bt[46] = false;start[47]=false;bt[48] = false;bt[49] = false;bt[50] = false;bt[51] = false; bt[52] = false;bt[53] = false;bt[54] = false;bt[55] = false;bt[56] = false;bt[57] = false;bt[58] = false;start[59]=false;bt[60] = false;bt[61] = false;bt[62] = false;bt[63] = false; bt[64] = false;bt[65] = false;bt[66] = false;bt[67] = false;bt[68] = false;bt[69] = false;bt[70] = false;start[71]=false;bt[72] = false;bt[73] = false;bt[74] = false;bt[75] = false;}
  if(button[84].press() == true){bt[84] = true;}
  if(button[85].press() == true){bt[85] = true;}
  if(button[86].press() == true){bt[86] = true;}
  if(button[87].press() == true){bt[87] = true;}
  if(button[88].press() == true){bt[88] = true;}
  if(button[89].press() == true){bt[89] = true; bt[93] = true;}
  if(button[90].press() == true){bt[90] = true;}
  if(button[91].press() == true){bt[91] = true;}
  if(button[92].press() == true){bt[92] = true;}
  if(button[94].press() == true){bt[94] = true;}
  if(button[95].press() == true){bt[95] = true;  start[9]=true;}
  if(button[96].press() == true){bt[96] = true;}
  if(button[97].press() == true){bt[97] = true;}
  if(button[98].press() == true){bt[98] = true;}
  if(button[99].press() == true){bt[99] = true;}
  if(button[100].press() == true){bt[100] = true;}
  if(button[101].press() == true){bt[101] = true;}
  if(button[102].press() == true){bt[102] = true;}
  if(button[103].press() == true){bt[103] = true;}
  if(button[104].press() == true){bt[104] = true;}
  if(button[105].press() == true){bt[105] = true;}
  if(button[106].press() == true){bt[106] = true;}
  if(button[107].press() == true){bt[107] = true;}
  if(button[108].press() == true){bt[108] = true;}
  if(button[109].press() == true){bt[109] = true;}
  if(button[110].press() == true){bt[110] = true;}
  if(button[111].press() == true){bt[111] = true;}
  if(button[112].press() == true){bt[112] = true;}
  if(button[113].press() == true){bt[113] = true; start[7]=true;bt[5] = false;bt[6] = false;bt[7] = false;bt[8] = false;bt[9] = false;bt[10] = false;bt[29] = false;start[2]=false;bt[22] = false;bt[21] = false;bt[20] = false;bt[19] = false;}
  if(button[114].press() == true){bt[114] = true;}
  if(button[115].press() == true){bt[115] = true;}
  if(button[116].press() == true){bt[116] = true;}
  if(button[117].press() == true){bt[117] = true;}
  if(button[118].press() == true){bt[118] = true;}
  if(button[119].press() == true){bt[119] = true;}
  if(button[120].press() == true){bt[120] = true;}
  if(button[121].press() == true){bt[121] = true;}
  if(button[122].press() == true){bt[122] = true;}
  if(button[123].press() == true){bt[123] = true;}
  if(button[124].press() == true){bt[124] = true;}
  if(button[125].press() == true){bt[125] = true; bt[118] = false;bt[119] = false;bt[120] = false;bt[121] = false;bt[122] = false;bt[123] = false;}
  if(button[126].press() == true){bt[126] = true;}
  if(button[127].press() == true){bt[127] = true;}
  if(button[128].press() == true){bt[128] = true;}
  if(button[129].press() == true){bt[129] = true;}
  if(button[130].press() == true){bt[130] = true;}
  if(button[131].press() == true){bt[131] = true;}
  if(button[132].press() == true){bt[132] = true;}
  if(button[133].press() == true){bt[133] = true;}
  if(button[134].press() == true){bt[134] = true;}
  if(button[135].press() == true){bt[135] = true;}
  if(button[136].press() == true){bt[136] = true; start[7]=false;}
  if(button[137].press() == true){bt[137] = true;}
  if(button[138].press() == true){bt[138] = true;}
  if(button[139].press() == true){bt[139] = true;}
  if(button[140].press() == true){bt[140] = true;}
  //if(button[141].press() == true){bt[141] = true;}
  if(button[142].press() == true){bt[142] = true;}
  if(button[143].press() == true){bt[143] = true;}
  if(button[144].press() == true){bt[144] = true;}
  if(button[145].press() == true){bt[145] = true;}
  if(button[146].press() == true){bt[146] = true;}
  if(button[147].press() == true){bt[147] = true;}
  if(button[148].press() == true){bt[148] = true;}
  if(button[149].press() == true){bt[149] = true;}
  if(button[150].press() == true){bt[150] = true; start[11]=false; bt[93]=false; bt[94]=false; bt[95]=false;}
  if(button[151].press() == true){bt[151] = true;}
  if(button[152].press() == true){bt[152] = true;}
  if(button[153].press() == true){bt[153] = true;}
  if(button[154].press() == true){bt[154] = true;}
  if(button[155].press() == true){bt[155] = true;}
  if(button[156].press() == true){bt[156] = true;}
  if(button[157].press() == true){bt[157] = true;}
  if(button[158].press() == true){bt[158] = true;}
  if(button[159].press() == true){bt[159] = true;}
  if(button[160].press() == true){bt[160] = true;}
  if(button[161].press() == true){bt[161] = true; start[12] = false;}
  if(button[162].press() == true){bt[162] = true;}
  if(button[163].press() == true){bt[163] = true;}
  if(button[164].press() == true){bt[164] = true;}
  if(button[165].press() == true){bt[165] = true;}
  if(button[166].press() == true){bt[166] = true;}
  if(button[167].press() == true){bt[167] = true;}
  if(button[168].press() == true){bt[168] = true;}
  if(button[169].press() == true){bt[169] = true;}
  if(button[170].press() == true){bt[170] = true;}
  if(button[171].press() == true){bt[171] = true; bt[172] = true;}
  if(button[173].press() == true){bt[173] = true;}
  if(button[174].press() == true){bt[174] = true; bt[183] = true;}
  if(button[175].press() == true){bt[175] = true;}
  if(button[176].press() == true){bt[176] = true; bt[182] = true;}
  if(button[177].press() == true){bt[177] = true;}
  if(button[178].press() == true){bt[178] = true;}
  if(button[179].press() == true){bt[179] = true;}
  if(button[180].press() == true){bt[180] = true;}
  if(button[181].press() == true){bt[181] = true;}
  if(button[183].press() == true){bt[186] = true;}
  if(button[184].press() == true){bt[184] = true;}
  if(button[185].press() == true){bt[185] = true;}
  if(button[186].press() == true){bt[186] = true;}
  if(button[187].press() == true){bt[187] = true;}
  if(button[188].press() == true){bt[188] = true; start[10]=true;}
  if(button[189].press() == true){bt[189] = true;}
  if(button[190].press() == true){start[500] = true;}
  if(button[191].press() == true){bt[191] = true; start[22] = true;}
  if(button[192].press() == true){start[4]=true; bt[192] = true; bt[197] = true;}
  if(button[193].press() == true){bt[193] = true;}
  if(button[194].press() == true){bt[194] = true;}
  if(button[195].press() == true){bt[195] = true;}
  if(button[196].press() == true){bt[196] = true;}
  if(button[198].press() == true){bt[198] = true;}
  if(button[199].press() == true){bt[199] = true;}
  if(button[200].press() == true){bt[200] = true;}
  if(button[201].press() == true){bt[201] = true;}
  if(button[202].press() == true){start[6]=true; bt[202] = true;}
  if(button[203].press() == true){bt[203] = true;}
  if(button[204].press() == true){bt[204] = true;}
  if(button[205].press() == true){bt[205] = true;}
  if(button[206].press() == true){bt[206] = true;}
  if(button[207].press() == true){bt[207] = true; bt[217] = true;}
  if(button[208].press() == true){bt[208] = true;}
  if(button[209].press() == true){bt[209] = true;}
  if(button[210].press() == true){bt[210] = true;}
  if(button[211].press() == true){bt[211] = true;}
  if(button[212].press() == true){bt[212] = true;}
  if(button[213].press() == true){bt[213] = true; bt[214] = true;}
  if(button[215].press() == true){bt[215] = true;}
  if(button[216].press() == true){bt[216] = true; start[4] = false;}
  if(button[218].press() == true){start[3]= true; bt[218] = true;}
  if(button[219].press() == true){bt[219] = true;}
  if(button[220].press() == true){bt[220] = true;}
  if(button[221].press() == true){bt[221] = true;}
  if(button[222].press() == true){bt[222] = true;}
  if(button[223].press() == true){bt[223] = true;}
  if(button[224].press() == true){bt[224] = true; bt[225] = true;}
  if(button[225].press() == true){bt[226] = true; start[6] = false;}
  if(button[226].press() == true){bt[226] = true;}
  if(button[227].press() == true){bt[227] = true;}
  if(button[228].press() == true){bt[228] = true;}
  if(button[229].press() == true){bt[229] = true;}
  if(button[230].press() == true){bt[230] = true;}
  if(button[231].press() == true){bt[231] = true;}
  if(button[232].press() == true){bt[232] = true;}
  if(button[233].press() == true){bt[233] = true;}
  if(button[234].press() == true){bt[234] = true;}
  if(button[235].press() == true){bt[235] = true;}
  if(button[236].press() == true){bt[236] = true;}
  if(button[237].press() == true){bt[237] = true;}
  if(button[238].press() == true){bt[238] = true;}
  if(button[239].press() == true){bt[239] = true;}
  if(button[240].press() == true){bt[240] = true;}
  if(button[241].press() == true){bt[241] = true;}
  if(button[242].press() == true){bt[242] = true; bt[246] = true;}
  if(button[243].press() == true){bt[243] = true;}
  if(button[244].press() == true){start[2] = true; bt[244] = true;}
  if(button[245].press() == true){bt[245] = true;}
  if(button[246].press() == true){bt[248] = true; bt[249] = true;}
  if(button[247].press() == true){bt[247] = true;}
  if(button[248].press() == true){bt[248] = true;}
  if(button[250].press() == true){bt[250] = true;}
  if(button[251].press() == true){bt[251] = true;}
  if(button[252].press() == true){bt[252] = true;}
  if(button[253].press() == true){bt[253] = true;}
  if(button[254].press() == true){bt[254] = true;}
  if(button[255].press() == true){bt[255] = true;}
  if(button[256].press() == true){bt[256] = true;}
  if(button[257].press() == true){bt[257] = true;}
  if(button[258].press() == true){bt[258] = true;}
  if(button[259].press() == true){bt[259] = true; start[14] = true;}
  if(button[260].press() == true){bt[260] = true;}
  if(button[261].press() == true){bt[261] = true;}
  if(button[262].press() == true){bt[262] = true;}
  if(button[263].press() == true){bt[263] = true;}
  if(button[264].press() == true){bt[264] = true;}
  if(button[265].press() == true){bt[265] = true;}
  if(button[266].press() == true){bt[266] = true;}
  if(button[267].press() == true){bt[267] = true;}
  if(button[268].press() == true){bt[268] = true;}
  if(button[269].press() == true){bt[269] = true; bt[272] = true;}
  if(button[270].press() == true){bt[270] = true;}
  if(button[271].press() == true){bt[271] = true; start[2] = false;}
  if(button[273].press() == true){bt[273] = true;}
  if(button[274].press() == true){bt[274] = true; start[15]=true;}
  if(button[275].press() == true){bt[275] = true; bt[276]= true;}
  if(button[277].press() == true){bt[277] = true;}
  if(button[278].press() == true){bt[278] = true; bt[279] = true;}
  if(button[280].press() == true){bt[280] = true;}
  if(button[281].press() == true){bt[281] = true; bt[282] = true;}
  if(button[283].press() == true){bt[283] = true;}
  if(button[284].press() == true){bt[284] = true;}
  if(button[285].press() == true){bt[285] = true;}
  if(button[286].press() == true){bt[286] = true;}
  if(button[287].press() == true){bt[287] = true;}
  if(button[288].press() == true){bt[288] = true;}
  if(button[289].press() == true){bt[289] = true;}
  if(button[290].press() == true){bt[290] = true;}
  if(button[291].press() == true){bt[291] = true;}
  if(button[292].press() == true){bt[292] = true;}
  if(button[293].press() == true){bt[293] = true;}
  if(button[294].press() == true){bt[294] = true;}
  if(button[295].press() == true){bt[295] = true;}
  if(button[296].press() == true){bt[296] = true;}
  if(button[297].press() == true){bt[297] = true;}
  if(button[298].press() == true){bt[298] = true;}
  if(button[299].press() == true){bt[299] = true;}
  if(button[300].press() == true){bt[300] = true;}
  if(button[301].press() == true){bt[301] = true;}
  if(button[302].press() == true){bt[302] = true;}
  if(button[303].press() == true){bt[303] = true;}
  if(button[304].press() == true){bt[304] = true; start[24] = true;}
  if(button[305].press() == true){bt[305] = true;}
  if(button[306].press() == true){bt[306] = true; bt[309] = true;}
  if(button[307].press() == true){bt[307] = true;}
  if(button[308].press() == true){bt[308] = true;}
  if(button[309].press() == true){start[24] = false;}
  if(button[310].press() == true){bt[310] = true;}
  if(button[311].press() == true){bt[311] = true;}
  if(button[312].press() == true){bt[312] = true;}
  if(button[313].press() == true){bt[313] = true;}
  if(button[314].press() == true){bt[314] = true;}
  if(button[315].press() == true){bt[315] = true;}
  if(button[316].press() == true){bt[316] = true;}
  if(button[317].press() == true){bt[317] = true;}
  if(button[318].press() == true){bt[318] = true;}
  if(button[319].press() == true){bt[319] = true;}
  if(button[320].press() == true){bt[320] = true;}
  if(button[321].press() == true){bt[189] = true;}
  if(button[322].press() == true){start[23] = true; bt[322] = true;}
  if(button[323].press() == true){bt[323] = true; bt[343] = true;start[5] = true;}
  if(button[324].press() == true){bt[324] = true;}
  if(button[325].press() == true){bt[325] = true;}
  if(button[326].press() == true){bt[326] = true;}
  if(button[327].press() == true){bt[327] = true;}
  if(button[328].press() == true){bt[328] = true;}
  if(button[329].press() == true){bt[329] = true;}
  if(button[330].press() == true){bt[330] = true;}
  if(button[331].press() == true){bt[331] = true; start[21] = true;}
  if(button[332].press() == true){bt[332] = true;}
  if(button[333].press() == true){bt[333] = true;}
  if(button[334].press() == true){bt[334] = true;}
  if(button[335].press() == true){bt[335] = true;}
  if(button[336].press() == true){bt[336] = true;}
  if(button[337].press() == true){bt[337] = true;}
  if(button[338].press() == true){bt[338] = true;}
  if(button[339].press() == true){bt[339] = true;}
  if(button[340].press() == true){bt[340] = true;}
  if(button[341].press() == true){bt[341] = true;}
  if(button[342].press() == true){bt[342] = true;}
  if(button[344].press() == true){bt[344] = true;}
  if(button[345].press() == true){bt[345] = true;}
  if(button[346].press() == true){bt[346] = true;}
  if(button[347].press() == true){bt[347] = true;}
  if(button[348].press() == true){bt[348] = true;}
  if(button[349].press() == true){bt[349] = true;start[17] = true;}
  if(button[350].press() == true){bt[350] = true;}
  if(button[351].press() == true){bt[351] = true;}
  if(button[352].press() == true){bt[352] = true;}
  if(button[353].press() == true){bt[353] = true;}
  if(button[354].press() == true){bt[354] = true;}
  if(button[355].press() == true){bt[355] = true;}
  if(button[356].press() == true){bt[356] = true;}
  if(button[357].press() == true){start[8] = true; bt[357] = true; bt[367] = true; bt[368] = true;}
  if(button[358].press() == true){bt[358] = true;}
  if(button[359].press() == true){bt[359] = true;}
  if(button[360].press() == true){bt[360] = true;}
  if(button[361].press() == true){bt[361] = true;}
  if(button[362].press() == true){bt[362] = true;}
  //if(button[363].press() == true){start[5] = true;}
  if(button[365].press() == true){bt[363] = true;}
  if(button[366].press() == true){bt[364] = true;}
  if(button[367].press() == true){bt[365] = true;}
  if(button[368].press() == true){bt[366] = true;}
  if(button[369].press() == true){bt[369] = true;}
  if(button[370].press() == true){bt[370] = true; bt[372] = true;}
  if(button[371].press() == true){bt[371] = true;}
  if(button[373].press() == true){bt[373] = true;}
  if(button[374].press() == true){bt[374] = true;}
  if(button[375].press() == true){bt[375] = true;}
  if(button[376].press() == true){bt[376] = true;}
  if(button[377].press() == true){bt[377] = true;}
  if(button[378].press() == true){bt[378] = true;}
  if(button[379].press() == true){bt[379] = true;}
  if(button[381].press() == true){bt[381] = true;}
  if(button[382].press() == true){bt[382] = true;}
  if(button[383].press() == true){bt[383] = true; bt[417] = true;}
  if(button[384].press() == true){bt[384] = true;}
  if(button[385].press() == true){bt[385] = true;}
  if(button[386].press() == true){bt[386] = true;}
  if(button[387].press() == true){bt[387] = true; bt[388] = true;}
  if(button[388].press() == true){start[25] = true;}
  if(button[389].press() == true){bt[389] = true;}
  if(button[390].press() == true){bt[390] = true;}
  if(button[391].press() == true){bt[391] = true; bt[395] = true;}
  if(button[392].press() == true){bt[392] = true;}
  if(button[393].press() == true){start[3]=false; bt[393] = true;}
  if(button[394].press() == true){bt[394] = true;}
  if(button[396].press() == true){bt[396] = true;}
  if(button[397].press() == true){bt[397] = true;}
  if(button[398].press() == true){bt[398] = true; start[16] = true;}
  if(button[399].press() == true){bt[399] = true;}
  if(button[400].press() == true){bt[400] = true;}
  if(button[401].press() == true){bt[401] = true; bt[406] = true;}
  if(button[402].press() == true){bt[402] = true;}
  if(button[403].press() == true){bt[403] = true; bt[404] = true;}
  if(button[405].press() == true){bt[405] = true;}
  if(button[407].press() == true){bt[407] = true;}
  if(button[408].press() == true){bt[408] = true;}
  if(button[409].press() == true){bt[409] = true;}
  if(button[410].press() == true){bt[410] = true;}
  if(button[411].press() == true){bt[411] = true;}
  if(button[412].press() == true){bt[412] = true;}
  if(button[413].press() == true){bt[413] = true;}
  if(button[414].press() == true){bt[414] = true;}
  if(button[415].press() == true){bt[415] = true;}
  if(button[416].press() == true){bt[416] = true;}
  if(button[418].press() == true){bt[418] = true;}
  if(button[419].press() == true){bt[419] = true;}
  if(button[420].press() == true){bt[420] = true;}
  if(button[421].press() == true){bt[421] = true;}
  if(button[422].press() == true){bt[422] = true;}
  if(button[423].press() == true){bt[423] = true; start[19] = true;}
  if(button[424].press() == true){bt[424] = true;}
  if(button[425].press() == true){bt[425] = true;}
  if(button[426].press() == true){bt[426] = true;}
  if(button[427].press() == true){bt[427] = true;}
  if(button[428].press() == true){bt[428] = true;}
  if(button[429].press() == true){bt[429] = true;}
  if(button[430].press() == true){bt[430] = true;}
  if(button[431].press() == true){bt[431] = true;}
  if(button[432].press() == true){bt[432] = true;}
  if(button[433].press() == true){bt[433] = true;}
  if(button[434].press() == true){bt[434] = true;}
  if(button[435].press() == true){bt[435] = true;}
  if(button[436].press() == true){bt[436] = true;}
  if(button[437].press() == true){bt[437] = true;}
  if(button[438].press() == true){bt[438]= true;}
  if(button[439].press() == true){bt[439] = true;}
  if(button[440].press() == true){bt[440] = true;}
  if(button[441].press() == true){bt[441] = true;}
  if(button[442].press() == true){bt[442] = true; bt[454] = true;}
  if(button[443].press() == true){bt[443] = true;}
  if(button[444].press() == true){bt[444] = true;}
  if(button[445].press() == true){bt[445] = true;}
  if(button[446].press() == true){bt[446] = true; start[18] = true;}
  if(button[447].press() == true){bt[447] = true;}
  if(button[448].press() == true){bt[448] = true;}
  if(button[449].press() == true){bt[449] = true;}
  if(button[450].press() == true){bt[450] = true;}
  if(button[451].press() == true){bt[451] = true;}
  if(button[452].press() == true){bt[452] = true;}
  if(button[453].press() == true){bt[453] = true;}
  if(button[455].press() == true){bt[455] = true;}
  if(button[456].press() == true){bt[456] = true;}
  if(button[457].press() == true){bt[457] = true;}
  if(button[458].press() == true){bt[458] = true;}
  if(button[459].press() == true){bt[459] = true;}
  if(button[460].press() == true){bt[460] = true;}
  if(button[461].press() == true){bt[461] = true;}
  if(button[462].press() == true){bt[462] = true;}
  if(button[463].press() == true){bt[463]= true;}
  if(button[464].press() == true){bt[464] = true;}
  if(button[465].press() == true){bt[465] = true;}
  if(button[466].press() == true){bt[466] = true;}
  if(button[467].press() == true){bt[467] = true; start[20] = true;}
  if(button[468].press() == true){bt[468] = true;}
  if(button[469].press() == true){bt[469] = true;}
  if(button[470].press() == true){bt[470] = true;}
  if(button[471].press() == true){bt[471] = true;}
  if(button[472].press() == true){bt[472] = true;}
  if(button[473].press() == true){bt[473] = true;}
  if(button[474].press() == true){bt[474] = true;}
  if(button[475].press() == true){bt[475] = true;}
  if(button[476].press() == true){bt[476] = true;}
  if(button[477].press() == true){bt[477] = true;}
  if(button[478].press() == true){bt[478] = true;}
  if(button[479].press() == true){bt[479] = true;}
  if(button[480].press() == true){bt[480] = true;}
  if(button[481].press() == true){bt[481] = true;}
  if(button[482].press() == true){bt[482] = true;}
  if(button[483].press() == true){bt[483] = true; start[8] = false; bt[421]=false; bt[422]=false;
                                  bt[423]=false; bt[424]=false; bt[425]=false; bt[426]=false;
                                  bt[428]=false; bt[429]=false; bt[430]=false; bt[431]=false;
                                  bt[432]=false; bt[433]=false; bt[434]=false; bt[435]=false;
                                  bt[436]=false; bt[437]=false; bt[438]=false; bt[439]=false;
                                  bt[440]=false; bt[441]=false; bt[442]=false; bt[443]=false; 
                                  bt[444]=false; bt[445]=false; bt[446]=false; bt[447]=false; 
                                  bt[448]=false; bt[449]=false; bt[450]=false; bt[451]=false;
                                  bt[452]=false; bt[453]=false; bt[454]=false; bt[455]=false;
                                  bt[456]=false; bt[457]=false; bt[458]=false; bt[459]=false;
                                  bt[460]=false; bt[461]=false; bt[462]=false; bt[463]=false;
                                  bt[464]=false; bt[465]=false; bt[466]=false; bt[467]=false;
                                  bt[468]=false; bt[469]=false; bt[470]=false; bt[471]=false;
                                  bt[472]=false; bt[473]=false; bt[474]=false; bt[475]=false;
                                  bt[476]=false; bt[477]=false; bt[478]=false; bt[479]=false;
                                  bt[480]=false; bt[481]=false; bt[482]=false; start[20] = false;
                                  start[18] = false;}
  if(button[484].press() == true){bt[484] = true;}
  if(button[485].press() == true){bt[485] = true;}
  if(button[486].press() == true){bt[486] = true;}
  if(button[487].press() == true){bt[487] = true;}
  if(button[488].press() == true){bt[488] = true;}
  if(button[489].press() == true){bt[489] = true;}
  if(button[490].press() == true){bt[490] = true;}
  if(button[491].press() == true){bt[491] = true;}
  if(button[492].press() == true){bt[492] = true;}
  if(button[493].press() == true){bt[493] = true;}
  if(button[494].press() == true){bt[494] = true;}
  if(button[495].press() == true){bt[495] = true;}
  if(button[496].press() == true){bt[496] = true;}
  if(button[497].press() == true){bt[497] = true;}
  if(button[498].press() == true){bt[498] = true;}
  if(button[499].press() == true){bt[499] = true;}
  if(button[500].press() == true){bt[500] = true;}
  if(button[501].press() == true){bt[501] = true;}
  if(button[502].press() == true){bt[502] = true;}
  if(button[503].press() == true){bt[503] = true;}
  if(button[504].press() == true){bt[504] = true;}
  if(button[505].press() == true){bt[505] = true;}
  if(button[506].press() == true){bt[506] = true;}
  if(button[507].press() == true){bt[507]= true;}
  if(button[508].press() == true){bt[184]= true;}
}

void mouseReleased(){
  for (int i = 0; i < maze; i++) {
    button[i].release(); 
  }
  rects.release();
}



void keyPressed(){
  if(key == 'r'){
  for (int i = 0; i < bt.length; i++) {
    bt[i] = false;
    start[i] = false;
  }
  }
  if (key=='z') {
    save("screenshot5");
  }


  }


  
  

