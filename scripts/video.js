// _________load categories
const loadCategories = () => {
  // __Fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.log(error));
}

//_________display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach(item => {
    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id = "btn-${item.category_id}" onclick = "loadCategoryVideo(${item.category_id})" class = "btn category-btn" >${item.category} </button>
    `
    //  add button to the category container
    categoryContainer.append(buttonContainer);
  });

}
loadCategories();


// ________load videos
const loadVideos = () => {
  // __Fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch((error) => console.log(error));
}
loadVideos();



// _________display videos,
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos")
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid")
    videoContainer.innerHTML = `
    <div class ="min-h-[300px] flex flex-col gap-5 justify-center items-center"  > 
       <img src ="../assets/Icon.png" />
       <h2 class ="text-center text-xl font-bold" >No Content Here in This Category </h2>
    </div>
    `
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach(video => {
    const card = document.createElement("div");
    card.classList = "card card-compact"
    card.innerHTML = `
  
  <figure class = "h-[200px]">
    <img
     class = "h-full w-full object-cover"
      src= ${video.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="py-2 px-0 flex gap-3 items-center">
  <div> 
         <img class = "w-12 h-12 rounded-full object-cover" src = ${video.authors[0].profile_picture}/> 
  </div>
    <div class="">
      <h2 class="card-title ">${video.title} </h2>
      <div class="flex items-center gap-2" > 
      <p text-gray-400 >${video.authors[0].profile_name}</p>
${video.authors[0].verified == true ? '<img id = "verification-status" class="w-5" src = "https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />' : ""} 
      </div >
      <p> <button onclick = "loadDetails('${video.video_id}')" class ="btn btn-sm btn-error" > Details </button> </p>
    </div >
  </div >
 `
    videoContainer.append(card);
  });
}

// _______________________________
const loadDetails = async (videoId) => {
  // console.log(videoId);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
}

// _______________________________
const displayDetails = (video) => {
  console.log(video);
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
  <img src = ${video.thumbnail} />
  <p> ${video.description}</p>
  `

  // Way-1
  // document.getElementById("showModalData").click();

  // way-2
  document.getElementById("customModal").showModal();
}







//     ___________________
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active")
  }
}
//  ____________________
const loadCategoryVideo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
      // sobaike active class remove koro

      removeActiveClass();
      //  id er class kactive koro
      const activeBtn = document.getElementById(`btn-${id}`);

      activeBtn.classList.add("active")

      displayVideos(data.category)
    })
    .catch((error) => console.log(error));
}


const videos = [
  {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
      {
        "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
        "profile_name": "Olivia Mitchell",
        "verified": ""
      }
    ],
    "others": {
      "views": "100K",
      "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
  }]