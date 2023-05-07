img = "";
status = "";
object = [];

function preload()
{
    img = loadImage("dog_cat.jpg");
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting object";
}

function modelLoaded()
{
    console.log("model Loaded");
    status = true;
    objectDetector.detect(img, gotresults);
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
        for(i = 0; i < object.length; i++)
        {

        document.getElementById("status").innerHTML = "Status : Object Detected";
        fill("#FF0000");
        percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
        noFill();
        stroke("#FF0000");
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
    }
    }
    
    /*fill("#ff0000");
    text("Dog" , 45, 75);
    noFill();
    stroke("#ff0000");
    rect(30, 60, 450, 350);

    fill("#ff0000");
    text("Cat" , 320, 120);
    noFill();
    stroke("#ff0000");
    rect(300, 90, 270, 320);*/
}

function gotresults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    object = results;
}