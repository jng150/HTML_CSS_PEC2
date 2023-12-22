import axios from 'axios';

var temporadas = document.getElementsByClassName('temporada-item');
Array.from(temporadas).forEach(temporada => {

    let id = temporada.getAttribute("id").match(/(\d+)/)[0];

    temporada.addEventListener("click", function () {
        function cargarDatosJSON() {
            const jsonURL = 'https://raw.githubusercontent.com/jng150/HTML_CSS_PEC1/main/episodes.json'

            axios.get(jsonURL)
                .then(response => {
                    const episodios = response.data;
                    let contenedorEpisodios = document.querySelector(".episodio");
                    contenedorEpisodios.innerHTML = ``;
                    mostrarEpisodios(episodios.filter(episodio => episodio.Season === id));
                })
                .catch(error => {
                    console.error('Error al recuperar el archivo JSON:', error);
                });
        }
        function mostrarEpisodios(episodios) {
            const contenedorEpisodios = document.querySelector(".episodio");

            episodios.forEach(episodio => {
                const { Title, Released, Episode, Season, Synopsis, youtubeLink } = episodio;

                contenedorEpisodios.innerHTML += `
                <article>
                    <div class="episodioContainer">
                        <div>
                        <header>
                            <h1><b>Título:</b> ${Title}</h1>
                            <p><b>Fecha de lanzamiento:</b> <time>${Released}</time></p>
                        </header>
                        <section>
                            <p><b>Número de episodio:</b> ${Episode}</p>
                            <p><b>Temporada:</b> ${Season}</p>
                            <p><b>Resumen:</b><br/> ${Synopsis}</p>
                            <p>${youtubeLink}</p>
                        </section>
                        </div>
                    </div>              
                </article>
                `;
            });
        }
        cargarDatosJSON();

    }, false)
});


document.addEventListener('DOMContentLoaded', function () {
    if (window.location.href.includes('detallePersonaje.html')) {
        cargarDatosApi();
    }
    else if (window.location.href.includes('index.html')) {
        repeatImage();
    }
});

function cargarDatosApi() {
    const apiURL = 'https://thronesapi.com/api/v2/Characters';

    axios.get(apiURL)
        .then(response => {
            const personajes = response.data;
            let contenedorPersonajes = document.querySelector(".personaje");
            contenedorPersonajes.innerHTML = ``;
            mostrarPersonajes(personajes);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function mostrarPersonajes(personajes) {
    const contenedorPersonajes = document.querySelector(".personaje");

    personajes.forEach(personaje => {
        const { family, fullName, title, imageUrl } = personaje;

        contenedorPersonajes.innerHTML += `
                <article>
                    <div class="personajeContainer">
                        <div>
                        <header>
                            <h1><b> ${fullName} </b></h1>
                        </header>
                        <section>
                            <p><b> Family: </b> ${family} </p>
                            <p><b> Title: </b> ${title} </p>
                            <img src="${imageUrl}" alt="Foto de ${fullName}" width="618px" height="500px">
                        </section>
                        </div>
                    </div>              
                </article>
                `;
    });
}

function repeatImage() {
    var imageContainerLeft = document.querySelector('.image-container-left');
    var imageContainerRight = document.querySelector('.image-container-right');

    var imagePath = document.getElementById("decorationImage").src;
    var imageUrl = imagePath.substring(imagePath.indexOf('/trono'));;

    for (let i = 0; i < 11; i++) {
        var imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = 'Imagen recortada con clip-path';
        imageContainerLeft.appendChild(imgElement.cloneNode(true));
        imageContainerRight.appendChild(imgElement.cloneNode(true));
    }
}
