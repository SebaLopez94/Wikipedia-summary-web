/*MEDIA QUERIES (MEDIA MATCHING) FOR SIDE MENU AND CONTAINER*/

var mql = window.matchMedia("screen and (max-width: 750px)");
MediaQueryChange(mql);
mql.addListener(MediaQueryChange);
var mql2 = window.matchMedia("screen and (min-width: 750px)");
MediaQueryChange2(mql2);
mql2.addListener(MediaQueryChange2);
  
 
function hamburger(){ 
  document.getElementById("side-menu").classList.toggle("open");
  changeContainerMinMax();
}   

function MediaQueryChange(mql) {
  if (mql.matches && document.getElementById("side-menu").classList.contains("open")) {
    changeContainerMinMax();
    document.getElementById("side-menu").classList.toggle("open");
    
  }
}

function MediaQueryChange2(mql2) {
  if (mql2.matches && !document.getElementById("side-menu").classList.contains("open")) {
    changeContainerMinMax();
    document.getElementById("side-menu").classList.toggle("open");
  }
}

function changeContainerMinMax(){

  if(document.getElementById("contain").classList.contains("containerMax")){
    document.getElementById("contain").classList.remove("containerMax");
    document.getElementById("contain").classList.add("containerMin");}

  else if(document.getElementById("contain").classList.contains("containerMin")){
    document.getElementById("contain").classList.remove("containerMin");
    document.getElementById("contain").classList.add("containerMax");}

  
} 

/*FILL SELECT FORM WITH LANGUAGE AND THEIR VALUES*/

languages  = new Array ("English", "Arabic", "Chinese", "French", "German", "Italian", "Japanese", "Persian", "Russian", "Spanish");
languageCode  = new Array ("en", "ar", "zh", "fr", "de", "it", "ja", "fa", "ru", "es");


function language(){
  var i=0;
  var lenguagesAux=document.getElementById("languagesID");

  for ( i in languages){
    var option = document.createElement("option");
    option.text = languages[i];
    option.value = languageCode[i];
    lenguagesAux.add(option);
  }
}


/*AJAX and API REST*/

var xhr;
var info =document.getElementById("info");
var title =document.getElementById("title");
var image =document.getElementById("image");

function init_ajax(){
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }   
      
}

function apiCall() { 

    init_ajax(); 
    var langAux = document.getElementById("languagesID").value;
    var searchAux = document.getElementById("searchID").value;

    var url= "https://"+langAux+".wikipedia.org/api/rest_v1/page/summary/"+ searchAux +"?redirect=true";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = end_ApiCall;

    xhr.send();  
}

function end_ApiCall() { 
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {         
            var result = JSON.parse(xhr.responseText);
 
            title.innerHTML = result.title;    
            info.innerHTML = result.extract;  
            image.src=  result.thumbnail.source;    
        }
        else{ // You can have problems if you have disable cross-origin resources sharing (Access-Control-Allow-Origin)
            title.innerHTML = "Page not found :( "; 
            info.innerHTML = "";
            image.src = "images/wikipedia.png";
        }     
           
    }
}

 