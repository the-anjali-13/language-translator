const selecttagarr = document.querySelectorAll(".dropdown");
const textfrom = document.getElementById("textfrom");
const textto = document.getElementById("textto");
const translate = document.getElementById("translate");
const exchange = document.querySelector(".exchange");

const fromspeech = document.querySelector(".from-speech");
const fromcopy = document.querySelector(".from-copy"); 
const tospeech = document.querySelector(".to-speech");
const tocopy = document.querySelector(".to-copy"); 


selecttagarr.forEach((selecttag,id)=> {

    for(let country_code in countries){   

        let option = document.createElement("option");
        option.value=country_code; 
        option.innerText =countries[country_code] ;
        
        if(id==0 && country_code=="en"){
            option.setAttribute("selected","selected");
        }

        else if (id==1 && country_code=="hi"){
            option.setAttribute("selected","selected");
        }       
        
        selecttag.appendChild(option);

        // we can use this way too for adding languages
        //let option =`<option value="${country_code}">${countries[country_code]}</option>`;
        //selecttag.insertAdjacentHTML("beforeend",option);
    }
});


translate.addEventListener("click",()=>{

    let textval = textfrom.value; 
    let selectfrom = selecttagarr[0].value;
    let selectto = selecttagarr[1].value;

    if(!textval) return; 
    textto.setAttribute("placeholder","Translating...");

    const api_url = `https://lingva.ml/api/v1/${selectfrom}/${selectto}/${textval}`;

    fetch(api_url)
    .then((response) => {
      return response.json()
    })
  .then((data) => {
    console.log(data.translation);
    textto.value = data.translation;
    })
  .catch((error)=>{
        textto.value="oops! something went wrong, check the error: "+error;
    });

});

exchange.addEventListener("click",()=>{
    let temptext = textfrom.value ; 
    textfrom.value = textto.value; 
    textto.value = temptext; 

    let templang = selecttagarr[0].value;
    selecttagarr[0].value = selecttagarr[1].value;
    selecttagarr[1].value = templang;
});

fromcopy.addEventListener("click",()=>{
    navigator.clipboard.writeText(textfrom.value);
});

tocopy.addEventListener("click",()=>{
    navigator.clipboard.writeText(textto.value);
});


fromspeech.addEventListener("click",()=>{
    let speechtext = new SpeechSynthesisUtterance(textfrom.value);
    speechtext.lang = selecttagarr[0].value;
    speechSynthesis.speak(speechtext);
});

tospeech.addEventListener("click",()=>{
    let speechtext = new SpeechSynthesisUtterance(textto.value);
    speechtext.lang = selecttagarr[1].value;
    speechSynthesis.speak(speechtext);
});

// another api in another case : 
// const api_url = `https://api.mymemory.translated.net/get?q=${textval}!&langpair=${selectfrom}|${selectto}`;
    // fetch(api_url)
    // .then((response)=>{
    //     return response.json();
    // })
    // .then((data)=>{
    //     console.log(data);
    //     console.log(data.responseData.translatedText);
    //     textto.value = data.responseData.translatedText;
    // })
    // .catch((error)=>{
    //     textto.value="oops! something went wrong, check the error: "+error;
    // });