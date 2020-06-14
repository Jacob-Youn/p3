const body = document.querySelector("body");

const IMG_NUMBER = 3;

/*
function handleImgLoad(){     //for api
    console.log("finished loading");
}*/

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage"); 
    body.appendChild(image);
    //image.addEventListener("loadend", handleImgLoad);   //for api
}

function getRandom(){
    const number = Math.floor(Math.random() *3);
    return number;
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();