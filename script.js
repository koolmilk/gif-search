const API_KEY = 'OaQKrnmkTw9Rd9eq2JUaH5F4CuU9kM5s';

const randomChoice = (arr) => {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
}

const imageContainer = document.querySelector('.middle .images');

const removeImage = (imagePosition) => {
    let imageIndex = 0;
    let loadedImages = document.querySelectorAll('img.giphy-img');
    if(imagePosition === 'last') {
        imageIndex = loadedImages.length-1;
    }
    if(loadedImages.length > 0) {
        imageContainer.removeChild([...loadedImages][imageIndex]);
    }
}

const searchGiphy = (searchTerm) => {
    toggleLoading(true);
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=150&offset=0&rating=pg-13&lang=en`;
    fetch(url)
    .then(response => response.json())
    .then(json => {
        let gif = randomChoice(json.data);
        let src = gif.images.original.url;

        const image = createImage(src);
        imageContainer.appendChild(image);

        image.addEventListener('load', () => {
            image.classList.add('visible');
            toggleLoading(false);
            document.body.classList.add('has-results');
            hintElement.innerText = `Hit enter to search ${searchTerm}`;
        })

    })
    .catch(error => {
        console.log('Nothing here');
    });
}

const toggleLoading = (state) => {
    if(state) {
        document.body.classList.add('loading');
    } else {
        document.body.classList.remove('loading');
    }
    
}

//

const createVideo = src => {
    const video = document.createElement('video');
    video.src = src;
    video.autoplay = true;
    video.loop = true;

    return video;
}

const createImage = src => {
    const image = document.createElement('img');
    image.src = src;
    image.className = 'giphy-img';

/*     const randomNum = Math.random() * 25;
    const posOrNeg = Math.random() < 0.5 ? -1 : 1;

    let randomDeg = Math.floor(randomNum * posOrNeg);

    image.style = `transform: rotateZ(${randomDeg}deg)`; */

    return image;
}

//
const searchElement = document.querySelector('.search-input');
const hintElement = document.querySelector('.search-hint');

const doSearch = (e) => {
    const searchTerm = searchElement.value;

    if(searchTerm.length > 2) {
        hintElement.innerText = `Hit enter to search ${searchTerm}`;
        document.body.classList.add("show-hint");
    } else {
        document.body.classList.remove("show-hint");
    }
    if(e.key === 'Enter' && searchElement.value.length > 2) {
        searchGiphy(searchTerm);
        let loadedImages = document.querySelectorAll('img.giphy-img');
        if(loadedImages.length > 25) {
            removeImage();
        }
    }
}

searchElement.addEventListener('keyup', doSearch);
document.addEventListener('keyup', e => {
    if(e.key === 'Escape') {
        removeImage('last');
    }
})