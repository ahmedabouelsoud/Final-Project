const destinations = [
  {
    city: 'Cairo', country: 'EGYPT', continent: 'Africa',
    description: 'Cairo is a historic city known for its ancient Egyptian civilization and famous landmarks.',
    food: 'Koshari, Foul', place: 'Pyramids of Giza', language: 'Arabic', number: '01',
    image: 'images/cairo.jpg',
    alt: 'The Great Pyramid of Giza, Egypt'
  },
  {
    city: 'Kyoto', country: 'JAPAN', continent: 'Asia',
    description: 'Kyoto is known for its historic temples, traditional streets and beautiful Japanese gardens.',
    food: 'Sushi, Ramen', place: 'Fushimi Inari Shrine', language: 'Japanese', number: '02',
    image: 'images/kyoto.jpg',
    alt: 'Traditional Japanese street in Kyoto'
  },
  {
    city: 'Milan', country: 'ITALY', continent: 'Europe',
    description: 'Milan is a lively city known for its fashion, impressive architecture and rich Italian culture.',
    food: 'Risotto, Panettone', place: 'Duomo di Milano', language: 'Italian', number: '03',
    image: 'images/milan.jpg',
    alt: 'A tram-lined street in Milan with buildings and shops'
  },
  {
    city: 'Paris', country: 'FRANCE', continent: 'Europe',
    description: 'Paris is one of the most beautiful cities in the world, famous for its art, architecture and romantic atmosphere.',
    food: 'Croissant, Macarons', place: 'Eiffel Tower', language: 'French', number: '04',
    image: 'images/paris.jpg',
    alt: 'The Eiffel Tower rising above the rooftops of Paris'
  }
];

const fields = {
  number: document.querySelector('#current-number'),
  country: document.querySelector('#country-name'),
  city: document.querySelector('#city-name'),
  description: document.querySelector('#city-description'),
  continent: document.querySelector('#city-continent'),
  food: document.querySelector('#city-food'),
  place: document.querySelector('#city-place'),
  language: document.querySelector('#city-language'),
  image: document.querySelector('#city-image'),
  imageNumber: document.querySelector('#image-number'),
  link: document.querySelector('#explore-link')
};
const dots = [...document.querySelectorAll('.carousel-dots button')];
let activeIndex = 0;
let imageRequest = 0;

function showDestination(index) {
  activeIndex = (index + destinations.length) % destinations.length;
  const destination = destinations[activeIndex];
  const number = String(activeIndex + 1).padStart(2, '0');

  fields.number.textContent = number;
  fields.country.textContent = destination.country;
  fields.city.textContent = destination.city;
  fields.description.textContent = destination.description;
  fields.continent.textContent = destination.continent;
  fields.food.textContent = destination.food;
  fields.place.textContent = destination.place;
  fields.language.textContent = destination.language;
  fields.imageNumber.textContent = number;
  fields.image.alt = destination.alt;
  fields.image.style.opacity = '0.35';

  const currentRequest = ++imageRequest;
  const nextImage = new Image();
  nextImage.onload = () => {
    if (currentRequest !== imageRequest) return;
    fields.image.src = destination.image;
    requestAnimationFrame(() => { fields.image.style.opacity = '1'; });
  };
  nextImage.onerror = () => {
    if (currentRequest !== imageRequest) return;
    fields.image.src = destination.image;
    fields.image.style.opacity = '1';
  };
  nextImage.src = destination.image;

  dots.forEach((dot, dotIndex) => {
    if (dotIndex === activeIndex) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
}

document.querySelector('#prev-button').addEventListener('click', () => showDestination(activeIndex - 1));
document.querySelector('#next-button').addEventListener('click', () => showDestination(activeIndex + 1));
dots.forEach((dot, index) => dot.addEventListener('click', () => showDestination(index)));

fields.link.addEventListener('click', () => {
  const destination = destinations[activeIndex];
  window.alert(`Discover ${destination.city} in ${destination.country}!\nFamous Place: ${destination.place}`);
});

document.querySelector('#year').textContent = new Date().getFullYear();
