const API_KEY = '6bbef425e56a455fbf554efad0787b3d';
const newsContainer = document.querySelector('.news-container');
const search = document.querySelector('#search');
const searchBtn = document.querySelector('.search-btn');
const navItems = document.querySelectorAll('.nav-list li');

// const API_URL = 'https://newsapi.org/v2/everything?q=tesla&from=2024-02-07&sortBy=publishedAt&apiKey='

window.addEventListener('DOMContentLoaded', function() {
    fetchNews('ipl');
    
});
searchBtn.addEventListener('click', function() {
    const value = search.value;
    fetchNews(value);
});

navItems.forEach(function(navItem) {
    navItem.addEventListener('click', function(e) {
        navItems.forEach(function(item) {
            item.classList.remove('active');
        })
        let id = e.currentTarget.dataset.id;
        e.currentTarget.classList.add('active');
        //console.log(id);
        fetchNews(id);
    })
})

async function fetchNews(query) {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    
    //console.log(data.articles)
    bindData(data.articles);
    
}

function bindData(articles) {
    const news = articles.map(function(article) {
        const date = new Date(article.publishedAt).toLocaleString("en-US")
        return `<div class="news-card">
                <div class="news-img">
                    <img src=${article.urlToImage} alt=${article.title}>
                </div>

                <div class="news-content">
                    
                    <h4 class="title"><a href="${article.url}" target="_blank">${article.title}</a></h4>
                    <span>${article.source.name} - ${date}</span>
                    <p class="news-desc">${article.description}</p>
                </div>
            </div>`
    }).join('');
    
    newsContainer.innerHTML = news;
   
}