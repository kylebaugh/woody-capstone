const baseURL = `http://localhost:4000/api/locations`;

const locationsContainer = document.querySelector('#locations-container')
const form = document.querySelector('form')
const seeSuggestionsBtn = document.querySelector('#see-suggestions')

const locationsCallback = ({ data: locations }) => displayLocations(locations)
const errCallback = err => console.log(err)


const getAllLocations = () => axios.get(baseURL).then(locationsCallback).catch(errCallback)
const createLocation = body => axios.post(baseURL, body).then(locationsCallback).catch(errCallback)
const deleteLocation = id => axios.delete(`${baseURL}/${id}`).then(locationsCallback).catch(errCallback)
const updateLocationTime = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(locationsCallback).catch(errCallback)



function submitHandler(e) {
    e.preventDefault()

    let place = document.querySelector('#place')
    let description = document.querySelector('#description')
    let time = document.querySelector('#time')
    let rating = document.querySelector('.stars');
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        place: place.value,
        description: description.value,
        time: time.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createLocation(bodyObj)

    place.value = ''
    description.value = ''
    time.value = ''
    rating.value = ''
    imageURL.value = ''
}

function createLocationCard(location) {
    const locationCard = document.createElement('div')
    locationCard.classList.add('location-card')

    locationCard.innerHTML = `<img alt='location cover image' src=${location.imageURL} class="location-cover-image"/>
    <p class="place">${location.place}</p>
    <p class="description">${location.description}</p>
    <div class="btns-container">
    <button onclick="updateLocationTime(${location.id}, 'minus')">-</button>
    <p class="time">${location.time} Day(s)</p>
    <button onclick="updateLocationTime(${location.id}, 'plus')">+</button>
    </div>
    <div class="stars">
    <form action="">
      <input class="star star-5" id="star-5(${location.id})" type="radio" name="star" value="5"/>
      <label class="star star-5" for="star-5(${location.id})"></label>
      <input class="star star-4" id="star-4(${location.id})" type="radio" name="star" value="4"/>
      <label class="star star-4" for="star-4(${location.id})"></label>
      <input class="star star-3" id="star-3(${location.id})" type="radio" name="star" value="3"/>
      <label class="star star-3" for="star-3(${location.id})"></label>
      <input class="star star-2" id="star-2(${location.id})" type="radio" name="star" value="2"/>
      <label class="star star-2" for="star-2(${location.id})"></label>
      <input class="star star-1" id="star-1(${location.id})" type="radio" name="star" value="1"/>
      <label class="star star-1" for="star-1(${location.id})"></label>
    </form>
  </div>
</div>
    <button id="delete" onclick="deleteLocation(${location.id})">Delete</button>
    `

    locationsContainer.appendChild(locationCard)
    document.getElementById(`star-${location.rating}(${location.id})`).checked=true
}

function displayLocations(arr) {
    locationsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createLocationCard(arr[i])
    }
}


form.addEventListener('submit', submitHandler)
seeSuggestionsBtn.addEventListener('click', getAllLocations)
