import { randomDate } from '.helpers';
/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'MghY22ar45xiV6qFZmLBiVN0y0PQ97J2O4eDBjZp';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod';


/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
    const date = randomDate();
    const newUrl = `${URL}?api_key=${API_KEY}&date=${date}`;
    const getUrl = await fetch(newUrl);
    const {
        media_type: type,
        url: mediaUrl,
        explanation: text,
        title,
    } = await getUrl.json();
    return {
        type, mediaUrl, text, title,
    };
}