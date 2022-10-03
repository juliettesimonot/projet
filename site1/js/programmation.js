//recuper data dom
const carouselContainer = document.querySelector('.carousel');
const filmContainer = document.querySelector('.films');
const leftArrow = document.querySelector('.leftArrow');
const rightArrow = document.querySelector('.rightArrow');
const buttonSeeMore = document.querySelector('.seeMore');


//Creer class FILM

class Film{
    constructor(movieTitle, description, date, imgSrc){
        this.movieTitle = movieTitle;
        this.description = description;
        this.date = date;
        this.imgSrc = imgSrc;
    }
}


//creer nouvelle slide
function newSlide(element){
    var slide= document.createElement('div');
    var slideDescription = document.createElement('div');
    var slideText = document.createElement('div');
    var slideH1 = document.createElement('h1');
    var slidePara = document.createElement('p');
    var slideButton = document.createElement('button');


    //class
    slide.classList.add('slide');
    slideDescription.classList.add('slideDescription');
    slideText.classList.add('text');
   
 
    //creer
    carouselContainer.append(slide);
    slide.append(slideDescription);
    slideDescription.append(slideText);
    slideDescription.append(slideButton);
    slideText.append(slideH1);
    slideText.append(slidePara);


    //remplacer texte
    slideH1.textContent = element.movieTitle;
    slidePara.textContent = element.description.slice(0,80)+"...";
    slide.style.background = "url(https://image.tmdb.org/t/p/original"+element.imgSrc+") no-repeat center";
    slideButton.textContent = "TICKET";
}



//creer une card film
function newCard(element){
    var card = document.createElement('div');
    var filmImgContainer = document.createElement('div');
    var filmImg = document.createElement('img');
    var filmDescription = document.createElement('div');
    var title = document.createElement('div');
    var titleH2 = document.createElement('h2');
    var infos = document.createElement('div');
    var date = document.createElement('p');
    var genre = document.createElement('p');
    var time = document.createElement('p');
    var shortDescription = document.createElement('div');
    var button = document.createElement('button');


    //class
    card.classList.add('card');
    filmImgContainer.classList.add('filmImg');
    filmDescription.classList.add('filmDescription');
    title.classList.add('title');
    infos.classList.add('infos');
    date.classList.add('date');
    genre.classList.add('genre');
    time.classList.add('time');
    shortDescription.classList.add('shortDescription');
 

    //creer
    filmContainer.append(card);
    card.append(filmImgContainer);
    card.append(filmDescription);
    filmImgContainer.append(filmImg);
    filmDescription.append(title);
    filmDescription.append(shortDescription);
    filmDescription.append(button);
    title.append(titleH2);
    title.append(infos);
    infos.append(date);
    infos.append(genre);
    infos.append(time);


    //remplacer texte
    titleH2.textContent = element.movieTitle;
    shortDescription.textContent = element.description;
    date.textContent = element.date;
    filmImg.src = "https://image.tmdb.org/t/p/original"+element.imgSrc;
    button.textContent = "voir le film"
}


//fonctions generer card et slides
var initcard = 0;
var countCard = 6;
//generer card
function display(arrayFilms){
    if(countCard>arrayFilms.length){
        console.log(" stop");
        console.log(countCard);
        for (let i = initcard; i < arrayFilms.length; i++) {
            newCard(arrayFilms[i]);  
        }
        countCard=6;
        initcard = 0;
        buttonSeeMore.classList.add('notClick')
    }else{
        console.log(countCard);
        for (let i = initcard; i < countCard; i++) {
            newCard(arrayFilms[i]);  
        }
        countCard+=6;
        initcard+=6;
    }
}

buttonSeeMore.addEventListener('click', e=>{
    fetchListFilms();
})


//generer slides
var arrayFilms=[];

function createArrayFilms(myArray){
    myArray.forEach(film => {
        let newFilm = new Film(film.title, film.overview, film.release_date, film.backdrop_path);
        arrayFilms.push(newFilm);
    });
}

function loadCarousel(myFilm){
   for (let i = 0; i < 5; i++) {
        newSlide(myFilm[i]);
   }
}


//Caroussel on click  
let i=0;
function changeSlideNext(slides) {
    let currentSlide = document.querySelector('.slide.active');
    let nextSlide = currentSlide.nextElementSibling;
    
    if(currentSlide == slides[slides.length-1]){
        currentSlide.classList.remove("active");
        slides[0].classList.add("active");
    }else{
        currentSlide.classList.remove("active");
        nextSlide.classList.add("active");
    }
    
}

function changeSlidePrev(slides) {
    let currentSlide = document.querySelector('.slide.active');
    let prevSlide = currentSlide.previousSibling;
    
    if(currentSlide == slides[0]){
        slides[slides.length-1].classList.add("active");
        currentSlide.classList.remove("active");
    }else{
        currentSlide.classList.remove("active");
        prevSlide.classList.add("active");
    } 
}



//recuperer film api
function fetchListFilms(){
    let language = "fr";
    let url = `https://api.themoviedb.org/3/list/8216985?api_key=b073943e720f89bc518ef7fdb54ca675&language=${language}`;
    fetch(url)
    .then(function(response){
        if(response.ok){
            return Promise.resolve(response.json());
        }else{
            return Promise.reject(new Error("Erreur dans la requete"))
        }
    }).then((films)=>{
        console.log(films);
        //afficher films slides
        arrayFilms = [];
        createArrayFilms(films.items);
        display(arrayFilms);
        loadCarousel(arrayFilms);
        //caroussel
        const slides = document.querySelectorAll('.slide');
        slides[0].classList.add('active');
        rightArrow.addEventListener("click", (e) => { 
            changeSlideNext(slides);
         });
            
        leftArrow.addEventListener("click", (e) => {
            changeSlidePrev(slides);
        });

    }).catch(function(e){
        console.log(e);
    })
}



fetchListFilms();









