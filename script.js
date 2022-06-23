let url = 'https://api.giphy.com/v1/gifs/search?api_key=OaQKrnmkTw9Rd9eq2JUaH5F4CuU9kM5s&q=dog&limit=25&offset=0&rating=pg-13&lang=de';

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

    return image;
}

fetch(url)
.then(response => response.json())
.then(json => {
    let gif = json.data[1];
    let src = gif.images.original.url;

    const image = createImage(src);

    const imageContainer = document.querySelector('.middle .images');
    imageContainer.appendChild(image);

    console.log(src2);
})
.catch(error => {
    console.log(error);
});