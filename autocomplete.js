const createAutocomplete = ({root}) => {
    root.innerHTML = `
        <label><b>Search for a Movie</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
`;

    const input = root.querySelector("input");
    const dropdown = root.querySelector(".dropdown");
    const resultsWr = root.querySelector(".results");

    const onInput = async (event) => {
      const movies = await fetchData(event.target.value);

      if (!movies.length) {
        dropdown.classList("is-active");
        return;
      }

      resultsWr.innerHTML = "";
      dropdown.classList.add("is-active");
      for (let movie of movies) {
        const option = document.createElement("div");
        const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

        option.classList.add("dropdown-item");
        option.innerHTML = `
    <img src="${movie.Poster}"/>
    ${movie.Title}
    `;
        option.addEventListener("click", () => {
          dropdown.classList.remove("is-active");
          input.value = movie.Title;
          onMovieSelect(movie);
        });

        resultsWr.appendChild(option);
      }
    };
    input.addEventListener("input", debounce(onInput, 1000));

    document.addEventListener("click", (event) => {
      if (!root.contains(event.target)) {
        dropdown.classList.remove("is-active");
      }
    });
};