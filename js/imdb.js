let search = document.querySelector("#search");

search.addEventListener("keyup", (e) => {
    let searchText = e.target.value;
    SearchMovies(searchText);
    // when key press then the text will disappear which write in h1 & p tag
    let hide = document.querySelector("#divBlock");
    hide.style.display = "none";
    search.classList.add("afterKeyPress");
    document.querySelector("#formBlock").classList.add("afterKey_formBlock");
});

// speech Recognition api
let speech = document.getElementById("speechIcon");
speech.addEventListener("click", () => {
    let hide = document.querySelector("#divBlock");
    hide.style.display = "none";
    search.classList.add("afterKeyPress");
    document.querySelector("#formBlock").classList.add("afterKey_formBlock");


    window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    let p = document.createElement("p");
    recognition.interimResults = true;

    recognition.addEventListener("result", (e) => {
        let transcript = [...e.results]
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");
        // console.log(transcript);
        search.value = transcript;
        if (e.results[0].isFinal) {
            p = document.createElement("p");
            p.innerHTML = transcript;
            let searchText = transcript;
            SearchMovies(searchText);
        }
    });
    recognition.start();
});

function SearchMovies(searchText) {
    let imdbApi = `http://www.omdbapi.com/?s=${searchText}&apikey=e073f8fe`;
    window
        .fetch(imdbApi)
        .then((data) => {
            data.json()
                .then((movieData) => {
                    let movies = movieData.Search;

                    let output = [];
                    for (let movie of movies) {
                        // console.log(movie);

                        let defaultImg =
                            movie.Poster === "N/A"
                                ? "https://i2.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1"
                                : movie.Poster;
                        output += `
                    <div>
                    <img src="${defaultImg}" />
                    <h1>${movie.Title}</h1>
                    <p>${movie.Year}</p>
                    <a href="http://www.imdb.com/title/${movie.imdbID}" target="_blank">Movie Details</a>
                    </div>
                    `;
                    }
                    document.querySelector("#template").innerHTML = output;
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
}
