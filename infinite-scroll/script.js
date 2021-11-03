// Unsplash API
const count = 25;
const apiKey = `2lFk77j1BTjr4Q8rOdUOnfPaTs8v2JJJxywDt0PgWmk`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready)
    }
}


//Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elemets for links & photos, add to DOM
function displayPhotos() {
    // Run funciton for each object in photosArray
    // photosArray.forEach((photo) => {
    //     if (photo.alt_description === null) {
    //         console.log("Pass!");
    //     } else {
    //         // Create <a> to link to Unsplash
    //         const item = document.createElement('a');
    //         item.setAttribute('href', photo.links.html);
    //         item.setAttribute('target', '_blank');
    //         // Create <img> for photo
    //         const img = document.createElement('img');
    //         img.setAttribute('src', photo.urls.regular);
    //         img.setAttribute('alt', photo.alt_description);
    //         img.setAttribute('title', photo.location.title);
    //         //  Put <img> inside <a>, then put both inside imageContainer
    //         item.appendChild(img);
    //         imageContainer.appendChild(item);
    //     }
    // });
    
    // Avoid displaying images without an alt tag 
    for (let photo of photosArray) {
        imagesLoaded = 0;
        totalImages = photosArray.length;
        // if (photo.alt_description != null) {
            console.log('total images', totalImages);
            // Create <a> to link to Unsplash
            const item = document.createElement('a');
            setAttributes(item, {
                href: photo.links.html,
                target: '_blank'
            });
            
            // Create <img> for photo
            const img = document.createElement('img');
            setAttributes(img, {
                src: photo.urls.regular,
                alt: photo.alt_description,
                title: photo.location.title
            });
            //  Event listener, check when each is finished loading
            img.addEventListener('load', imageLoaded);

            //  Put <img> inside <a>, then put both inside imageContainer
            item.appendChild(img);
            imageContainer.appendChild(item);
        // }
    }
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
    } catch (error) {
        alert("Something went terribly wrong!");
    }
}

// Check to see if scrolling near bottom of page, Loade More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On load
getPhotos();