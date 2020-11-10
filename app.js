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
  const web = `https://superheroapi.com/api/10157236778121862/search/${x}`
  try {
    let result = await axios.get(web);
    console.log(result)
    const response = result.data.Search
    console.log(response)

  } catch (error) {
    console.log(`error: ${error}`);
  }
}