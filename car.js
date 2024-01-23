var img = ""
var status = ""
objects = []

function preload(){
    img = loadImage("btl.jpeg") 
}
function setup(){
    canvas = createCanvas(640 , 420)
    canvas.center()
    objectDetector = ml5.objectDetector("cocossd" , modalLoaded)
    document.getElementById("status").innerHTML = "status : detecting objects"
    
}
function draw(){
    image(img, 0 ,0 ,640 , 420 )
    if(status !=""){
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object is detected"
            fill("red")
            percent = Math.floor(objects[i].confidence*100)
            name = objects[i].label
            text(name+percent+"%" , objects[i].x , objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
        }
    }
}
function modalLoaded(){
    console.log("modal is loaded")
    status = true ; 
    objectDetector.detect(img , gotResults)
}
function gotResults(error , results){
    if (error) {
console.log(error)        
    } else {
        console.log(results)
        objects = results
    }
}