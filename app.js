// const headers = {
//   headers: {
//     'Access-Control-Allow-Origin': '*'
//     //     // 'Access-Control-Allow-Methods': 'POST'
//     //     // 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
//   }

// const { group } = require("console");

const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
const domain = 'https://superheroapi.com/api/'
const API_KEY = '10157236778121862'
const search_url = 'https://superheroapi.com/api/10157236778121862/search/'
const textInput = document.querySelector('#blank')
const searchButton = document.querySelector('#search')
const searchRandomCharacter = document.querySelector('.random-character')


function getResults() {
  const input = textInput.value
  getCharacter(input)
  return
}

searchButton.addEventListener('click', getResults)
searchRandomCharacter.addEventListener('click', getRandomCharacter)

//Search API for character and return bio
async function getCharacter(x) {
  removeSearch()

  const web = (cors_api_url + `https://superheroapi.com/api/10157236778121862/search/${x}`)

  //Return main search results by search input bar
  try {
    let result = await axios.get(web);
    console.log(result)
    const response = result.data.results
    console.log(response)

    response.forEach((item) => {

      const imgDiv = document.querySelector('.p-search-results')
      // const profile = document.createElement('div')
      // profile.className = ('c1-profile')
      // imgDiv.append(profile)

      const img = document.createElement('img')
      img.setAttribute('src', item.image.url)
      img.setAttribute('value', item.id)
      img.className = ('c1-poster')
      imgDiv.append(img)
      img.addEventListener('click', getId)


      // const charDiv = document.querySelector('.p-search-results')
      // const char = document.createElement('div')
      // char.className = ('c3-character')
      // imgDiv.append(char)

      const charName = document.createElement('p')
      const identity = item.name
      charName.textContent = `Identity: ` + `${identity}`
      charName.className = ('c2-identity')
      imgDiv.append(charName)


      const jobTitle = document.createElement('p')
      const occupation = item.work['occupation']
      jobTitle.textContent = `Occupation: ` + `${occupation}`
      jobTitle.className = ('c3-occupation')
      imgDiv.append(jobTitle)

      const groups = document.createElement('p')
      const affiliations = item.connections['group-affiliation']
      groups.textContent = `Known Affiliations: ` + `${affiliations}`
      groups.className = ('c4-affiliations')
      imgDiv.append(groups)

      // const fullName = document.createElement('p')
      // const name = item.biography['full-name', 'place-of-birth']
      // fullName.textContent = `${name}`
      // imgDiv.append(name)

    })

  } catch (error) {
    console.log(error);
  }
}
//End main search results


//Write function to get more data from clicking on img of returned search results

async function getId(y) {
  const characterId = y.target.getAttribute('value')

  const webId = (cors_api_url + `https://superheroapi.com/api/10157236778121862/${characterId}`)

  try {
    result = await axios.get(webId)
    console.log(result)
    const response = result.data
    console.log(response)
  }
  catch (error) {
    console.log(error)
  }
}
//End of getId function


//Remove search results function
function removeSearch() {
  const removeSection = document.querySelector('.p-search-results')
  while (removeSection.lastChild) {
    removeSection.removeChild(removeSection.lastChild)
  }
}
//End of search results function


//Write function to randomly pull a character

function randomCharacter() {
  const min = 0;
  const max = 731;
  return Math.floor(min + Math.random() * (max + 1 - min));
}

async function getRandomCharacter() {
  randomCharacter()
  const characterId = randomCharacter('value')
  const character = (cors_api_url + `https://superheroapi.com/api/10157236778121862/${characterId}`)

  try {
    result = await axios.get(character)
    console.log(result)
    const response = result.data
    console.log(response)

    const characterPage = document.querySelector('.p-random-character')

  }
  catch (error) {
    console.log(error)
  }
}
