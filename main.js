 
const API = 'https://api.thecatapi.com/v1/images/search?limit=10'
const key = 'live_y4ftrxy1jVOeJr42xE28Hx8iLPZeyb4q2bMxfwjLYt3vf62r4AAnct5nQUJtqZTb'
const favourites = 'https://api.thecatapi.com/v1/favourites'
const deleteURL = (id) => `https://api.thecatapi.com/v1/favourites/${id}`
const spanError = document.getElementById('error')
const sectionFavs = document.getElementById('favorites')
const btnFavs = document.getElementById('btnfavs')


async function search() {
    const img1 = document.getElementById('img1')
    const img2 = document.getElementById('img2')  
    const btn1 = document.getElementById('btn1')  
    const btn2 = document.getElementById('btn2')
    try {
        const response = await fetch(API)
        const data = await response.json()
        console.log(data)
        img1.src = data[0].url
        img2.src = data[1].url
        btn1.onclick = () => post(data[0].id)
        btn2.onclick = () => post(data[1].id)
    } catch (error) {
        console.error(error)
        spanError.innerHTML = `You get an error: ${error}`
    }    
}

async function post(id) {
    try {
        const response = await fetch(favourites, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            }, body: JSON.stringify({
                image_id : id
            })
        })
        const data = await response.json()
        console.log(data.message + ' Cat save')
        console.log(data)
        loadfav()
    } catch (error) {
        console.error(error)
        spanError.innerHTML = `You get an error: ${error}`
    }
}

async function loadfav() {  
    try {
        const response = await fetch(favourites, {
            headers: {
                'Conten-Type': 'application/json',
                'x-api-key': key
            }
        })
        const data = await response.json()
        console.log(data)

        sectionFavs.innerHTML = ''
        const h2 = document.createElement('h2')
        h2.textContent = 'Favorites cats'
        sectionFavs.appendChild(h2)
        data.forEach(cat => {
            const article = document.createElement('article')
            const img = document.createElement('img')
            const btn = document.createElement('button')
            const text = document.createTextNode('Delete cat')

            img.src = cat.image.url
            img.width = 150;
            img.height = 150;
            btn.appendChild(text)
            btn.onclick = () => deleteFav(cat.id)
                
            article.appendChild(img)
            article.appendChild(btn)
            sectionFavs.appendChild(article)
        });
    } catch (error) {
        console.error(error)
        spanError.innerHTML = `You get an error: ${error}`
    }    
    
}

async function deleteFav(id) {
    try {
        const response = await fetch(deleteURL(id), {
            method: 'DELETE',
            headers: {
                'x-api-key': key
            }
        })
        const data = await response.json()
        console.log('cat delete succes')
        loadfav()
    } catch (error) {
        console.error(error)
        spanError.innerHTML = `You get an error: ${error}`
    }
}
search()
loadfav()
