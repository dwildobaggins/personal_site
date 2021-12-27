function addElement(newElement, styles) {
    // purpose of this function is to create, edit, and add a new html element to the DOM
    // (may need to create element & styles classes in order to add more structure to 
    // the 'newElement' and 'styles parameters)

    // create element and define attributes
    let element = document.createElement(newElement.htmltag);
    element.id = newElement.id;
    element.innerHTML = newElement.innerHTML;

    //assign styles
    Object.assign(element.style, styles);

    //append element to html
    document.getElementById(newElement.parentElement).appendChild(element);
}



///////////// Feature: Set date at top of site ///////////////////////////

function buildDateElement(months, daysOfWeek){
    let today = new Date();
    let output = daysOfWeek[today.getDay()] + ', ' + months[today.getMonth()] + ' ' + today.getDate();
    return output;
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 
'Thu', 'Fri', 'Sat'];

const months = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 
'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


document.getElementById('date').innerHTML = buildDateElement(months, daysOfWeek);


//////////        Feature: make apps open & close          ////////////////
let app_transform = '';
let body = document.body;
let appContainer = document.getElementById('app-container');
let apps = document.querySelectorAll('.app');

function getApp(event) {

    let appId = event.target.id.replace('-icon','');
	let app_html = document.getElementById(appId).innerHTML;
	
    let app = document.createElement('div');
    app.id = appId + '-open';
    app.innerHTML = app_html;
	appContainer.appendChild(app);
		
	openApp(event);
}

function openApp(event) {
//opens app by shrinking #app-container to the dimensions and position of 
//the clicked app icon. then it makes #app-container visible and transitions
//to its original size (fixed and taking up the entire view);
//get app content ready

// apply transition
    let app_bounding_rect = appContainer.getBoundingClientRect();
    let tile_bounding_rect = event.target.getBoundingClientRect();
    let translateX =  tile_bounding_rect.left + 'px';
    let translateY =  tile_bounding_rect.top + 'px';
    let scaleX = tile_bounding_rect.width / app_bounding_rect.width;
    let scaleY = tile_bounding_rect.height / app_bounding_rect.height;

    app_transform = "translate("+ translateX +","+ translateY+") scale("+ scaleX +", "+ scaleY +")";
    appContainer.style.transform = app_transform;
    document.body.offsetWidth;
    body.classList.add('app-open');
    let changeAppContainer = document.getElementById('app-container');
    changeAppContainer.style.transform = "translate(0,0) scale(1)";
}

function closeApp() {
    console.log(appContainer);
    appContainer.addEventListener('transitionend', resetApp);
    appContainer.style.transform = app_transform;
    body.classList.add('app-closed');
    body.classList.remove('app-open');
}
                                                        
function resetApp() {
        console.log('resetApp')
        body.classList.remove("app-closed");
        appContainer.removeAttribute('style');
        appContainer.innerHTML = '';
        appContainer.removeEventListener('transitionend',resetApp);
}

//add event listeners to favorites icons
const listOfFavorites = document.getElementsByClassName('favorite');

document.addEventListener('click', function(event) {
    var matches = event.target.matches('.get-app');
    if( matches) {
                getApp(event);
            }
}, false);

document.addEventListener('click', function(event) {
    var matches = event.target.matches('#home');
    if( matches ){
        closeApp(event);
    }
    console.log('hi');
}, false);

document.addEventListener('swiped-down', function(event) {
    var matches = event.target.matches('.favorite');
    if( matches) {
                closeApp(event);
            }
     // the element that was swiped
});


function initializeDatalist() {
    Array.prototype.forEach.call(listOfFavorites, function(favorite) {
        let searchResult = initializeDatalistElement(favorite);
        document.getElementById('datalist').appendChild(searchResult);
    });
}

function initializeDatalistElement(element) {
    let contentId = element.id.replace('-icon', '');
    let name = document.querySelector("#" + contentId + "> h1").innerHTML;
    let imgPath = element.children[0].src;
    let searchResult = document.createElement('div');
    searchResult.id = contentId + '-search-result';
    searchResult.className = 'search-result';
    let searchResultText = document.createElement('h2');
    let searchResultImg = document.createElement('img');

    searchResultImg.src = imgPath;
    searchResultText.innerHTML = name;

    searchResult.appendChild(searchResultImg);
    searchResult.appendChild(searchResultText);

    searchResult.addEventListener('click', function(event) {
        //resetApp(contentId, event);
        openApp(contentId, event);
    })

    return searchResult;
}

initializeDatalist();


function updateDatalist() {

}
