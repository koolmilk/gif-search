const API_KEY = 'INSERT_API_KEY_HERE';

const searchElement = document.querySelector('.search-input');
const hintElement = document.querySelector('.search-hint');
const clearElement = document.querySelector('.search-clear');

const imageContainer = document.querySelector('.middle .images');

searchElement.focus();

const randomChoice = (arr) => {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
}

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
    toggleError(false);
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=150&offset=0&rating=r&lang=en`;
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
        toggleError(true);
        toggleLoading(false);
        hintElement.innerText = `nothing found 💩💩💩`;
    });
}

const toggleLoading = (state) => {
    if(state) {
        document.body.classList.add('loading');
    } else {
        document.body.classList.remove('loading');
    }
}

const toggleError = (state) => {
    if(state) {
        document.body.classList.add('error');
    } else {
        document.body.classList.remove('error');
    }
}

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

    const randomNum = Math.random() * 25;
    const posOrNeg = Math.random() < 0.5 ? -1 : 1;

    let randomDeg = Math.floor(randomNum * posOrNeg);

    image.style = `transform: scale(1) rotate(${randomDeg}deg)`;

    return image;
}

const doSearch = (e) => {
    const searchTerm = searchElement.value;

    if(searchTerm.length >= 2) {
        hintElement.innerText = `Hit enter to search ${searchTerm}`;
        document.body.classList.add("show-hint");
    } else {
        document.body.classList.remove("show-hint");
    }
    if(e.key === 'Enter' && searchElement.value.length >= 2) {
        searchGiphy(searchTerm);
        let loadedImages = document.querySelectorAll('img.giphy-img');
        if(loadedImages.length > 25) {
            removeImage();
        }
    }
}

const resetGifStack = (event) => {
    event.preventDefault();
    searchElement.value = '';
    imageContainer.innerHTML = '';
    document.body.classList.remove('has-results');
    document.body.classList.remove('show-hint');
}

searchElement.addEventListener('keyup', doSearch);
document.addEventListener('keyup', e => {
    if(e.key === 'Escape') {
        resetGifStack(e);
    }

    if(e.key === 'ArrowLeft') {
        removeImage('last');
    }
})

clearElement.addEventListener('click', (e) => {
    resetGifStack(e);
})

document.addEventListener('click', () => {
    searchElement.focus();
})