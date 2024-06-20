
// console.dir(window);// window è un oggetto e contiene proprietà e valori
let navbar = document.querySelector('#navbar');
//wrapper dei carousel 
let swiperwrapper = document.querySelector('#swiperwrapper');
//i tre elementi utili per il setintervall
let number1 = document.querySelector('#number1'); 
let number2 = document.querySelector('#number2');
let number3 = document.querySelector('#number3');
//img aereo posizionata accanto ai tre elementi per il set intervall
let imgaereo = document.querySelector('#imgaereo');



// provare varie condizioni 
window.addEventListener('scroll' , ()=>{
    if (window.scrollY > 0) { //quando scrolliamo la nav bar la proprietà scrolly parte da zero e quando noi scrolliamo verso il basso assume dei valori
        navbar.classList.add('scrollnavbar');  // navbar.style.backgroundColor = 'red'
        
    }else{
        navbar.classList.remove ('scrollnavbar') // }else if(window.scrollY = 0){  navbar.style.backgroundColor = 'green'
        
    }
})
//Recensioni per i carousel che andremo a generare dinamicamente
let object = {
    recensione : [
        {name : 'Vincenzo', surname : 'Montana' , review : 'Sito Affidabile e consegna rapida e veloce' , rank : 5},
        {name : 'Mauro', surname : 'Pigna' , review : 'Sito Affidabile ma hanno sbagliato indirizzo di consegna', rank : 4},
        {name : 'Luigi', surname : 'Fontana' , review : 'Sito non Affidabile, ho fatto il reso del prodotto', rank : 3},
        {name : 'Alessia', surname : 'Ciuni' , review : 'Sito eccezzionale spedizione puntuale e prodotto nuovo e sigillato' , rank : 3},
        {name : 'Gianfranco', surname : 'Mirisola' , review : 'non pensavo potesse esistere un sito così , complimenti', rank : 4 },
        {name : 'Ludovica', surname : 'Giannetti' , review : 'Sito Affidabile e consegna rapida e veloce', rank: 5},
    ],
    generatecarusel : function () {
        this.recensione.forEach((oggetto)=>{
            let divmajor = document.createElement('div');
            divmajor.classList.add('swiper-slide');
            let reviewcard = document.createElement('div');
            reviewcard.classList.add('reviewcard');
            reviewcard.innerHTML = `
                <h4>${oggetto.name}</h4>
                <h4>${oggetto.surname}</h4>
                <p>${oggetto.review}</p>
                <span>
                    <i class="${(oggetto.rank >= 1)?'fa-solid':'fa-regular'} fa-star"></i> 
                    <i class="${(oggetto.rank >= 2)?'fa-solid':'fa-regular'} fa-star"></i>
                    <i class="${(oggetto.rank >= 3)?'fa-solid':'fa-regular'} fa-star"></i>
                    <i class="${(oggetto.rank >= 4)?'fa-solid':'fa-regular'} fa-star"></i>
                    <i class="${(oggetto.rank >= 5)?'fa-solid':'fa-regular'} fa-star"></i>
                </span>
                `
            divmajor.appendChild(reviewcard);
            swiperwrapper.appendChild(divmajor);
        })
        // <i class="${(oggetto.rank >= 1)?'fa-solid':'fa-regular'} fa-star"></i> se oggetto.rank è > 1 fa solid altrimenti fa regular 
        
    }          
}
//invocazione funzione
object.generatecarusel();


//JS per i carosuel preso dal sito swiper 
let swiper = new Swiper(".mySwiper", { // new è una kiword che viene utilizzata per le classi in js,myswiper è la classe che identifica quel tipo di carosuel 
    effect: "coverflow",  //una classe è come se fosse un progetto che va a dire come dev' essere la struttura degli oggetti che formano un componente
    grabCursor: true,           
    centeredSlides: true,
    loop: true,             //ho aggiunto questo parametro preso da un'altro carosuel
    autoplay: {              // ho aggiunto autoplay
        delay: 2500,
        disableOnInteraction: true,
    },
    slidesPerView: "auto",   //  => oggetto style che contiene chiave/proprietà : valori 
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

//un'altra chiamata asincrona oltre alla fetch è il set interval che non fa altro che creare un loop infinito, ripeterà un blocco d'istruzione all'infinito 
// noi però possiamo gestire la durata delle singole interazioni come ad es incrementa di 1 ogni tot secondi 
//posso utilizzare anche un'altra chiamata con l'obiettivo di far fermare il set intervall che è il clear-intervall
//il clear interval ha bisogno e vuole sapere chi deve fermare ...ESEMPIO:
function createinterval (endNum, element, timeinterval){
    let counter = 0;
    let interval = setInterval(()=> {
        if (counter < endNum) {
            counter ++;
            element.innerHTML = counter;
            console.log(counter);
        }else{
            clearInterval(interval)
            console.log("mi hai fermato");
        }
    },timeinterval);
}   
let confirm = true   
//la kiword new serve per creare un oggetto di classe x (le classi si scrivono con la prima lettera maiuscola)
let observer = new IntersectionObserver((entries)=>{ // la variabile assume il valore di un oggetto di classe IntersectionObserver dove il parametro si attiva quando nel document incontriamo gli elementi che avranno la classe che abbiamo dato noi nel html
    entries.forEach((entry)=>{ //per ogni elemento che incontri nel document e che viene richiamato all'interno del oggetto di classe IntersectionObserver 
        if (entry.isIntersecting && confirm == true) { //se entry(l'elemento) viene intersecato 
            createinterval(100 , number1, 50); //il primo parametro è il numero che dev'essere raggiunto, il secondo è l'elemento span catturato
            createinterval(100 , number2, 100); //il secondo è l'elemento span catturato
            createinterval(100 , number3, 120);// il valore timeinterval rappresenta i milisecondi e quindi la velocità con cui counter si incrementa ogni volta di 1
            confirm = false;        //per far coincidere il set-timeut con il timeinterval devo sapere quanti millisecondi occorrono per raggiunger endnum
            imgaereo.classList.add('imgaereo'); //img catturata dal document
            setTimeout(()=>{
            confirm = true
            imgaereo.classList.remove('imgaereo');
            }, 5000)
        }
    })
})
observer.observe(number1);//richiamiamo la variabile observer e associamo il metodo observe, nella callback va inserito il parametro specifico di entries 

//setTimeout() è una chiamata asincrona che da inizio ad es ad un blocco d'istruzione dopo un tot di milisecondi