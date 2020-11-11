const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
const domain = 'https://superheroapi.com/api/'
const API_KEY = '10157236778121862'
const search_url = 'https://superheroapi.com/api/10157236778121862/search/'
const textInput = document.querySelector('#blank')
const searchButton = document.querySelector('#search')

function getResults() {
  const input = textInput.value
  getCharacter(input)
  return
}

searchButton.addEventListener('click', getResults)

//Search API for character and return bio
async function getCharacter(x) {
  const web = (cors_api_url + `https://superheroapi.com/api/10157236778121862/search/${x}`)

  const headers = {
    headers: {
      'Access-Control-Allow-Origin': '*'
      // 'Access-Control-Allow-Methods': 'POST'
      // 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }

  try {
    let result = await axios.get(web, headers);
    console.log(result)
    const response = result.data.results
    console.log(response)

    response.forEach((item) => {

      const imgDiv = document.querySelector('.img-section')
      const profile = document.createElement('div')
      profile.className = ('profile')
      imgDiv.append(profile)

      const img = document.createElement('img')
      img.setAttribute('src', item.image.url)
      img.className = ('poster')
      profile.append(img)


      const charDiv = document.querySelector('.search-results')
      const char = document.createElement('div')
      char.className = ('char-display')
      charDiv.append(char)

      const charName = document.createElement('p')
      const identity = item.name
      charName.textContent = `${identity}`
      charName.className = ('identity')
      char.append(charName)

      const fullName = document.createElement('p')
      const name = item.biography['full-name']
      fullName.textContent = `${name}`
      fullName.className = ('full-name')
      char.append(fullName)

      const jobTitle = document.createElement('p')
      const occupation = item.work['occupation']
      jobTitle.textContent = `${occupation}`
      jobTitle.className = ('occupation')
      char.append(jobTitle)


    })

  } catch (error) {
    console.log(`error: ${error}`);
  }
}
