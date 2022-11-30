
// Du ska använda REST Countries API version 3: Restcountry v 3
// När en användare söker på ett språk ska följande information visas på webbsidan för samtliga länder i svaret:

const btn = document.querySelector('#search-btn');
//ger index ett startvärde
let index = 0;
const div = document.querySelector('#div-container');

btn.addEventListener('click', getLanguage);

function getLanguage(event) {
    event.preventDefault();

    const languageInput = document.querySelector('#language-input');
    const language = languageInput.value.toLowerCase();
    div.innerText = '';
    console.log(language);

    fetchCountries(language);
    languageInput.value = '';
}

function fetchCountries(languagePar) {

    const url = `
    https://restcountries.com/v3.1/lang/${languagePar}`;


    fetch(url).then(response => response.json()

    ).then(countryArr => {
        console.log(typeof countryArr);

        countryArr.forEach((country, countryIndex) => {
            if (countryArr[index].population < country.population) {
                index = countryIndex;
            }

        })
        // console.log(country[0].name.official);
        countryArr.forEach((country) => {

            //officiellt namn
            const p = document.createElement('p');
            div.appendChild(p);
            p.innerText = " Official name: " + country.name.official + ". Subregion: " + country.subregion + ". Population: " + country.population;
            // console.log(country);
            const img = document.createElement('img');
            div.append(img);
            img.src = country.flags.png;


            if (countryArr[index] == country) {
                p.style.border = "1px solid red";
            }

        })
        index = 0;
    })

        .catch(error => {
            console.log(error);

            const h3 = document.createElement('h3');
            div.appendChild(h3);
            h3.innerText = "Detta språk eller land finns inte!";
            h3.style.color = 'red';
        });


}
