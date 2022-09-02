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
    <a class="nav-link" href="#">${categorie.category_name}</a>
    `;
    categoriesMenu.appendChild(categorieItem);
  });
};

loadNavbar();
