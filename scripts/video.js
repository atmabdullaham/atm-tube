// create load categories

const loadCategories = () => {
 // __Fetch the data
 fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res => res.json())
  .then(data => displayCategories(data.categories))
  .catch((error) => console.log(error));
}



// create display categories
const displayCategories = (data) => {
 console.log(data)
}
loadCategories();
