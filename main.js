quick_draw_data_set=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant"]

random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1)
sketch=quick_draw_data_set[random_number]
document.getElementById("sketch_name").innerHTML="sketch to be drawn- "+sketch

timer_counter=0
timer_check=""
draw_sketch=""
answer_holder=""
score=0



function preload(){
  classifier=ml5.imageClassifier('DoodleNet')
}

function setup(){
  canvas=createCanvas(280,280)
  canvas.center()
  background("white")
  canvas.mouseReleased(classifyCanvas)
  
}

function draw(){
  stroke(0)
  strokeWeight(13)
  if(mouseIsPressed ){
       line(pmouseX,pmouseY,mouseX,mouseY)
  }
  checksketch()
  if(draw_sketch==sketch){
     answer_holder="set"
     score++
     document.getElementById("score").innerHTML="score: "+score
  }
}

function classifyCanvas(){
   classifier.classify(canvas,gotResult)

}

function clearcanvas(){
    background("white")
    random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1)
sketch=quick_draw_data_set[random_number]
document.getElementById("sketch_name").innerHTML="sketch to be drawn- "+sketch

}

function gotResult(error,results){
    if(error){
        console.error(error)
    }
    console.log(results)
    draw_sketch=results[0].label
    
    document.getElementById("label").innerHTML="your sketch: "+ draw_sketch
    document.getElementById("confidence").innerHTML="confidence: "+ Math.round(results[0].confidence*100)+'%'
}

function checksketch(){
  timer_counter++
  document.getElementById("time").innerHTML="timer: "+ timer_counter
  if(timer_counter>4000){
     timer_counter=0
     timer_check="completed"
  }

  if(timer_check=="completed" || answer_holder=="set"){
       timer_check=""
       answer_holder=""
       updatecanvas()
  }
}

function updatecanvas(){
  background("white")
  random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1)
sketch=quick_draw_data_set[random_number]
document.getElementById("sketch_name").innerHTML="sketch to be drawn- "+sketch
}
