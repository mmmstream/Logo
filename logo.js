let cnv;
let logo;

var desc;
var time;

let gravity;
let snow = [];
let cloud = [];

let cloudposx = -100;
let cloudposy = +10;
let zOff = 0;

let snowSpritesheet;
let textures = [];

function preload()
{
  //enter date for debugging here
  //dBugString = '1717122020';
  
  //Load daily OBJ
  logo = loadModel(objFile[findDate()][0], true);
  //Load specific OBJ (debugging)
  //logo = loadModel(objFile[dBugString][0],true);
  
  //Find description
  desc = objFile[findDate()][1];
  
  //load daily texture
  img = loadImage(textImg[findDate()][0], true);
  //load specific texture (debugging)
  //img = loadImage(textImg[dBugString][0],true);
  
  //load specific texture file name (debugging)
  //textDbug = textImg[dBugString][0];
  textDbug = textImg[findDate()][0];
  //load blender file number (debugging)
  //blenderFileNo = textImg[dBugString][1];
  
  //load font
  font = loadFont('assets/HussarPrintA-M9nY.otf');
  
  //Load snowSpritesheet
  snowSpritesheet = loadImage('assets/flakes32.png');
}

function setup() {
  cnv = createCanvas(1920, 1080, WEBGL);
  colorMode('RGBA');
  textSize(80);
  textAlign(CENTER, CENTER);
  
  gravity = createVector(0, 0.3);
  for (let x = 0; x < snowSpritesheet.width; x += 32) {
    for (let y = 0; y < snowSpritesheet.height; y += 32) {
      let img = snowSpritesheet.get(x, y, 32, 32);
      image(img, x, y);
      textures.push(img);
    }
  }

  for (let i = 0; i < 1920; i++) {
    let x = random(width/2);
    let y = random(height);
    let design = random(textures);
    snow.push(new Snowflake(x, y, design));
  }
}


function draw() {
  background(0,255,0);
  
  // Return description
  fill(250);
  textFont(font);
  
  //TODO: look up text and fonts 
  text(desc,-15,440);
  fill(255);
  
  if(minute() <= 9){
   time = day() + " " + findMonth() + " " + hour() + ":" + "0" + minute();
  }
  else{
   time = day() + " " + findMonth() + " " + hour() + ":" + minute();
  }
  
  // TODO: Update this to work in real time 
  if (hour() >= 17 )
  {
    text(time, -10, -470);
  }
  else
  {
    text('Streaming tonight at 17:00(GMT):', -10, -475);
  }
  
  //Display texture filename (debugging)
  //text(textDbug,-15,110);
  //Display blender file number
  //text(blenderFileNo, -15,130);
  
  //Render logo
  texture(img);
  scale(4);
  noStroke();
  model(logo);
  
  //Add clouds
  //TODO: Make clouds add randomly based on RNG and move
  scale(0.25);
  translate(0,0,50);
  makeCloud(cloudposx-(random(5,20)),cloudposy+160);
  rotate(0.12);
  makeCloud(cloudposx+100,cloudposy+150);
  rotate(0.1);
  makeCloud(cloudposx+40,cloudposy+200);
  
  //Add snowfall
  translate(-500,-500,50);
  if ( month() == 12 || month()== 1 ){
    zOff += 0.1;
    for (var flake of snow) {
      let xOff = flake.pos.x / width;
      let yOff = flake.pos.y / height;
      let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
      let wind = p5.Vector.fromAngle(wAngle);
      wind.mult(0.1);
  
      flake.applyForce(gravity);
      flake.applyForce(wind);
      flake.update();
      flake.render();
    }
  }
  
  //Add stars
  //translate(0,0,-100);
  fill(255);
  noStroke();
  ellipse(random(width),random(height),2,2);
  
  //Open link to website
  //cnv.mouseClicked(window.open("https://www.google.com"));
  
}

//TODO: Make better looking clouds with RNG custom shapes
function makeCloud(cloudx, cloudy){
  //Cloud Bump 1
  var CPoint1X = cloudx - random(30,40);
  var CPoint1Y = cloudy - random(30,40);
  var CPoint2X = cloudx + random(30,40);
  var CPoint2Y = cloudy - random(30,40);
  var APoint1  = cloudx + random(40,50);
  var APoint2  = cloudy - random(5,10);
  //Cloud Bump 2
  var CPoint3X = CPoint1X + random(30,100);
  var CPoint3Y = CPoint1Y - random(10,45);
  var CPoint4X = CPoint2X + random(50,120);
  var CPoint4Y = CPoint2Y + random(10,20);
  var APoint3  = APoint1  + random(50,80);
  var APoint4  = APoint2  + random(10,20);
  //Cloud Bump 3
  var CPoint5X = CPoint3X + random(70,80);
  var CPoint5Y = CPoint3Y - random(10,20);
  var CPoint6X = CPoint4X + random(180,200);
  var CPoint6Y = CPoint4Y - random(30,40);
  var APoint5  = APoint3  + random(90,100);
  var APoint6  = APoint4  + random(40,50);
  //Cloud Bump 4
  var CPoint7X = CPoint5X + random(20,30);
  var CPoint7Y = CPoint5Y + random(100,120);
  var CPoint8X = CPoint6X + random(10,20);
  var CPoint8Y = CPoint6Y + random(80,100);
  var APoint7  = APoint5  + random(80,90);
  var APoint8  = APoint6  + random(50,60);
  //Cloud Bump 5
  var CPoint9X  = CPoint7X - random(500,510);
  var CPoint9Y  = CPoint7Y + random(290,300);
  var CPoint10X = CPoint8X - random(500,510);
  var CPoint10Y = CPoint8Y + random(10,20);
  var APoint9   = APoint7  - random(400,410);
  var APoint10  = APoint8  + random(50,60); 
  //Cloud Bump 6
  var CPoint11X = CPoint9X + random(100,120);
  var CPoint11Y = CPoint9Y - random(300,310);
  var CPoint12X = CPoint10X + random(100,120);
  var CPoint12Y = CPoint10Y - random(100,110);
  var APoint11  = APoint9 + random(60,70);
  var APoint12  = APoint10 - random(100,120); 
  //Cloud Bump 7
  var CPoint13X = cloudx - random(70,80);
  var CPoint13Y = cloudy - random(30,40);
  var CPoint14X = cloudx - random(50,60);
  var CPoint14Y = cloudy - random(30,40);
  var APoint13  = cloudx - random(10,20);
  var APoint14  = cloudy - random(10,21);
  
  fill(random(250,255),67);
  noStroke();
  beginShape();
  vertex(cloudx,cloudy);
  //Draw Cloud Bump 1
  bezierVertex(CPoint1X, CPoint1Y, CPoint2X, CPoint2Y, APoint1, APoint2);
  //Draw Cloud Bump 2
  bezierVertex(CPoint3X,CPoint3Y, CPoint4X, CPoint4Y, APoint3, APoint4);
  //Draw Cloud Bump 3
  bezierVertex(CPoint5X,CPoint5Y, CPoint6X, CPoint6Y, APoint5, APoint6);
  //Draw Cloud Bump 4
  bezierVertex(CPoint7X,CPoint7Y, CPoint8X, CPoint8Y, APoint7, APoint8);
  //Draw Cloud Bump 5
  bezierVertex(CPoint9X,CPoint9Y, CPoint10X, CPoint10Y, APoint9, APoint10);
  //Draw Cloud Bump 6
  bezierVertex(CPoint11X,CPoint11Y, CPoint12X, CPoint12Y, APoint11, APoint12);
  //Draw Cloud Bump 7
  bezierVertex(CPoint13X,CPoint13Y, CPoint14X, CPoint14Y, APoint13, APoint14);
  endShape();
}

// TODO: Replace with findTime and use to animate in real time 
function findDate()
{
     date = 17 + "" + day() + "" + month() + "" + year();
     //Return a different value if it is a duplicate key date
     switch(date){
      case(171112021):
        if(month() == 11){
          date = 1711120212;
          break;
        }
        else{
          date = 171112021;
        }
        break;
      case(172112021):
        if(month() == 11){
          date = 1721120212;
          break;
        }
        else{
          date = 172112021;
        }
        break;
      case(173112021):
        if(month() == 11){
          date = 1731120212;
          break;
        }
        else{
          date = 173112021;
        }
        break;
      case(171122021):
        if(month() == 12){
          date = 1711220212;
          break;
        }
        else{
          date = 171122021;
        }
        break;
      case(172122021):
        if(month() == 12){
          date = 1721220212;
          break;
        }
        else{
          date = 172122021;
        }
        break;
      default: break;
     }
     return date;
  
}

function findMonth()
{
  switch(month())
  {
     case(1): 
       return 'Jan';
     case(2): 
       return 'Feb';
     case(3): 
       return 'Mar';
     case(4): 
       return 'Apr';
     case(5): 
       return 'May';
     case(6): 
       return 'Jun';
     case(7): 
       return 'Jul';
     case(8): 
       return 'Aug';
     case(9): 
       return 'Sep';
     case(10): 
       return 'Oct';
     case(11): 
       return 'Nov';
     case(12): 
       return 'Dec';

  }
}



//TODO: Add special models for birthday etc 
var objFile =
{               
   173112020 :  ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
               //18
   174112020 :  ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
               //19
   175112020 :  ["assets/waningGibbous1.obj", "7. Break"],
               //20
   176112020 :  ["assets/waningGibbous2.obj", "7. Break"], 
               //21
   177112020 :  ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
               //22
   178112020 :  ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
               //23
   179112020 :  ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
               //24
   1710112020 : ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
               //25
   1711112020 : ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
               //26
   1712112020 : ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
               //27
   1713112020 : ["assets/waningCrescent1.obj", "10. Visuals"],
               //28
   1714112020 : ["assets/waningCrescent2.obj", "10. Visuals"],
                //0  
   1715112020 : ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
                //1  
   1716112020 : ["assets/newMoon2.obj", "1. Composition - VCV Rack"],
                //2
   1717112020 : ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
                //3
   1718112020 : ["assets/newMoon4.obj", "2. Sound Design - VCV Rack"],
                //4
   1719112020 : ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
                //5
   1720112020 : ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
                //6
   1721112020 : ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
                //7
   1722112020 : ["assets/firstQuarter1.obj", "4. Production - Reaper"],
                //8
   1723112020 : ["assets/firstQuarter2.obj", "4. Production - Reaper"],
                //9
   1724112020 : ["assets/firstQuarter3.obj", "4. Production - Reaper"],
                //10
   1725112020 : ["assets/firstQuarter4.obj", "4. Production - Reaper"],
                //11
   1726112020 : ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
                //12
   1727112020 : ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
               //13
   1728112020 : ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
               //14
   1729112020 : ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
               //15
   1730112020 : ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
               //16
   171122020 :  ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
               //17
   172122020 :  ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
               //18
   173122020 :  ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
               //19
   174122020 :  ["assets/waningGibbous1.obj", "7. Break"],
               //20
   175122020 :  ["assets/waningGibbous2.obj", "7. Break"], 
               //21
   176122020 :  ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
               //22
   177122020 :  ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
               //23
   178122020 :  ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
               //24
   179122020 :  ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
               //25
   1710122020 : ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
               //26
   1711122020 : ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
               //27
   1712122020 : ["assets/waningCrescent1.obj", "10. Visuals"],
               //28
   1713122020 : ["assets/waningCrescent2.obj", "10. Visuals"],
                //0
   1714122020 : ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
                //1  
   1715122020 : ["assets/newMoon2.obj", "1. Composition - VCV Rack"],
                //2
   1716122020 : ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
                //3
   1717122020 : ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
                //4
   1718122020 : ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
                //5
   1719122020 : ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
                //6
   1720122020 : ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
                //7
   1721122020 : ["assets/firstQuarter1.obj", "4. Production - Reaper"],
                //8
   1722122020 : ["assets/firstQuarter2.obj", "4. Production - Reaper"],
                //9
   1723122020 : ["assets/firstQuarter3.obj", "4. Production - Reaper"],
                //10
   1724122020 : ["assets/firstQuarter4.obj", "4. Production - Reaper"],
                //11
   1725122020 : ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
                //12
   1726122020 : ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
               //13
   1727122020 : ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
               //14
   1728122020 : ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
               //15
   1729122020 : ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
               //16
   1730122020 : ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
               //17
   1731122020 : ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
   
   //2021      //18
   17112021:  ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
               //19
   17212021:  ["assets/waningGibbous1.obj", "7. Break"],
              //20
   17312021:  ["assets/waningGibbous2.obj", "7. Break"],
              //21
   17412021:  ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
              //22
   17512021:  ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
              //23
   17612021:  ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
              //24
   17712021:  ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
              //25
   17812021:  ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
              //26
   17912021:  ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
              //27
   171012021: ["assets/waningCrescent1.obj", "10. Visuals"],
              //28
   171112021: ["assets/waningCrescent2.obj", "10. Visuals"],
              //29
   171212021: ["assets/waningCrescent3.obj", "10. Visuals"],
              //0
   171312021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
              //1                                
   171412021: ["assets/newMoon2.obj", "1. Composition - VCV Rack"],
               //2
   171512021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
               //3
   171612021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
               //4
   171712021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
               //5
   171812021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
               //6                                                 
   171912021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
               //7                                                  
   172012021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
               //8
   172112021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
               //9
   172212021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
               //10
   172312021: ["assets/firstQuarter4.obj", "4. Production - Reaper"],
               //11
   172412021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
               //12
   172512021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
               //13
   172612021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
               //14
   172712021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
               //15
   172812021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
               //16
   172912021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
               //17
   173012021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
               //18
   173112021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
               //19
   17122021: ["assets/waningGibbous1.obj", "7. Break"],
               //20
   17222021: ["assets/waningGibbous2.obj", "7. Break"], 
               // 21
   17322021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
             // 22
   17422021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
               //23
   17522021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
               //24
   17622021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
               //25
   17722021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
               //26
   17822021: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
               //27
   17922021: ["assets/waningCrescent1.obj", "10. Visuals"],
               //28
   171022021: ["assets/waningCrescent2.obj", "10. Visuals"],
               //29
   171122021: ["assets/waningCrescent3.obj", "10. Visuals"],
              //0
   171222021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
              //2
   171322021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
               //3
   171422021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
               //4
   171522021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack" ],
               //5
   171622021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
               //6
   171722021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
              //7
   171822021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
             //8
   171922021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
             //9
   172022021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
             //10
   172122021: ["assets/firstQuarter4.obj", "4. Production - Reaper"],
             //11
   172222021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
             //12
   172322021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
             //13
   172422021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
             //14
   172522021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
             //15
   172622021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
             //16
   172722021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
             //17
   172822021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
             //18
   17132021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
             //19
   17232021: ["assets/waningGibbous1.obj", "7. Break"],
             //20
   17332021: ["assets/waningGibbous2.obj", "7. Break"],
             //21
   17432021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
             //22
   17532021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
             //23
   17632021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
             //24
   17732021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
             //25
   17832021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
             //26
   17932021: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
             //27
   171032021: ["assets/waningCrescent1.obj", "10. Visuals"],
             //28
   171132021: ["assets/waningCrescent2.obj", "10. Visuals"],
             //29
   171232021: ["assets/waningCrescent3.obj", "10. Visuals"],
              //0
   171332021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
             //1
   171432021: ["assets/newMoon2.obj", "1. Composition - VCV Rack"],
             //2
   171532021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
             //3
   171632021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
             //4
   171732021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
             //5
   171832021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
             //6
   171932021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
             //7
   172032021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
             //8
   172132021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
             //9
   172232021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
             //10
   172332021: ["assets/firstQuarter4.obj", "4. Production - Reaper"],
             //11
   172432021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
             //12
   172532021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
             //13
   172632021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
             //14
   172732021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
             //15
   172832021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"], 
             //16
   172932021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
             //17
   173032021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
             //18
   173132021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
             //19
   17142021: ["assets/waningGibbous1.obj", "7. Break"],
             //20
   17242021: ["assets/waningGibbous2.obj", "7. Break"], 
             //21
   17342021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
             //22
   17442021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
             //23
   17542021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
             //24
   17642021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
             //25
   17742021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
             //26
   17842021: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
             //27
   17942021: ["assets/waningCrescent1.obj", "10. Visuals"],
             //28
   171042021: ["assets/waningCrescent2.obj", "10. Visuals"],
             //29
   171142021: ["assets/waningCrescent3.obj", "10. Visuals"],
             //0
   171242021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
             //1
   171342021: ["assets/newMoon2.obj", "1. Composition - VCV Rack"],
             //2
   171442021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
             //3
   171542021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
             //4
   171642021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
             //5
   171742021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
             //6
   171842021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
             //7
   171942021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
             //8
   172042021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
             //9
   172142021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
             //10
   172242021: ["assets/firstQuarter4.obj", "4. Production - Reaper"],
             //11
   172342021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
             //12
   172442021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
             //13
   172542021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
             //14
   172642021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
             //15
   172742021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
             //16
   172842021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
             //17
   172942021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
             //18
   173042021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
             //19
   173142021: ["assets/waningGibbous1.obj", "7. Break"],
             //20
   17152021: ["assets/waningGibbous2.obj", "7. Break"], 
             //21
   17252021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
             //22
   17352021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
             //23
   17452021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
             //24
   17552021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
             //25
   17652021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
             //26
   17752021: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
             //27
   17852021: ["assets/waningCrescent1.obj", "10. Visuals"],
             //28
   17952021: ["assets/waningCrescent2.obj", "10. Visuals"],
             //29
   171052021: ["assets/waningCrescent3.obj", "10. Visuals"],
             //30
   171152021: ["assets/waningCrescent4.obj", "10. Visuals"],
             //0
   171252021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
             //2
   171352021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
             //3
   171452021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
             //4
   171552021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
             //5
   171652021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
             //6
   171752021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
             //7
   171852021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
             //8
   171952021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
             //9
   172052021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
             //10
   172152021: ["assets/firstQuarter4.obj", "4. Production - Reaper"], 
             //11
   172252021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
             //12
   172352021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
             //13
   172452021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
             //14
   172552021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
             //15
   172652021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
             //16
   172752021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
             //17
   172852021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
             //18
   172952021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
             //19
   173052021: ["assets/waningGibbous1.obj", "7. Break"],
             //20
   173152021: ["assets/waningGibbous2.obj", "7. Break"], 
             //21
   17162021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
             //22
   17262021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
             //23
   17362021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
             //24
   17462021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
             //25
   17562021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
             //26
   17662021: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
             //27
   17762021: ["assets/waningCrescent1.obj", "10. Visuals"],
             //28
   17862021: ["assets/waningCrescent2.obj", "10. Visuals"],
             //29
   17962021: ["assets/waningCrescent3.obj", "10. Visuals"],
             //0
   171062021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
             //1
   171162021: ["assets/newMoon2.obj", "1. Composition - VCV Rack"],
             //2
   171262021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
             //3
   171362021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
             //4
   171462021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
             //5
   171562021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
             //6
   171662021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
             //7
   171762021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
             //8
   171862021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
             //9
   171962021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
             //10
   172062021: ["assets/firstQuarter4.obj", "4. Production - Reaper"],
             //11
   172162021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
             //12
   172262021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
             //13
   172362021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
             //14
   172462021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
             //15
   172562021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
             //16
   172662021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
             //17
   172762021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
             //18
   172862021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
             //19
   172962021: ["assets/waningGibbous1.obj", "7. Break"],
             //20
   173062021: ["assets/waningGibbous2.obj", "7. Break"],
             //21
   17172021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
             //22
   17272021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
             //23
   17372021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
             //24
   17472021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
             //25
   17572021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
             //26
   17672021: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
             //27
   17772021: ["assets/waningCrescent1.obj", "10. Visuals"],
             //28
   17872021: ["assets/waningCrescent2.obj", "10. Visuals"],
             //29
   17972021: ["assets/waningCrescent3.obj", "10. Visuals"],
             //0
   171072021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
             //2
   171172021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
             //3
   171272021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
             //4
   171372021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
             //5
   171472021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
             //6
   171572021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
             //7
   171672021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
             //8
   171772021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
             //9
   171872021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
             //10
   171972021: ["assets/firstQuarter4.obj", "4. Production - Reaper"],
             //11
   172072021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
             //12
   172172021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
             //13
   172272021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
             //14
   172372021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
             //15
   172472021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
             //16
   172572021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
             //17
   172672021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
             //18
   172772021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
             //19
   172872021: ["assets/waningGibbous1.obj", "7. Break"],
             //20
   172972021: ["assets/waningGibbous2.obj", "7. Break"], 
             //21
   173072021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
             //22
   173172021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
             //23
   17182021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
             //24
   17282021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
             //25
   17382021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
             //26
   17482021: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
             //27
   17582021: ["assets/waningCrescent1.obj", "10. Visuals"],
             //28
   17682021: ["assets/waningCrescent2.obj", "10. Visuals"],
             //29  
   17782021: ["assets/waningCrescent3.obj", "10. Visuals"],
             //0
   17882021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
             //1  
   17982021: ["assets/newMoon2.obj", "1. Composition - VCV Rack"],
             //2
   171082021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
             //3
   171182021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
             //4
   171282021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
             //5
   171382021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
             //6
   171482021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
             //7
   171582021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
             //8
   171682021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
             //9
   171782021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
             //10
   171882021: ["assets/firstQuarter4.obj", "4. Production - Reaper"],
             //11
   171982021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
             //12
   172082021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
             //13
   172182021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
             //14
   172282021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
             //15
   172382021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
             //16
   172482021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
             //17
   172582021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
             //18
   172682021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
             //19
   172782021: ["assets/waningGibbous1.obj", "7. Break"],
             //20
   172882021: ["assets/waningGibbous2.obj", "7. Break"], 
             //21
   172982021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
             //22
   173082021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
             //23
   173182021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
             //24
   17192021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
             //25
   17292021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
             //26
   17392021: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
             //27
   17492021: ["assets/waningCrescent1.obj", "10. Visuals"],
             //28
   17592021: ["assets/waningCrescent2.obj", "10. Visuals"],
             //29
   17692021: ["assets/waningCrescent3.obj", "10. Visuals"],
             //0
   17792021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
             //2
   17892021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
             //3
   17992021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
             //4
   171092021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
             //5
   171192021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
             //6
   171292021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
             //7
   171392021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
             //8
   171492021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
             //9
   171592021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
             //10
   171692021: ["assets/firstQuarter4.obj", "4. Production - Reaper"],
             //11
   171792021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
             //12
   171892021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
             //13
   171992021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
             //14
   172092021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
             //15
   172192021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
             //16
   172292021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
             //17
   172392021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
             //18
   172492021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
             //19
   172592021: ["assets/waningGibbous1.obj", "7. Break"],
             //20
   172692021: ["assets/waningGibbous2.obj", "7. Break"], 
             //21
   172792021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
             //22
   172892021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
             //23
   172992021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
             //24
   173092021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
             //25
   171102021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
             //26
   172102021: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
             //27
   173102021: ["assets/waningCrescent1.obj", "10. Visuals"],
             //28
   174102021: ["assets/waningCrescent2.obj", "10. Visuals"],
             //29
   175102021: ["assets/waningCrescent3.obj", "10. Visuals"],
             //0
   176102021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
             //1
   177102021: ["assets/newMoon2.obj", "1. Composition - VCV Rack"],
             //2
   178102021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
             //3
   179102021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
             //4
   1710102021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
             //5
   1711102021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
             //6
   1712102021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
             //7
   1713102021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
             //8
   1714102021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
             //9
   1715102021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
             //10
   1716102021: ["assets/firstQuarter4.obj", "4. Production - Reaper"],
             //11
   1717102021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
             //12
   1718102021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
             //13
   1719102021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
             //14
   1720102021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
             //15
   1721102021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
             //16
   1722102021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
             //17
   1723102021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
             //18
   1724102021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
             //19
   1725102021: ["assets/waningGibbous1.obj", "7. Break"],
             //20
   1726102021: ["assets/waningGibbous2.obj", "7. Break"], 
             //21
   1727102021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
             //22
   1728102021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
             //23
   1729102021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
             //24
   1730102021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
             //25
   1731102021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
              //26
   1711120212: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
              //27
   1721120212: ["assets/waningCrescent1.obj", "10. Visuals"],
              //28
   1731120212: ["assets/waningCrescent2.obj", "10. Visuals"],
              //29
   174112021: ["assets/waningCrescent3.obj", "10. Visuals"],
              //0
   175112021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
             //2
   176112021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
             //3
   177112021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
             //4
   178112021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
             //5
   179112021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
             //6
   1710112021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
             //7
   1711112021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
             //8
   1712112021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
             //9
   1713112021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
             //10
   1714112021: ["assets/firstQuarter4.obj", "4. Production - Reaper"],
             //11
   1715112021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
             //12
   1716112021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
             //13
   1717112021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
             //14
   1718112021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
             //15
   1719112021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
             //16
   1720112021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
             //17
   1721112021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
             //18
   1722112021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
             //19
   1723112021: ["assets/waningGibbous1.obj", "7. Break"],
              //20
   1724112021: ["assets/waningGibbous2.obj", "7. Break"], 
              //21
   1725112021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
              //22
   1726112021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
             //23
   1727112021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
             //24
   1728112021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
              //25
   1729112021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
              //26
   1730112021: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
              //27
   1711220212: ["assets/waningCrescent1.obj", "10. Visuals"],
               //28
   1721220212: ["assets/waningCrescent2.obj", "10. Visuals"],
              //29
   173122021: ["assets/waningCrescent3.obj", "10. Visuals"],
              //0
   174122021: ["assets/newMoon1.obj", "1. Composition - VCV Rack"],
               //2
   175122021: ["assets/newMoon3.obj", "1. Composition - VCV Rack"],
               //3
   176122021: ["assets/newMoon4.obj", "2. Sound Design - VCV Rack" ],
               //4
   177122021: ["assets/newMoon5.obj", "2. Sound Design - VCV Rack"],
               //5
   178122021: ["assets/waxingCrescent1.obj", "3. Record - Reaper"],
               //6
   179122021: ["assets/waxingCrescent2.obj", "3. Record - Reaper"],
               //7
   1710122021: ["assets/firstQuarter1.obj", "4. Production - Reaper"],
               //8
   1711122021: ["assets/firstQuarter2.obj", "4. Production - Reaper"],
               //9
   1712122021: ["assets/firstQuarter3.obj", "4. Production - Reaper"],
               //10
   1713122021: ["assets/firstQuarter4.obj", "4. Production - Reaper"],
               //11
   1714122021: ["assets/waxingGibbous1.obj", "5. Arrangement - Reaper"],
               //12
   1715122021: ["assets/waxingGibbous2.obj", "5. Arrangement - Reaper"],
               //13
   1716122021: ["assets/waxingGibbous3.obj", "5. Arrangement - Reaper"],
               //14
   1717122021: ["assets/fullMoon1.obj", "6. Mixdown - Reaper"],
               //15
   1718122021: ["assets/fullMoon2.obj", "6. Mixdown - Reaper"],
               //16
   1719122021: ["assets/fullMoon3.obj", "6. Mixdown - Reaper"],
               //17
   1720122021: ["assets/fullMoon4.obj", "6. Mixdown - Reaper"],
               //18
   1721122021: ["assets/fullMoon5.obj", "6. Mixdown - Reaper"],
               //19
   1722122021: ["assets/waningGibbous1.obj", "7. Break"],
               //20
   1723122021: ["assets/waningGibbous2.obj", "7. Break"],
               //21
   1724122021: ["assets/waningGibbous3.obj", "8. Mastering - Reaper"],
               //22
   1725122021: ["assets/waningGibbous4.obj", "8. Mastering - Reaper"],
               //23
   1726122021: ["assets/waningGibbous5.obj", "8. Mastering - Reaper"],
               //24
   1727122021: ["assets/thirdQuarter1.obj", "9. Live - TidalCycles"],
               //25
   1728122021: ["assets/thirdQuarter2.obj", "9. Live - TidalCycles"],
               //26
   1729122021: ["assets/thirdQuarter3.obj", "9. Live - TidalCycles"],
               //27
   1730122021: ["assets/waningCrescent1.obj", "10. Visuals"],
               //28
   1731122021: ["assets/waningCrescent2.obj", "10. Visuals"],
};


var textImg =
{  

   174112020 :  ["assets/fullMoon5.png", "18.blend"],
   175112020 :  ["assets/waningGibbous1.png", "19.blend"],
   176112020 :  ["assets/waningGibbous2.png", "20.blend"], 
   177112020 :  ["assets/waningGibbous3.png", "21.blend"],
   178112020 :  ["assets/waningGibbous4.png", "22.blend"],
   179112020 :  ["assets/waningGibbous5.png", "23.blend"],
   1710112020 : ["assets/thirdQuarter1.png", "24.blend"],
   1711112020 : ["assets/thirdQuarter2.png", "25.blend"],
   1712112020 : ["assets/thirdQuarter3.png", "26.blend"],
   1713112020 : ["assets/waningCrescent1.png", "27.blend"],
   1714112020 : ["assets/waningCrescent2.png", "28.blend"],
   1715112020 : ["assets/newMoon1.png", "0.blend"],
   1716112020 : ["assets/newMoon2.png", "1.blend"],
   1717112020 : ["assets/newMoon3.png", "2.blend"],
   1718112020 : ["assets/newMoon4.png", "3.blend"],
   1719112020 : ["assets/newMoon5.png", "4.blend"],
   1720112020 : ["assets/waxingCrescent1.png", "5.blend"],
   1721112020 : ["assets/waxingCrescent2.png", "6.blend"],
   1722112020 : ["assets/firstQuarter1.png", "7.blend"],
   1723112020 : ["assets/firstQuarter2.png", "8.blend"],
   1724112020 : ["assets/firstQuarter3.png", "9.blend"],
   1725112020 : ["assets/firstQuarter4.png", "10.blend"],
   1726112020 : ["assets/waxingGibbous1.png", "11.blend"],
   1727112020 : ["assets/waxingGibbous2.png", "12.blend"],
   1728112020 : ["assets/waxingGibbous3.png", "13.blend"],
   1729112020 : ["assets/fullMoon1.png", "14.blend"],
   1730112020 : ["assets/fullMoon2.png", "15.blend"],
   171122020 :  ["assets/fullMoon3.png", "16.blend"],
   172122020 :  ["assets/fullMoon4.png", "17.blend"],
   173122020 :  ["assets/fullMoon5.png", "18.blend"],
   174122020 :  ["assets/waningGibbous1.png", "19.blend"],
   175122020 :  ["assets/waningGibbous2.png", "20.blend"], 
   176122020 :  ["assets/waningGibbous3.png", "21.blend"],
   177122020 :  ["assets/waningGibbous4.png", "22.blend"],
   178122020 :  ["assets/waningGibbous5.png", "23.blend"],
   179122020 :  ["assets/thirdQuarter1.png", "24.blend"],
   1710122020 : ["assets/thirdQuarter2.png", "25.blend"],
   1711122020 : ["assets/thirdQuarter3.png", "26.blend"],
   1712122020 : ["assets/waningCrescent1.png", "27.blend"],
   1713122020 : ["assets/waningCrescent2.png", "28.blend"],
   1714122020 : ["assets/newMoon1.png", "0.blend"],
   1715122020 : ["assets/newMoon2.png", "1.blend"],
   1716122020 : ["assets/newMoon3.png", "2.blend"],
   1717122020 : ["assets/newMoon4.png", "3.blend"],
   1718122020 : ["assets/newMoon5.png", "4.blend"],
   1719122020 : ["assets/waxingCrescent1.png", "5.blend"],
   1720122020 : ["assets/waxingCrescent2.png", "6.blend"],
   1721122020 : ["assets/firstQuarter1.png", "7.blend"],
   1722122020 : ["assets/firstQuarter2.png", "8.blend"],
   1723122020 : ["assets/firstQuarter3.png", "9.blend"],
   1724122020 : ["assets/firstQuarter4.png", "10.blend"],
   1725122020 : ["assets/waxingGibbous1.png", "11.blend"],
   1726122020 : ["assets/waxingGibbous2.png", "12.blend"],
   1727122020 : ["assets/waxingGibbous3.png", "13.blend"],
   1728122020 : ["assets/fullMoon1.png ", "14.blend"],
   1729122020 : ["assets/fullMoon2.png", "15.blend"],
   1730122020 : ["assets/fullMoon3.png", "16.blend"],
   1731122020 : ["assets/fullMoon4.png", "17.blend"],
   // 2021
   17112021: ["assets/fullMoon5.png", "18.blend"],
   17212021: ["assets/waningGibbous1.png", "19.blend"],
   17312021: ["assets/waningGibbous2.png", "20.blend"],
   17412021: ["assets/waningGibbous3.png", "21.blend"],
   17512021: ["assets/waningGibbous4.png", "22.blend"],
   17612021: ["assets/waningGibbous5.png", "23.blend"],
   17712021: ["assets/thirdQuarter1.png", "24.blend"],
   17812021: ["assets/thirdQuarter2.png", "25.blend"],
   17912021: ["assets/thirdQuarter3.png", "26.blend"],
   171012021: ["assets/waningCrescent1.png", "27.blend"],
   171112021: ["assets/waningCrescent2.png", "28.blend"],
   171212021: ["assets/waningCrescent3.png", "29.blend"],
   171312021: ["assets/newMoon1.png", "0.blend"],
   171412021: ["assets/newMoon2.png", "1.blend"],
   171512021: ["assets/newMoon3.png", "2.blend"],
   171612021: ["assets/newMoon4.png", "3.blend"],
   171712021: ["assets/newMoon5.png", "4.blend"],
   171812021: ["assets/waxingCrescent1.png", "5.blend"],
   171912021: ["assets/waxingCrescent2.png", "6.blend"],
   172012021: ["assets/firstQuarter1.png", "7.blend"],
   172112021: ["assets/firstQuarter2.png", "8.blend"],
   172212021: ["assets/firstQuarter3.png", "9.blend"],
   172312021: ["assets/firstQuarter4.png", "10.blend"],
   172412021: ["assets/waxingGibbous1.png", "11.blend"],
   172512021: ["assets/waxingGibbous2.png", "12.blend"],
   172612021: ["assets/waxingGibbous3.png", "13.blend"],
   172712021: ["assets/fullMoon1.png ", "14.blend"],
   172812021: ["assets/fullMoon2.png", "15.blend"],
   172912021: ["assets/fullMoon3.png", "16.blend"],
   173012021: ["assets/fullMoon4.png", "17.blend"],
   173112021: ["assets/fullMoon5.png", "18.blend"],
   17122021: ["assets/waningGibbous1.png", "19.blend"],
   17222021: ["assets/waningGibbous2.png", "20.blend"], 
   17322021: ["assets/waningGibbous3.png", "21.blend"],
   17422021: ["assets/waningGibbous4.png", "22.blend"],
   17522021: ["assets/waningGibbous5.png", "23.blend"],
   17622021: ["assets/thirdQuarter1.png", "24.blend"],
   17722021: ["assets/thirdQuarter2.png", "25.blend"],
   17822021: ["assets/thirdQuarter3.png", "26.blend"],
   17922021: ["assets/waningCrescent1.png", "27.blend"],
   171022021: ["assets/waningCrescent2.png", "28.blend"],
   171122021: ["assets/newMoon1.png", "0.blend"],
   171222021: ["assets/newMoon2.png", "1.blend"],
   171322021: ["assets/newMoon3.png", "2.blend"],
   171422021: ["assets/newMoon4.png", "3.blend"],
   171522021: ["assets/newMoon5.png", "4.blend"],
   171622021: ["assets/waxingCrescent1.png", "5.blend"],
                  //6
   171722021: ["assets/waxingCrescent2.png", "6.blend"],
              //7
   171822021: ["assets/firstQuarter1.png", "7.blend"],
             //8
   171922021: ["assets/firstQuarter2.png", "8.blend"],
             //9
   172022021: ["assets/firstQuarter3.png", "9.blend"],
             //10
   172122021: ["assets/firstQuarter4.png", "10.blend"],
             //11
   172222021: ["assets/waxingGibbous1.png", "11.blend"],
             //12
   172322021: ["assets/waxingGibbous2.png", "12.blend"],
             //13
   172422021: ["assets/waxingGibbous3.png", "13.blend"],
             //14
   172522021: ["assets/fullMoon1.png ", "14.blend"],
             //15
   172622021: ["assets/fullMoon2.png", "15.blend"],
             //16
   172722021: ["assets/fullMoon3.png", "16.blend"],
             //17
   172822021: ["assets/fullMoon4.png", "17.blend"],
             //18
   17132021: ["assets/fullMoon5.png", "18.blend"],
             //19
   17232021: ["assets/waningGibbous1.png", "19.blend"],
             //20
   17332021: ["assets/waningGibbous2.png", "20.blend"], 
             //21
   17432021: ["assets/waningGibbous3.png", "21.blend"],
             //22
   17532021: ["assets/waningGibbous4.png", "22.blend"],
             //23
   17632021: ["assets/waningGibbous5.png", "23.blend"],
             //24
   17732021: ["assets/thirdQuarter1.png", "24.blend"],
             //25
   17832021: ["assets/thirdQuarter2.png", "25.blend"],
             //26
   17932021: ["assets/thirdQuarter3.png", "26.blend"],
             //27
   171032021: ["assets/waningCrescent1.png", "27.blend"],
             //28
   171132021: ["assets/waningCrescent2.png", "28.blend"],
             //29
   171232021: ["assets/waningCrescent3.png", "29.blend"],
              //0
   171332021: ["assets/newMoon1.png", "0.blend"],
             //1
   171432021: ["assets/newMoon2.png", "1.blend"],
             //2
   171532021: ["assets/newMoon3.png", "2.blend"],
             //3
   171632021: ["assets/newMoon4.png", "3.blend"],
             //4
   171732021: ["assets/newMoon5.png", "4.blend"],
             //5
   171832021: ["assets/waxingCrescent1.png", "5.blend"],
             //6
   171932021: ["assets/waxingCrescent2.png", "6.blend"],
             //7
   172032021: ["assets/firstQuarter1.png", "7.blend"],
             //8
   172132021: ["assets/firstQuarter2.png", "8.blend"],
             //9
   172232021: ["assets/firstQuarter3.png", "9.blend"],
             //10
   172332021: ["assets/firstQuarter4.png", "10.blend"],
             //11
   172432021: ["assets/waxingGibbous1.png", "11.blend"],
             //12
   172532021: ["assets/waxingGibbous2.png", "12.blend"],
             //13
   172632021: ["assets/waxingGibbous3.png", "13.blend"],
             //14
   172732021: ["assets/fullMoon1.png ", "14.blend"],
             //15
   172832021: ["assets/fullMoon2.png", "15.blend"],  
             //16
   172932021: ["assets/fullMoon3.png", "16.blend"],
             //17
   173032021: ["assets/fullMoon4.png", "17.blend"],
             //18
   173132021: ["assets/fullMoon5.png", "18.blend"],
             //19
   17142021: ["assets/waningGibbous1.png", "19.blend"],
             //20
   17242021: ["assets/waningGibbous2.png", "20.blend"], 
             //21
   17342021: ["assets/waningGibbous3.png", "21.blend"],
             //22
   17442021: ["assets/waningGibbous4.png", "22.blend"],
             //23
   17542021: ["assets/waningGibbous5.png", "23.blend"],
             //24
   17642021: ["assets/thirdQuarter1.png", "24.blend"],
             //25
   17742021: ["assets/thirdQuarter2.png", "25.blend"],
             //26
   17842021: ["assets/thirdQuarter3.png", "26.blend"],
             //27
   17942021: ["assets/waningCrescent1.png", "27.blend"],
             //28
   171042021: ["assets/waningCrescent2.png", "28.blend"],
             //29
   171142021: ["assets/waningCrescent3.png", "29.blend"],
             //0
   171242021: ["assets/newMoon1.png", "0.blend"],
             //1
   171342021: ["assets/newMoon2.png", "1.blend"],
             //2
   171442021: ["assets/newMoon3.png", "2.blend"],
             //3
   171542021: ["assets/newMoon4.png", "3.blend"],
             //4
   171642021: ["assets/newMoon5.png", "4.blend"],
             //5
   171742021: ["assets/waxingCrescent1.png", "5.blend"],
             //6
   171842021: ["assets/waxingCrescent2.png", "6.blend"],
             //7
   171942021: ["assets/firstQuarter1.png", "7.blend"],
             //8
   172042021: ["assets/firstQuarter2.png", "8.blend"],
             //9
   172142021: ["assets/firstQuarter3.png", "9.blend"],
             //10
   172242021: ["assets/firstQuarter4.png", "10.blend"],
             //11
   172342021: ["assets/waxingGibbous1.png", "11.blend"],
             //12
   172442021: ["assets/waxingGibbous2.png", "12.blend"],
             //13
   172542021: ["assets/waxingGibbous3.png", "13.blend"],
             //14
   172642021: ["assets/fullMoon1.png ", "14.blend"],
             //15
   172742021: ["assets/fullMoon2.png", "15.blend"],
             //16
   172842021: ["assets/fullMoon3.png", "16.blend"],
             //17
   172942021:["assets/fullMoon4.png", "17.blend"],
             //18
   173042021:["assets/fullMoon5.png", "18.blend"],
             //19
   173142021:["assets/waningGibbous1.png", "19.blend"],
             //20
   17152021: ["assets/waningGibbous2.png", "20.blend"],
             //21
   17252021: ["assets/waningGibbous3.png", "21.blend"],
             //22
   17352021: ["assets/waningGibbous4.png", "22.blend"],
             //23
   17452021: ["assets/waningGibbous5.png", "23.blend"],
             //24
   17552021: ["assets/thirdQuarter1.png", "24.blend"],
             //25
   17652021: ["assets/thirdQuarter2.png", "25.blend"],
             //26
   17752021: ["assets/thirdQuarter3.png", "26.blend"],
             //27
   17852021: ["assets/waningCrescent1.png", "27.blend"],
             //28
   17952021: ["assets/waningCrescent2.png", "28.blend"],
             //29
   171052021: ["assets/waningCrescent3.png", "29.blend"],
             //30
   171152021: ["assets/waningCrescent4.png", "30.blend"],
             //0
   171252021: ["assets/newMoon1.png", "0.blend"],
             //2
   171352021: ["assets/newMoon3.png", "2.blend"],
             //3
   171452021: ["assets/newMoon4.png", "3.blend"],
             //4
   171552021: ["assets/newMoon5.png", "4.blend"],
             //5
   171652021: ["assets/waxingCrescent1.png", "5.blend"],
             //6
   171752021: ["assets/waxingCrescent2.png", "6.blend"],
             //7
   171852021: ["assets/firstQuarter1.png", "7.blend"],
             //8
   171952021: ["assets/firstQuarter2.png", "8.blend"],
             //9
   172052021: ["assets/firstQuarter3.png", "9.blend"],
             //10
   172152021: ["assets/firstQuarter4.png", "10.blend"],  
             //11
   172252021: ["assets/waxingGibbous1.png", "11.blend"],
             //12
   172352021: ["assets/waxingGibbous2.png", "12.blend"],
             //13
   172452021: ["assets/waxingGibbous3.png", "13.blend"],
             //14
   172552021: ["assets/fullMoon1.png ", "14.blend"],
             //15
   172652021: ["assets/fullMoon2.png", "15.blend"],
             //16
   172752021: ["assets/fullMoon3.png", "16.blend"],
             //17
   172852021: ["assets/fullMoon4.png", "17.blend"],
             //18
   172952021: ["assets/fullMoon5.png", "18.blend"],
             //19
   173052021: ["assets/waningGibbous1.png", "19.blend"],
             //20
   173152021: ["assets/waningGibbous2.png", "20.blend"], 
             //21
   17162021: ["assets/waningGibbous3.png", "21.blend"],
             //22
   17262021: ["assets/waningGibbous4.png", "22.blend"],
             //23
   17362021: ["assets/waningGibbous5.png", "23.blend"],
             //24
   17462021: ["assets/thirdQuarter1.png", "24.blend"],
             //25
   17562021: ["assets/thirdQuarter2.png", "25.blend"],
             //26
   17662021: ["assets/thirdQuarter3.png", "26.blend"],
             //27
   17762021: ["assets/waningCrescent1.png", "27.blend"],
             //28
   17862021: ["assets/waningCrescent2.png", "28.blend"],
             //29
   17962021: ["assets/waningCrescent3.png", "29.blend"],
             //0
   171062021: ["assets/newMoon1.png", "0.blend"],
             //1
   171162021: ["assets/newMoon2.png", "1.blend"],
             //2
   171262021: ["assets/newMoon3.png", "2.blend"],
             //3
   171362021: ["assets/newMoon4.png", "3.blend"],
             //4
   171462021: ["assets/newMoon5.png", "4.blend"],
             //5
   171562021: ["assets/waxingCrescent1.png", "5.blend"],
             //6
   171662021: ["assets/waxingCrescent2.png", "6.blend"],
             //7
   171762021: ["assets/firstQuarter1.png", "7.blend"],
             //8
   171862021: ["assets/firstQuarter2.png", "8.blend"],
             //9
   171962021: ["assets/firstQuarter3.png", "9.blend"],
             //10
   172062021: ["assets/firstQuarter4.png", "10.blend"],
             //11
   172162021: ["assets/waxingGibbous1.png", "11.blend"],
             //12
   172262021: ["assets/waxingGibbous2.png", "12.blend"],
             //13
   172362021: ["assets/waxingGibbous3.png", "13.blend"],
             //14
   172462021: ["assets/fullMoon1.png ", "14.blend"],
             //15
   172562021: ["assets/fullMoon2.png", "15.blend"],
             //16
   172662021: ["assets/fullMoon3.png", "16.blend"],
             //17
   172762021: ["assets/fullMoon4.png", "17.blend"],
             //18
   172862021: ["assets/fullMoon5.png", "18.blend"],
             //19
   172962021: ["assets/waningGibbous1.png", "19.blend"],
             //20
   173062021: ["assets/waningGibbous2.png", "20.blend"], 
             //21
   17172021: ["assets/waningGibbous3.png", "21.blend"],
             //22
   17272021: ["assets/waningGibbous4.png", "22.blend"],
             //23
   17372021: ["assets/waningGibbous5.png", "23.blend"],
             //24
   17472021: ["assets/thirdQuarter1.png", "24.blend"],
             //25
   17572021: ["assets/thirdQuarter2.png", "25.blend"],
             //26
   17672021: ["assets/thirdQuarter3.png", "26.blend"],
             //27
   17772021: ["assets/waningCrescent1.png", "27.blend"],
             //28
   17872021: ["assets/waningCrescent2.png", "28.blend"],
             //29
   17972021: ["assets/waningCrescent3.png", "29.blend"],
             //0
   171072021: ["assets/newMoon1.png", "0.blend"],
             //2
   171172021: ["assets/newMoon3.png", "2.blend"],
             //3
   171272021: ["assets/newMoon4.png", "3.blend"],
             //4
   171372021: ["assets/newMoon5.png", "4.blend"],
             //5
   171472021: ["assets/waxingCrescent1.png", "5.blend"],
             //6
   171572021: ["assets/waxingCrescent2.png", "6.blend"],
             //7
   171672021: ["assets/firstQuarter1.png", "7.blend"],
             //8
   171772021: ["assets/firstQuarter2.png", "8.blend"],
             //9
   171872021: ["assets/firstQuarter3.png", "9.blend"],
             //10
   171972021: ["assets/firstQuarter4.png", "10.blend"],
             //11
   172072021: ["assets/waxingGibbous1.png", "11.blend"],
             //12
   172172021: ["assets/waxingGibbous2.png", "12.blend"],
             //13
   172272021: ["assets/waxingGibbous3.png", "13.blend"],
             //14
   172372021: ["assets/fullMoon1.png ", "14.blend"],
             //15
   172472021: ["assets/fullMoon2.png", "15.blend"],
             //16
   172572021: ["assets/fullMoon3.png", "16.blend"],
             //17
   172672021: ["assets/fullMoon4.png", "17.blend"],
             //18
   172772021: ["assets/fullMoon5.png", "18.blend"],
             //19
   172872021: ["assets/waningGibbous1.png", "19.blend"],
             //20
   172972021: ["assets/waningGibbous2.png", "20.blend"], 
             //21
   173072021: ["assets/waningGibbous3.png", "21.blend"],
             //22
   173172021: ["assets/waningGibbous4.png", "22.blend"],
             //23
   17182021: ["assets/waningGibbous5.png", "23.blend"],
             //24
   17282021: ["assets/thirdQuarter1.png", "24.blend"],
             //25
   17382021: ["assets/thirdQuarter2.png", "25.blend"],
             //26
   17482021: ["assets/thirdQuarter3.png", "26.blend"],
             //27
   17582021: ["assets/waningCrescent1.png", "27.blend"],
             //28
   17682021: ["assets/waningCrescent2.png", "28.blend"],
             //29  
   17782021: ["assets/waningCrescent3.png", "29.blend"],
             //0
   17882021: ["assets/newMoon1.png", "0.blend"],
             //1  
   17982021: ["assets/newMoon2.png", "1.blend"],
             //2
   171082021: ["assets/newMoon3.png", "2.blend"],
             //3
   171182021: ["assets/newMoon4.png", "3.blend"],
             //4
   171282021: ["assets/newMoon5.png", "4.blend"],
             //5
   171382021: ["assets/waxingCrescent1.png", "5.blend"],
             //6
   171482021: ["assets/waxingCrescent2.png", "6.blend"],
             //7
   171582021: ["assets/firstQuarter1.png", "7.blend"],
             //8
   171682021: ["assets/firstQuarter2.png", "8.blend"],
             //9
   171782021: ["assets/firstQuarter3.png", "9.blend"],
             //10
   171882021: ["assets/firstQuarter4.png", "10.blend"],
             //11
   171982021: ["assets/waxingGibbous1.png", "11.blend"],
             //12
   172082021: ["assets/waxingGibbous2.png", "12.blend"],
             //13
   172182021: ["assets/waxingGibbous3.png", "13.blend"],
             //14
   172282021: ["assets/fullMoon1.png ", "14.blend"],
             //15
   172382021: ["assets/fullMoon2.png", "15.blend"],
             //16
   172482021: ["assets/fullMoon3.png", "16.blend"],
             //17
   172582021: ["assets/fullMoon4.png", "17.blend"],
             //18
   172682021: ["assets/fullMoon5.png", "18.blend"],
             //19
   172782021: ["assets/waningGibbous1.png", "19.blend"],
             //20
   172882021: ["assets/waningGibbous2.png", "20.blend"], 
             //21
   172982021: ["assets/waningGibbous3.png", "21.blend"],
             //22
   173082021: ["assets/waningGibbous4.png", "22.blend"],
             //23
   173182021: ["assets/waningGibbous5.png", "23.blend"],
             //24
   17192021: ["assets/thirdQuarter1.png", "24.blend"],
             //25
   17292021: ["assets/thirdQuarter2.png", "25.blend"],
             //26
   17392021: ["assets/thirdQuarter3.png", "26.blend"],
             //27
   17492021: ["assets/waningCrescent1.png", "27.blend"],
             //28
   17592021: ["assets/waningCrescent2.png", "28.blend"],
             //29
   17692021: ["assets/waningCrescent3.png", "29.blend"],
             //0
   17792021: ["assets/newMoon1.png", "0.blend"],
             //2
   17892021: ["assets/newMoon3.png", "2.blend"],
             //3
   17992021: ["assets/newMoon4.png", "3.blend"],
             //4
   171092021: ["assets/newMoon5.png", "4.blend"],
             //5
   171192021: ["assets/waxingCrescent1.png", "5.blend"],
             //6
   171292021: ["assets/waxingCrescent2.png", "6.blend"],
             //7
   171392021: ["assets/firstQuarter1.png", "7.blend"],
             //8
   171492021: ["assets/firstQuarter2.png", "8.blend"],
             //9
   171592021: ["assets/firstQuarter3.png", "9.blend"],
             //10
   171692021: ["assets/firstQuarter4.png", "10.blend"],
             //11
   171792021: ["assets/waxingGibbous1.png", "11.blend"],
             //12
   171892021: ["assets/waxingGibbous2.png", "12.blend"],
             //13
   171992021: ["assets/waxingGibbous3.png", "13.blend"],
             //14
   172092021: ["assets/fullMoon1.png ", "14.blend"],
             //15
   172192021: ["assets/fullMoon2.png", "15.blend"],
             //16
   172292021: ["assets/fullMoon3.png", "16.blend"],
             //17
   172392021: ["assets/fullMoon4.png", "17.blend"],
             //18
   172492021: ["assets/fullMoon5.png", "18.blend"],
             //19
   172592021: ["assets/waningGibbous1.png", "19.blend"],
             //20
   172692021: ["assets/waningGibbous2.png", "20.blend"], 
             //21
   172792021: ["assets/waningGibbous3.png", "21.blend"],
             //22
   172892021: ["assets/waningGibbous4.png", "22.blend"],
             //23
   172992021: ["assets/waningGibbous5.png", "23.blend"],
             //24
   173092021: ["assets/thirdQuarter1.png", "24.blend"],
             //25
   171102021: ["assets/thirdQuarter2.png", "25.blend"],
             //26
   172102021: ["assets/thirdQuarter3.png", "26.blend"],
             //27
   173102021: ["assets/waningCrescent1.png", "27.blend"],
             //28
   174102021: ["assets/waningCrescent2.png", "28.blend"],
             //29
   175102021: ["assets/waningCrescent3.png", "29.blend"],
             //0
   176102021: ["assets/newMoon1.png", "0.blend"],
             //1
   177102021: ["assets/newMoon2.png", "1.blend"],
             //2
   178102021: ["assets/newMoon3.png", "2.blend"],
             //3
   179102021: ["assets/newMoon4.png", "3.blend"],
             //4
   1710102021: ["assets/newMoon5.png", "4.blend"],
             //5
   1711102021: ["assets/waxingCrescent1.png", "5.blend"],
             //6
   1712102021: ["assets/waxingCrescent2.png", "6.blend"],
             //7
   1713102021: ["assets/firstQuarter1.png", "7.blend"],
             //8
   1714102021: ["assets/firstQuarter2.png", "8.blend"],
             //9
   1715102021: ["assets/firstQuarter3.png", "9.blend"],
             //10
   1716102021: ["assets/firstQuarter4.png", "10.blend"],
             //11
   1717102021: ["assets/waxingGibbous1.png", "11.blend"],
             //12
   1718102021: ["assets/waxingGibbous2.png", "12.blend"],
             //13
   1719102021: ["assets/waxingGibbous3.png", "13.blend"],
             //14
   1720102021: ["assets/fullMoon1.png ", "14.blend"],
             //15
   1721102021: ["assets/fullMoon2.png", "15.blend"],
             //16
   1722102021: ["assets/fullMoon3.png", "16.blend"],
             //17
   1723102021: ["assets/fullMoon4.png", "17.blend"],
             //18
   1724102021: ["assets/fullMoon5.png", "18.blend"],
             //19
   1725102021: ["assets/waningGibbous1.png", "19.blend"],
             //20
   1726102021: ["assets/waningGibbous2.png", "20.blend"],
             //21
   1727102021: ["assets/waningGibbous3.png", "21.blend"],
             //22
   1728102021: ["assets/waningGibbous4.png", "22.blend"],
             //23
   1729102021: ["assets/waningGibbous5.png", "23.blend"],
             //24
   1730102021: ["assets/thirdQuarter1.png", "24.blend"],
             //25
   1731102021: ["assets/thirdQuarter2.png", "25.blend"],
              //26
   1711120212: ["assets/thirdQuarter3.png", "26.blend"],
              //27
   1721120212: ["assets/waningCrescent1.png", "27.blend"],
              //28
   1731120212: ["assets/waningCrescent2.png", "28.blend"],
              //29
   174112021: ["assets/waningCrescent3.png", "29.blend"],
              //0
   175112021: ["assets/newMoon1.png", "0.blend"],
             //2
   176112021: ["assets/newMoon3.png", "2.blend"],
             //3
   177112021: ["assets/newMoon4.png", "3.blend"],
             //4
   178112021: ["assets/newMoon5.png", "4.blend"],
             //5
   179112021: ["assets/waxingCrescent1.png", "5.blend"],
             //6
   1710112021: ["assets/waxingCrescent2.png", "6.blend"],
             //7
   1711112021: ["assets/firstQuarter1.png", "7.blend"],
             //8
   1712112021: ["assets/firstQuarter2.png", "8.blend"],
             //9
   1713112021: ["assets/firstQuarter3.png", "9.blend"],
             //10
   1714112021: ["assets/firstQuarter4.png", "10.blend"],
             //11
   1715112021: ["assets/waxingGibbous1.png", "11.blend"],
             //12
   1716112021: ["assets/waxingGibbous2.png", "12.blend"],
             //13
   1717112021: ["assets/waxingGibbous3.png", "13.blend"],
             //14
   1718112021: ["assets/fullMoon1.png ", "14.blend"],
             //15
   1719112021: ["assets/fullMoon2.png", "15.blend"],
             //16
   1720112021: ["assets/fullMoon3.png", "16.blend"],
             //17
   1721112021: ["assets/fullMoon4.png", "17.blend"],
             //18
   1722112021: ["assets/fullMoon5.png", "18.blend"],
             //19
   1723112021: ["assets/waningGibbous1.png", "19.blend"],
              //20
   1724112021: ["assets/waningGibbous2.png", "20.blend"], 
              //21
   1725112021: ["assets/waningGibbous3.png", "21.blend"],
              //22
   1726112021: ["assets/waningGibbous4.png", "22.blend"],
             //23
   1727112021: ["assets/waningGibbous5.png", "23.blend"],
             //24
   1728112021: ["assets/thirdQuarter1.png", "24.blend"],
              //25
   1729112021: ["assets/thirdQuarter2.png", "25.blend"],
              //26
   1730112021: ["assets/thirdQuarter3.png", "26.blend"],
              //27
   1711220212: ["assets/waningCrescent1.png", "27.blend"],
               //28
   1721220212: ["assets/waningCrescent2.png", "28.blend"],
              //29
   173122021: ["assets/waningCrescent3.png", "29.blend"],
              //0
   174122021: ["assets/newMoon1.png", "0.blend"],
               //2
   175122021: ["assets/newMoon3.png", "2.blend"],
               //3
   176122021: ["assets/newMoon4.png", "3.blend"],
               //4
   177122021: ["assets/newMoon5.png", "4.blend"],
               //5
   178122021: ["assets/waxingCrescent1.png", "5.blend"],
               //6
   179122021: ["assets/waxingCrescent2.png", "6.blend"],
               //7
   1710122021: ["assets/firstQuarter1.png", "7.blend"],
               //8
   1711122021: ["assets/firstQuarter2.png", "8.blend"],
               //9
   1712122021: ["assets/firstQuarter3.png", "9.blend"],
               //10
   1713122021: ["assets/firstQuarter4.png", "10.blend"],
               //11
   1714122021: ["assets/waxingGibbous1.png", "11.blend"],
               //12
   1715122021: ["assets/waxingGibbous2.png", "12.blend"],
               //13
   1716122021: ["assets/waxingGibbous3.png", "13.blend"],
               //14
   1717122021: ["assets/fullMoon1.png ", "14.blend"],
               //15
   1718122021: ["assets/fullMoon2.png", "15.blend"],
               //16
   1719122021: ["assets/fullMoon3.png", "16.blend"],
               //17
   1720122021: ["assets/fullMoon4.png", "17.blend"],
               //18
   1721122021: ["assets/fullMoon5.png", "18.blend"],
               //19
   1722122021: ["assets/waningGibbous1.png", "19.blend"],
               //20
   1723122021: ["assets/waningGibbous2.png", "20.blend"], 
               //21
   1724122021: ["assets/waningGibbous3.png", "21.blend"],
               //22
   1725122021: ["assets/waningGibbous4.png", "22.blend"],
               //23
   1726122021: ["assets/waningGibbous5.png", "23.blend"],
               //24
   1727122021: ["assets/thirdQuarter1.png", "24.blend"],
               //25
   1728122021: ["assets/thirdQuarter2.png", "25.blend"],
               //26
   1729122021: ["assets/thirdQuarter3.png", "26.blend"],
               //27
   1730122021: ["assets/waningCrescent1.png", "27.blend"],
               //28
   1731122021: ["assets/waningCrescent2.png", "28.blend"],
};
