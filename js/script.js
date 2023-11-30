
/*========== NAVBAR TRANSPARENT TO SOLID ==========*/

$(document).ready(function () { //when document(DOM) loads completely and it's ready, we want this function to take a place, before anything else loads - and that way jQuery takes effects befor our HTML and CSS loads
    checkScroll(); //check if page is scrolled
    $(window).scroll(checkScroll); //get scroll position of window
});

function checkScroll() { //check if page is scrolled
if ($(window).scrollTop() >= 300) { //if window is scrolled 300px or more
    $('.navbar').addClass('solid'); //add class 'solid' to element with class 'navbar'
} else { //if page is not scrolled 300px from top
    $('.navbar').removeClass('solid'); //remove class 'solid' from navbar element
}
}


/*========== ADD SOLID CLASS TO NAVBAR WHEN TOGGLED ==========*/

// V mobilnem pogledu, ko kliknemo hamburger ikono, želimo imeti ves čas, torej tudi na vrhu strani, temnejšo verzijo ozadja nav vrstice (torej želimo imeti class solid) - s prosojnim ozadjem se linki v mobilnem pogledu namreč prekrivajo z napisom na prvi sliki (ne vidi se razločno)
// Za več kot 300px nam že deluje (zgornja skripta), vendar mi bi sedaj želeli, da nam deluje tudi na vrhu, torej za manj kot 300px, ampak le v mobilnem pogledu, zato izberemo .navbar-toggler
$('.navbar-toggler').click(function () { //when navbar-toggler is clicked
    if ($(window).scrollTop() <= 300) { //if window scrolled 300px or less from top
    $(".navbar").toggleClass("solid-toggle"); //add the solid-toggle class to navbar - ni ok, če dodamo class solid, saj se ta "tepe" oz. izključuje z zgornjo kodo/skripto, kjer smo rekli, da se mora class solid dodat za več kot 300px, tu pa sedaj želimo za manj kot 300px - ker se to izključuje, moramo dodati nek drug class npr. class solid-toggle, ki ga moramo dodati tudi v CSS (ker ima enake oblikovne lastnosti kot class solid, ga lahko dodamo, kar ob njega (glej v CSS datoteki)
    }
});


/*========== CLOSE MOBILE MENU ON CLICK & SMOOTH SCROLL TO LINK a[href^="#"] ==========*/

$(document).on('click', 'a[href^="#"]', function (event) { //we want to target links with # (id-ji na ketere se linki navezujejo - ker so tako različno, in da jih vseh ne naštevamo, je to krajši način, kako jih vse naenkrat naslovimo
    event.preventDefault();// to prevent the default browser behavior/default click event (when we click on links it sends us to that destination automatically - not smooth)
    $('.navbar-toggler').addClass('collapsed');//class collapsed je iz BS
    $('#navigacija').removeClass('show');//class show se ne vidi - najdemo ga z inspect tool in naredi ravno "obratno" kot class collapsed (zato ne moremo imet obeh, saj se izključujeta), pozor class show se pojavi v classu (ali id-ju), ki "objame" vse linke, ki so v navigaciji, zato je tukaj izbran/select-an #navigacija (lahko bi dali tudi .navbar-collapse)


    setTimeout(function () {//setTimeout uporabimo za malo delay-a, torej da ne odstrani class solid-toggle v trenutku, temeveč malo bolj postopno => spomnimo, da imamo v CSS tranzicije, ki naj bi poskrbele za postopnost (fade-in/fade-out efekt) pri prikazovanju/odstranjevanju classov solid ter solid-toggle, vendar te tranzicije v primeru, ko kliknemo na linke, ki nas povežejo z nekim #id-jem, ne delujejo ...
        $('.navbar').removeClass('solid-toggle');// želimo, da se class solid-toggle odstrani, ko kliknemo na nek link (v spustnem meniju mobilnega pogleda), ki nas pripelje na vrh (spustni meni v mobilnem pogledu se v tem času zapre, zato ni več moteče, če nima dodanega class solid-toggle) - samo nav vrstica v mobilnem pogledu, torej,ko ni prikazanega spustnega menija, želimo da je na vrhu transparentna
    }, 500);


    $('html, body').animate({// izberemo html in body, ker bomo animirali vse "a href-e", ki kličejo nek #id in ti se nahajao znotraj celotnega html dokumenta, oz. vsebine (body)
        scrollTop: $($.attr(this, 'href')).offset().top //uporabimo metodo scrollTop, v kateri izberemo (select-amo) a href atribut
		//z metodo offset().top povemo kam mora bit link "poslan" oz. kam naj se poveže (where we want the link to be sent to). S .top damo metodi offset() parametrte oz. koordinate od destinacije linka - kam naj se link poveže (#id)
    }, 1000); //ko kliknemo na link, se stran premakne/nas "scrolla" na poklican #id v času 1000ms = 1s
});

/*========== WAYPOINTS ANIMATION DELAY ==========*/
//Original Resource: https://www.oxygenna.com/tutorials/scroll-animations-using-waypoints-js-animate-css

$(function () { // a self calling function
  function onScrollInit(items, trigger) { // a custom made function
      items.each(function () { //for every element in items run function
          var osElement = $(this), //set osElement to the current
              osAnimationClass = osElement.attr('data-animation'), //get value of attribute data-animation type
              osAnimationDelay = osElement.attr('data-delay'); //get value of attribute data-delay time

          osElement.css({ //change css of element
              '-webkit-animation-delay': osAnimationDelay, //for safari browsers
              '-moz-animation-delay': osAnimationDelay, //for mozilla browsers
              'animation-delay': osAnimationDelay //normal
          });

          var osTrigger = (trigger) ? trigger : osElement; //if trigger is present, set it to osTrigger. Else set osElement to osTrigger

          osTrigger.waypoint(function () { //scroll upwards and downwards
              osElement.addClass('animated').addClass(osAnimationClass); //add animated and the data-animation class to the element.
          }, {
                  triggerOnce: true, //only once this animation should happen
                  offset: '70%' // animation should happen when the element is 70% below from the top of the browser window
              });
      });
  }

  onScrollInit($('.os-animation')); //function call with only items
  onScrollInit($('.staggered-animation'), $('.staggered-animation-container')); //function call with items and trigger
});


