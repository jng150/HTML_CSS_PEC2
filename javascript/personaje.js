import axios from 'axios';

document.addEventListener('DOMContentLoaded', function () {
    cargarDatosApi();
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
