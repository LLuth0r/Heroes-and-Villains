// const headers = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Method": "*",
//     "Access-Control-Allow-Headers": "*",
//     // "Access-Control-Request-Headers": "origin",
//     'Content-Type': 'application/json'
//   }
// }


const cors_api_url = 'https://cors-anywhere.herokuapp.com/'
const domain = 'https://superheroapi.com/api/'
const API_KEY = '10157236778121862'
const search_url = 'https://superheroapi.com/api/10157236778121862/search/'
const textInput = document.querySelector('#blank')
const searchButton = document.querySelector('#search')
const searchRandomCharacter = document.querySelector('.random-character-button')
const battleButton = document.querySelector('.battle-button')
const modal = document.querySelector('.modal')
let searchArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

localStorage.setItem('items', JSON.stringify(searchArray))
const data = JSON.parse(localStorage.getItem('items'))

function getResults() {
  const input = textInput.value
  getCharacter(input)
  return
}

// searchButton.addEventListener('click', function (e) {
//   e.preventDefault()
//   searchArray.push(textInput.value)
//   localStorage.setItem('items', JSON.stringify(searchArray))
//   getResults(textInput.value)
//   textInput.value = ''
// })

// data.forEach((item) => {
//   getResults(item)
// })

searchButton.addEventListener('click', getResults)
searchRandomCharacter.addEventListener('click', getRandomCharacter)
battleButton.addEventListener('click', doBattle)


//Search API for character and return bio
async function getCharacter(x) {
  removeSearch()

  const web = (cors_api_url + `https://superheroapi.com/api/${API_KEY}/search/${x}`)


  //Return main search results by search input bar
  try {
    let result = await axios.get(web);
    console.log(result)
    const response = result.data.results
    console.log(response)

    response.forEach((item) => {

      const imgDiv = document.querySelector('.p-search-results')

      const img = document.createElement('img')
      img.setAttribute('src', item.image.url)
      img.setAttribute('value', item.id)
      img.className = ('c1-poster')
      imgDiv.append(img)
      img.addEventListener('click', getId)

      const charName = document.createElement('p')
      const identity = item.name
      charName.textContent = `Identity: ` + `${identity}`
      charName.className = ('c2-identity')
      imgDiv.append(charName)

      const name = document.createElement('p')
      const fullName = item.biography['full-name']
      name.textContent = `Full Name: ` + `${fullName}`
      name.className = ('c4-fullname')
      imgDiv.append(name)

    })
  } catch (error) {
    console.log(error);
  }
}
//End main search results


//Write function to get more data from clicking on img of returned search results

async function getId(y) {
  const characterId = y.target.getAttribute('value')
  removeSearch()

  const webId = (cors_api_url + `https://superheroapi.com/api/10157236778121862/${characterId}`)

  try {
    result = await axios.get(webId)
    console.log(result)
    const response = result.data
    console.log(response)

    const characterPage = document.querySelector('.p-random-character')
    const img = document.createElement('img')
    img.setAttribute('src', response.image.url)
    img.className = ('r1-img')
    characterPage.append(img)

    const charIdentity = document.createElement('p')
    const identity = response.name
    charIdentity.textContent = `Identity: ` + `${identity}`
    charIdentity.className = ('r2-identity')
    characterPage.append(charIdentity)

    const charAlias = document.createElement('p')
    const alias = response.biography.aliases
    charAlias.textContent = `Alias: ` + `${alias}`
    charAlias.className = ('r3-alias')
    characterPage.append(charAlias)

    const charAppearance = document.createElement('ul')
    charAppearance.className = ('r4-appearance-list')
    characterPage.append(charAppearance)

    const genderLi = document.createElement('li')
    const gender = response.appearance
    genderLi.textContent = `Gender: ${gender.gender}`
    charAppearance.append(genderLi)

    const heightLi = document.createElement('li')
    const height = response.appearance
    heightLi.textContent = `Height: ${height.height}`
    charAppearance.append(heightLi)

    const weightLi = document.createElement('li')
    const weight = response.appearance
    weightLi.textContent = `Weight: ${weight.weight}`
    charAppearance.append(weightLi)

    const raceLi = document.createElement('li')
    const race = response.appearance
    raceLi.textContent = `Race: ${race.race}`
    charAppearance.append(raceLi)

    const organizations = document.createElement('p')
    const affiliations = response.connections['group-affiliation']
    organizations.textContent = `Known Affiliations: ` + `${affiliations}`
    organizations.className = ('r5-affiliations')
    characterPage.append(organizations)

    const creator = document.createElement('p')
    const publisherInfo = response.biography.publisher
    creator.className = ('r6-publisher')
    creator.textContent = `Publisher: ` + `${publisherInfo}`
    characterPage.append(creator)

    const powerStats = document.createElement('ul')
    powerStats.className = ('r6-powers')
    characterPage.append(powerStats)

    const combatLi = document.createElement('li')
    const combat = response.powerstats
    combatLi.textContent = `Combat: ${combat.combat}`
    powerStats.append(combatLi)

    const durabilityLi = document.createElement('li')
    const durability = response.powerstats
    durabilityLi.textContent = `Durability: ${durability.durability}`
    powerStats.append(durabilityLi)

    const intelligenceLi = document.createElement('li')
    const intelligence = response.powerstats
    intelligenceLi.textContent = `Intelligence: ${intelligence.intelligence}`
    powerStats.append(intelligenceLi)

    const powerLi = document.createElement('li')
    const power = response.powerstats
    powerLi.textContent = `Power: ${power.power}`
    powerStats.append(intelligenceLi)

    const speedLi = document.createElement('li')
    const speed = response.powerstats
    speedLi.textContent = `Speed: ${speed.speed}`
    powerStats.append(speedLi)

    const strengthLi = document.createElement('li')
    const strength = response.powerstats
    strengthLi.textContent = `Strength: ${strength.strength}`
    powerStats.append(strengthLi)
  }

  catch (error) {
    console.log(error)
  }
}

//End of getId function


//Remove search results function
function removeSearch() {
  const removeSection = document.querySelector('.p-search-results')
  const removeRandom = document.querySelector('.p-random-character')
  const removeBattle = document.querySelector('.p-battle1')

  while (removeSection.lastChild) {
    removeSection.removeChild(removeSection.lastChild)
  }; while (removeRandom.lastChild) {
    removeRandom.removeChild(removeRandom.lastChild)
  }; while (removeBattle.lastChild) {
    removeBattle.removeChild(removeBattle.lastChild)
  };
}
//End of search results function


//Write function to randomly generate a character id
function randomCharacter() {
  const min = 0;
  const max = 731;
  return Math.floor(min + Math.random() * (max + 1 - min));
}
//End of random character generator function


//Function to grab the randomly generated ID's info
async function getRandomCharacter() {
  randomCharacter()
  removeSearch()
  const characterId = randomCharacter('value')
  const character = (cors_api_url + `https://superheroapi.com/api/10157236778121862/${characterId}`)

  try {
    result = await axios.get(character)
    console.log(result)
    const response = result.data
    // console.log(response)

    const characterPage = document.querySelector('.p-random-character')
    const img = document.createElement('img')
    img.setAttribute('src', response.image.url)
    img.className = ('r1-img')
    characterPage.append(img)

    const charIdentity = document.createElement('p')
    const identity = response.name
    charIdentity.textContent = `Identity: ` + `${identity}`
    charIdentity.className = ('r2-identity')
    characterPage.append(charIdentity)

    const charAlias = document.createElement('p')
    const alias = response.biography.aliases
    charAlias.textContent = `Alias: ` + `${alias}`
    charAlias.className = ('r3-alias')
    characterPage.append(charAlias)

    const charAppearance = document.createElement('ul')
    charAppearance.className = ('r4-appearance-list')
    characterPage.append(charAppearance)

    const genderLi = document.createElement('li')
    const gender = response.appearance
    genderLi.textContent = `Gender: ${gender.gender}`
    charAppearance.append(genderLi)

    const heightLi = document.createElement('li')
    const height = response.appearance
    heightLi.textContent = `Height: ${height.height}`
    charAppearance.append(heightLi)

    const weightLi = document.createElement('li')
    const weight = response.appearance
    weightLi.textContent = `Weight: ${weight.weight}`
    charAppearance.append(weightLi)

    const raceLi = document.createElement('li')
    const race = response.appearance
    raceLi.textContent = `Race: ${race.race}`
    charAppearance.append(raceLi)

    const organizations = document.createElement('p')
    const affiliations = response.connections['group-affiliation']
    organizations.textContent = `Known Affiliations: ` + `${affiliations}`
    organizations.className = ('r5-affiliations')
    characterPage.append(organizations)

    const creator = document.createElement('p')
    const publisherInfo = response.biography.publisher
    creator.className = ('r6-publisher')
    creator.textContent = `Publisher: ` + `${publisherInfo}`
    characterPage.append(creator)

    const powerStats = document.createElement('ul')
    powerStats.className = ('r6-powers')
    characterPage.append(powerStats)

    const combatLi = document.createElement('li')
    const combat = response.powerstats
    combatLi.textContent = `Combat: ${combat.combat}`
    powerStats.append(combatLi)

    const durabilityLi = document.createElement('li')
    const durability = response.powerstats
    durabilityLi.textContent = `Durability: ${durability.durability}`
    powerStats.append(durabilityLi)

    const intelligenceLi = document.createElement('li')
    const intelligence = response.powerstats
    intelligenceLi.textContent = `Intelligence: ${intelligence.intelligence}`
    powerStats.append(intelligenceLi)

    const powerLi = document.createElement('li')
    const power = response.powerstats
    powerLi.textContent = `Power: ${power.power}`
    powerStats.append(intelligenceLi)

    const speedLi = document.createElement('li')
    const speed = response.powerstats
    speedLi.textContent = `Speed: ${speed.speed}`
    powerStats.append(speedLi)

    const strengthLi = document.createElement('li')
    const strength = response.powerstats
    strengthLi.textContent = `Strength: ${strength.strength}`
    powerStats.append(strengthLi)

  }
  catch (error) {
    console.log(error)
  }
}
//End of Random Character Function


//Battle function setup
async function doBattle() {
  randomCharacter()
  removeSearch()

  const characterId1 = randomCharacter('value')
  const characterId2 = randomCharacter('value')
  const character1 = (cors_api_url + `https://superheroapi.com/api/10157236778121862/${characterId1}`)

  const character2 = (cors_api_url + `https://superheroapi.com/api/10157236778121862/${characterId2}`)

  try {
    result1 = await axios.get(character1)
    result2 = await axios.get(character2)
    console.log(result1, result2)
    const response1 = result1.data
    const response2 = result2.data


    // console.log(response)


    const battlePage1 = document.querySelector('.p-battle1')
    const bioPic1 = document.createElement('img')
    bioPic1.setAttribute('src', response1.image.url)
    bioPic1.className = ('b1-img')
    battlePage1.append(bioPic1)

    const battleIdentity1 = document.createElement('p')
    const bioName1 = response1.name
    battleIdentity1.textContent = `${bioName1}`
    battleIdentity1.className = ('b1-identity')
    battlePage1.append(battleIdentity1)

    const powerStats1 = document.createElement('ul')
    powerStats1.className = ('b1-powers')
    battlePage1.append(powerStats1)

    const combatLi1 = document.createElement('li')
    const combat1 = response1.powerstats
    combatLi1.textContent = `${combat1.combat}`
    powerStats1.append(combatLi1)

    const durabilityLi1 = document.createElement('li')
    const durability1 = response1.powerstats
    durabilityLi1.textContent = `${durability1.durability}`
    powerStats1.append(durabilityLi1)

    const intelligenceLi1 = document.createElement('li')
    const intelligence1 = response1.powerstats
    intelligenceLi1.textContent = `${intelligence1.intelligence}`
    powerStats1.append(intelligenceLi1)

    const powerLi1 = document.createElement('li')
    const power1 = response1.powerstats
    powerLi1.textContent = `${power1.power}`
    powerStats1.append(intelligenceLi1)

    const speedLi1 = document.createElement('li')
    const speed1 = response1.powerstats
    speedLi1.textContent = `${speed1.speed}`
    powerStats1.append(speedLi1)

    const strengthLi1 = document.createElement('li')
    const strength1 = response1.powerstats
    strengthLi1.textContent = `${strength1.strength}`
    powerStats1.append(strengthLi1)
    //End Character 1 creation


    //Creating list item descriptions

    const powerStatsText = document.createElement('ul')
    powerStatsText.className = ('b1-powers-text')
    battlePage1.append(powerStatsText)

    const combatLiText = document.createElement('li')
    combatLiText.textContent = `Combat:`
    powerStatsText.append(combatLiText)

    const durabilityLiText = document.createElement('li')
    durabilityLiText.textContent = `Durability:`
    powerStatsText.append(durabilityLiText)

    const intelligenceLiText = document.createElement('li')
    intelligenceLiText.textContent = `Intelligence:`
    powerStatsText.append(intelligenceLiText)

    const powerLiText = document.createElement('li')
    powerLiText.textContent = `Power:`
    powerStatsText.append(intelligenceLiText)

    const speedLiText = document.createElement('li')
    speedLiText.textContent = `Speed:`
    powerStatsText.append(speedLiText)

    const strengthLiText = document.createElement('li')
    strengthLiText.textContent = `Strength:`
    powerStatsText.append(strengthLiText)

    //End creating list item descriptions


    //Character 2 Stats
    const battlePage2 = document.querySelector('.p-battle1')
    const bioPic2 = document.createElement('img')
    bioPic2.setAttribute('src', response2.image.url)
    bioPic2.className = ('b2-img')
    battlePage2.append(bioPic2)

    const battleIdentity2 = document.createElement('p')
    const bioName2 = response2.name
    battleIdentity2.textContent = `${bioName2}`
    battleIdentity2.className = ('b2-identity')
    battlePage2.append(battleIdentity2)

    const powerStats2 = document.createElement('ul')
    powerStats2.className = ('b2-powers')
    battlePage2.append(powerStats2)

    const combatLi2 = document.createElement('li')
    const combat2 = response2.powerstats
    combatLi2.textContent = `${combat2.combat}`
    powerStats2.append(combatLi2)

    const durabilityLi2 = document.createElement('li')
    const durability2 = response2.powerstats
    durabilityLi2.textContent = `${durability2.durability}`
    powerStats2.append(durabilityLi2)

    const intelligenceLi2 = document.createElement('li')
    const intelligence2 = response2.powerstats
    intelligenceLi2.textContent = `${intelligence2.intelligence}`
    powerStats2.append(intelligenceLi2)

    const powerLi2 = document.createElement('li')
    const power2 = response2.powerstats
    powerLi2.textContent = `${power2.power}`
    powerStats2.append(intelligenceLi2)

    const speedLi2 = document.createElement('li')
    const speed2 = response2.powerstats
    speedLi2.textContent = `${speed2.speed}`
    powerStats2.append(speedLi2)

    const strengthLi2 = document.createElement('li')
    const strength2 = response2.powerstats
    strengthLi2.textContent = `${strength2.strength}`
    powerStats2.append(strengthLi2)

    // Combat function to generate winner based on their powerstats
    let combatId1 = parseInt(response1.powerstats.combat, 10)
    let combatId2 = parseInt(response2.powerstats.combat, 10)
    let durabilityId1 = parseInt(response1.powerstats.durability, 10)
    let durabilityId2 = parseInt(response2.powerstats.durability, 10)
    let intelligenceId1 = parseInt(response1.powerstats.intelligence, 10)
    let intelligenceId2 = parseInt(response2.powerstats.intelligence, 10)
    let speedId1 = parseInt(response1.powerstats.speed, 10)
    let speedId2 = parseInt(response2.powerstats.speed, 10)
    let strengthId1 = parseInt(response1.powerstats.strength, 10)
    let strengthId2 = parseInt(response2.powerstats.strength, 10)

    let arr1Avg = (combatId1 + durabilityId1 + intelligenceId1 + speedId1 + strengthId1) / 5;
    let arr2Avg = (combatId2 + durabilityId2 + intelligenceId2 + speedId2 + strengthId2) / 5;

    console.log(arr1Avg)


    function winner() {
      if (arr1Avg > arr2Avg) {
        result = `Winner: ` + `${bioName1}!`;
      } else {
        result = `Winner: ` + `${bioName2}!`;
      } console.log(result)
      return result;
    }
    // winner()
    const postResult = document.createElement('p');
    postResult.textContent = winner()
    postResult.className = 'winner'
    powerStatsText.append(postResult)

  } catch (error) {
    console.log(error)
  }
}

