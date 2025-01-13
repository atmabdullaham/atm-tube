// create load categories

const loadCategories = () => {
 // __Fetch the data
 fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res => res.json())
  .then(data => displayCategories(data.categories))
  .catch((error) => console.log(error));
}



// create display categories
const displayCategories = (categories) => {
 const categoryContainer = document.getElementById("categories");
 categories.forEach(item => {
  console.log(item);
  // create a button
  const button = document.createElement("button");
  button.classList = "btn";
  button.innerText = item.category;
  //  add button to the category container
  categoryContainer.append(button);
 });

}
loadCategories();
// {
// category_id: '1001',
// category: 'Music'
// }