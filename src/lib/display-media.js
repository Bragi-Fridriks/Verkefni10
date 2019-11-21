import { save, load } from "./storage";
import getRandomImage from "./nasa-api";
import { el } from './helpers';

// todo vísa í rétta hluti með import

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu
let video; //video á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
async function getNewImage() {
    image = await getRandomImage();
    while (image.type !== 'video') {
        image = await getRandomImage();
    }
    title.innerText = image.title;
    text.innerText = image.text;
    if (image.type === 'video') {
        video.setAttribute('src', image.mediaUrl);
        video.style.display = 'block';
        img.style.display = 'none';
    }
    else {
        img.setAttribute('src', image.mediaUrl);
        img.style.display = '';
        video.style.display = 'none';
    }
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
    save(image.type, image.mediaUrl, image.text, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init() {
    title = document.querySelector('.apod__title');
    text = document.querySelector('.apod__text');
    img = document.querySelector('.apod__image');
    video = document.querySelector('.apod__video');
    document.querySelector('#new-image-button').addEventListener('click', getNewImage);
    document.querySelector('#save-image-button').addEventListener('click', saveCurrentImage);
    getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
    const main = document.querySelector('main');
    const images = load();
    images.forEach((favimg) => {
        const titleEl = el('h1');
        titleEl.innerText = favimg.title;
        if (favimg.type === 'video') {
            const vidjo = el('iframe');
            vidjo.setAttribute('src', favimg.mediaUrl);
            vidjo.setAttribute('type', 'text/HTML');
            vidjo.setAttribute('width', '640');
            vidjo.setAttribute('height', '360');
            vidjo.setAttribute('frameborder', '0');
            vidjo.classList.add('apod__video');
            const item = el('div', titleEl, vidjo);
            item.classList.add('apod');
            main.appendChild(item);
        }
        else {
            const imgEl = el('img');
            imgEl.setAttribute('src', favimg.mediaUrl);
            imgEl.classList.add('apod__image');
            const item = el('div', titleEl, imgEl);
            item.classList.add('apod');
            main.appendChild(item);
        }
    });
}
