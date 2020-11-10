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
    const response = result.data.Search
    console.log(response)

    response.forEach((item) => {

    })

  } catch (error) {
    console.log(`error: ${error}`);
  }
}
