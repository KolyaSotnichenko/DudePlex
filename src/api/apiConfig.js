const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'e3bb99f79b1bb8906dac2d3227927c8f',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;