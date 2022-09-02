const loadNavbar = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayNavbar(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayNavbar = (categories) => {
  const categoriesMenu = document.getElementById("categories-menu");
  categories.forEach((categorie) => {
    const categorieItem = document.createElement("li");
    categorieItem.classList.add("nav-item");
    categorieItem.innerHTML = `
    <a class="nav-link" onclick="loadNews('${categorie.category_id}', '${categorie.category_name}')" href="#">${categorie.category_name}</a>
    `;
    categoriesMenu.appendChild(categorieItem);
  });
};

const loadNews = (categorieId, categorieName) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${categorieId}`)
    .then((res) => res.json())
    .then((data) => displayNews(data.data, categorieName))
    .catch((error) => console.log(error));
};

const displayNews = (news, categorieName) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = ``;
  const itemsFound = document.getElementById("items-found");
  itemsFound.innerText = `${news.length} items found for categories ${categorieName}`;
  news.forEach((newsItem) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card");
    newsDiv.classList.add("mb-3");
    newsDiv.classList.add("p-3");
    newsDiv.innerHTML = `
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${
              newsItem.image_url
            }" class="img-fluid rounded-start" style="height: 100%;" />
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h4 class="card-title">${newsItem.title}</h4>
            <p class="card-text">
                ${newsItem.details.slice(0, 200) + "....."}
            </p>
            <p class="card-text">
                <div class="row d-flex justify-content-between align-items-center">
                <div class="col-4 d-flex align-items-center">
                    <img src="${
                      newsItem.author.img
                    }" class="w-25 rounded-circle me-3" alt="">
                    <div>
                        <h6>${
                          newsItem.author.name
                            ? newsItem.author.name
                            : "Name not found"
                        }</h6>
                        <small class="text-muted">${
                          newsItem.author.published_date
                        }</small>
                    </div>
                </div>
                <div class="col-2">
                    <i class="fa-solid fa-eye"></i>
                    <span>${
                      newsItem.total_view ? newsItem.total_view : "No Found"
                    }</span>
                </div>
                <div class="col-4">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div class="col-2 text-end">
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                </div>
            </p>
            </div>
        </div>
    </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
};

loadNews("08", "All News");
loadNavbar();
