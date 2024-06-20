// ci siamo riportati dal main.js che è collegato al index.html  quello che ci serviva per inserirlo nel file annunci.js a sua volta collegato ad annunci.html  
let navbar = document.querySelector('#navbar');
let wrapper = document.querySelector('#wrapper'); //wrapper padre del div card 
let categoryradioswrapper = document.querySelector('#categoryradioswrapper');// div padre dei radio buttons
//elementi catturati per filtrare con prezzo 
let priceinput = document.querySelector('#priceinput'); //ho catturato imput di tipo range per filtrare per prezzo
let pricevalue = document.querySelector('#pricevalue'); //value del input tipo range
//elementi catturati per filtrare per parola 
let searchinput = document.querySelector('#searchinput'); //input di tipo search associato a filtra per parola 
let searchbutton = document.querySelector('#searchbutton');//button di tipo search associato a filtra per parola 

// abbiamo reso la nav dinamica 
window.addEventListener('scroll' , ()=>{
    if (window.scrollY > 0) { //quando scrolliamo la nav bar la proprietà scrolly parte da zero e quando noi scrolliamo verso il basso assume dei valori
        navbar.classList.add('scrollnavbar');  
        
    }else{
        navbar.classList.remove ('scrollnavbar') 
        
    }
})
//andremo a generare delle card utilizzando i dati contenuti in un file .json che sta per (javascript object notification) contiene dati complessi ed essendo dati strutturali sono pesanti e nn sono ottimali per la trasmissione , per javascript verranno visti invece questi dati non come strutturali e quindi come oggetto ma come primitivi come ad es una sctringa
//per essere convertito e letto questo dato strutturale  bisognerà appunto utilizzare una chiamata asincrona che farà js denominata fetch() in cui ci colleghiamo al file j.son e json ci restituice una promise che  è dato strutturale e che non possiamo ancora utilizzare  ma  grazie all metodo.then() lo convertiamo in dato strutturale per essere letto e utilizzato da js.
//fetch(collegamento con il j.son = './annunci.json' e mi restituisce una promise);  
//then() converte la promise in dato strutturale leggibile per js = .then((promise)=>promise.json())
//then()  per utilizzare il dato ottenuto = .then((data)=>{
// fetch('./annunci.json').then((response)=>response.json()).then((data)=>{
fetch('./annunci.json').then((response)=>response.json()).then((data)=>{
    function truncate (name){  
        if(name.length > 10){//se il contenuto di name contiene lettere>15
            return name.split(' ')[0] + ('...'); //mi fai uno split della singola parola +...
        }else{
            return name;
        }
        
    }
    let iconpreferite = [];
     //ho dato all'icona lo stesso id dell'immagine in modo da poter aggiungere l'intero oggetto(annuncio) appartenente all'icona cliccata in questo array
    //function generate card for each object content in data
    function showcards(data) {
        wrapper.innerHTML = '';
        data.forEach((elemento)=>{
        let div = document.createElement('div');
        div.classList.add('col-6', 'col-md-4', 'd-flex', 'mt-3');
        //ho aggiunto l'attributo title=">${elemento.name}">${truncate(elemento.name)}
        div.innerHTML =  ` 
            <img class="rounded-5 imgcard" src="https://picsum.photos/300/${300 + elemento.id}" alt="">
            <div class="cards">
                <h3 class="cardtitle title"${elemento.name}">${truncate(elemento.name)}</h3>
                <p class="cardcategory">${elemento.category}</p>
                <div class="d-flex justify-content-evenly align-items-center w-100  ">
                    <h4 class="cardprice">${elemento.price}</h4>
                    <i class="${iconpreferite.includes(elemento.id) ? 'fa-solid' : 'fa-regular'} fa-heart fa-xl ms-3" id="${elemento.id}" style="color: #981b1b;"></i> 
                </div>
            </div>
            `
        wrapper.appendChild(div)
        })
        let iconheart = document.querySelectorAll('.fa-heart');
        iconheart.forEach((icon)=>{
            icon.addEventListener('click', ()=>{
                if (!iconpreferite.includes(icon.id)) {
                    iconpreferite.push(parseInt(icon.id));
                    console.log(iconpreferite);
                    // icon.classList.add('fa-solid')
                }else{
                    let index = iconpreferite.indexOf(icon.id);
                    iconpreferite.splice(index, 1);  //altrimenti se in iconpreferite è incluso icon.id lo elimini
                
                }
                globalfilter();
            })
        })
    }
    //ho creato una funzione in cui per ogni singola category non ripetuta presente su data generiamo un radiobuttons 
    function generateradios(){
        let categorys = data.map((annuncio)=>annuncio.category) // un clone dove per ogni annuncio mi prendo solo le categorie
        let uniquecategorys = [];   //all'interno di questo array si trovano le singole categorie non ripetute di ogni oggetto
        categorys.forEach((category)=>{ //il parametro del for each rappresenta le singole categorie appartenenti ad ogni oggetto
            if (!uniquecategorys.includes(category)) {  //se !(bang operator)uniquecategorys non include la categoria la aggiungi  
            uniquecategorys.push(category);  //ho aggiunto nell array uniquecategorys le singole categorie non ripetute   
            }
        })

        // per ogni singola categoria creo un radiobutton 
        uniquecategorys.forEach((singlecategory)=>{          //nel innerhtml ho modificato l'id, il for,contenuto di radiobuttons
            let radios = document.createElement('div');
            radios.classList.add("form-check");             //ho aggiunto una classe al radio button per catturarli all'esterno della funzione
            radios.innerHTML = `
                <input class="form-check-input radiocategory" type="radio" name="categoryradios" id="${singlecategory}"> 
                <label class="form-check-label" for="${singlecategory}">
                <strong>${singlecategory}</strong>
                </label> `
            categoryradioswrapper.appendChild(radios); 
        })
//la cattura degli input radios mediante la classe l'ho messa nella sezione invocazione function; radiobutton verrà convertito in array nella funzione filterbycategory 
    }
    //creo una funziona dove in imput prende un array e mi restituisce un clone di data con gli annunci appartenenti a quella categoria
    //funzione filtra per categoria ; al posto di category passeremo un array per rendere funzionale globalfilter
    function filterbycategory(array){
        let category = Array.from(radiobutton).find( (button)=>button.checked).id; //convertiamo la node list radiobutton in array, per ogni buttonradios mi controlli la sua proprietà checked,grazie al find quando button.checked è true mi mostri il suo id in console
        console.log(category);
        if (category == 'all') { // se la categoria è = al suo id all mi ritorni (data)
            return array;
        }else if (category == iconpreferite){
            let filtered = array.filter((annuncio)=>iconpreferite.includes(annuncio.id)) //quegli annunci che hanno  un id che è incluso dentro iconpreferite  sono tra i preferiti e me lo metti nell'array filtrato 
            return filtered;
        }
        else{           // altrimenti se la categoria è = a quella che io clicco mi mi mostri gli annunci appartenenti a quella categoria
            let filtered = array.filter((annuncio)=>annuncio.category == category) // per ogni annuncio presente nel array filtrami soltanto gli annunci che saranno  == alla categoria che ha il cheked sul proprio buttonradio   
            return filtered;
        }
    }

    //funzione filtra per Prezzo
    function inputrange () {
        let prices = data.map ((annuncio)=> +annuncio.price);// il + ci modifica le stringhe in numeri
        prices.sort((a,b)=>a-b);                             //ordiniamo il prezzo in ordine crescente 
        let maxprice = Math.ceil(prices.pop());              //abbiamo il prezzo max arrotondato per eccesso (math.ceil)
        priceinput.max = maxprice;                           //l'imput di tipo range avrà il max price settato
        priceinput.value = maxprice;                         //rappresenta il max valore selezionato dall'utente
        let minprice = Math.floor(prices.shift());           //il priceinput rappresenta il tipo di button di tipo range
        priceinput.min = minprice;
        pricevalue.innerHTML = `$${maxprice}`                 //prezzo massimo che vede l'utente di default                
    }
    //per ogni annuncio mi filtri gli annunnci che hanno un prezzo <= a priceinput.value(valore che in quel momento è selezionato)
    function filterbyprice (array){
        let filtered = array.filter((annuncio)=>annuncio.price <= +priceinput.value);
        pricevalue.innerHTML = `$${priceinput.value}`
        return filtered
    }
    priceinput.addEventListener('input' , () =>{ //quando l'utente muove il priceinput.value avvi la funzione 
        globalfilter();
    
    })
    //filtra per parola 
    function filterbyword (array){
        let filtered = array.filter((annuncio)=>annuncio.name.toLowerCase().includes(searchinput.value.toLowerCase()));// per ogni annuncio ci restituisci il nome dell'annuncio che include la parola 
        return filtered
    }
    searchbutton.addEventListener('click' , ()=>{ //se volessi vedere gli annunci nel momento in cui digito la prima parolasostituisco click con input
        globalfilter();
    })

    //mi creo un unica funzione che permetterà partendo da data di filtrare sia per categoria,per prezzo , per nome
    function globalfilter (){
        let filteredbycategory = filterbycategory(data);//la funzione filterbycategory da un parametro specifico che è data, restituisce alla variabile o data oppure filtered
        console.log(filteredbycategory);
        let filteredbycategoryandprice = filterbyprice(filteredbycategory);
        let filteredbycategoryandpriceandword = filterbyword(filteredbycategoryandprice);
        //avendo l'array filtrato sia per categoria che per prezzo che per parola posso avviare showcards
        showcards(filteredbycategoryandpriceandword);
    }
    //invocazione delle funzioni 

    //mostra le cards
    showcards(data);
    //generate principal radiobutton
    generateradios();
       //input per la funzione filtra per categoria 
        //radiobutton è una node list ed è possibile utilizzare solo il for each, per questo sarà utile convertirlo in un vero e proprio array
        let radiobutton = document.querySelectorAll('.radiocategory'); //catturo ogni radiobutton associato ad ogni categoria
        radiobutton.forEach((button)=>{
            button.addEventListener('click', ()=>{
                globalfilter();             //button id = singlecategory
            })
        })
    //filtra per prezzo
    inputrange();
})
