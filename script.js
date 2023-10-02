const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '535e335d',
            s: searchTerm
        }
    });
    if (response.data.Error)
    return [];
    return response.data.Search;
};
const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search for a Movie</b></label>
<input class="input" />
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWr = document.querySelector('.results');

const onInput = async event => {
   const movies = await fetchData(event.target.value);
   
    if(!movies.length) {
        dropdown.classList('is-active');
        return;
    }

   resultsWr.innerHTML = '';
   dropdown.classList.add('is-active');
   for (let movie of movies) {
    const option = document.createElement('div');
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    option.classList.add('dropdown-item');
    option.innerHTML = `
    <img src="${movie.Poster}"/>
    ${movie.Title}
    `;
     option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = movie.Title;
        onMovieSelect(movie);
     });


    resultsWr.appendChild(option);
   }
}; 
input.addEventListener('input', debounce(onInput, 1000));

document.addEventListener("click", event => {
  if(!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});

const onMovieSelect = async movie => {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "535e335d",
        i: movie.imdbID
      },
    });

    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = movieDetail => {
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    
    `;
};
