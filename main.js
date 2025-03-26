 
const API = 'https://api.thecatapi.com/v1/images/search?limit=10'
const key = 'live_y4ftrxy1jVOeJr42xE28Hx8iLPZeyb4q2bMxfwjLYt3vf62r4AAnct5nQUJtqZTb'
const favourites = 'https://api.thecatapi.com/v1/favourites'
const spanError = document.getElementById('error')
const sectionFavs = document.getElementById('favorites')
const btnFavs = document.getElementById('btnfavs')

async function search() {
    const img1 = document.getElementById('img1')
    const img2 = document.getElementById('img2')    
    try {
        const response = await fetch(API)
        const data = await response.json()
        console.log(data)
        img1.src = data[0].url
        img2.src = data[1].url
    } catch (error) {
        console.error(error)
        spanError.innerHTML = `You get an error: ${error}`
    }    
}

async function post() {
    try {
        const response = await fetch(favourites, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            }, body: JSON.stringify({
                image_id : '4a6'
            })
        })
        const data = await response.json()
        console.log(data.message)
    } catch (error) {
        console.error(error)
        spanError.innerHTML = `You get an error: ${error}`
    }
}

async function getfav() {  
    try {
        const response = await fetch(favourites, {
            headers: {
                'Conten-Type': 'application/json',
                'x-api-key': key
            }
        })
        const data = await response.json()
        console.log(data)

        for (let i = 0; i < data.length; i++) {
            const fav = document.createElement('article')
            fav.innerHTML = `
            <img src='${data[i].image.url}' id="img" height="150px" width="150px" alt="Image of fav cat">
            <button>Delete fav</button>`
            sectionFavs.appendChild(fav)
        }
    } catch (error) {
        console.error(error)
        spanError.innerHTML = `You get an error: ${error}`
    }    
}

search()
getfav()