const dataLoad = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await response.json();
  categories = data.data;
  displayCategory(categories);
}
const displayCategory = (categories) => {
  const tabContainer = document.getElementById('tab-container');
  categories.forEach(category => {
    const div = document.createElement('div');  //Tab.............
    div.innerHTML = `
    <div class="tabs">
          <button onclick = "cardLoad('${category?.category_id}')"
            class="tab bg-[#25252533] rounded-[4px] focus:bg-[#FF1F3D] focus:text-white font-medium"
            >${category?.category}</button
          >
        </div>
    `;

    tabContainer.appendChild(div);
  });

}

dataLoad();

const cardLoad = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
  const data = await response.json();
  cards = data.data;
  displayCard(cards);
}
cardLoad(1000);

const cardSorting = (cards) => {
  cards.sort(function (a, b) {
    const nameA = parseInt(a.others.views);
    const nameB = parseInt(b.others.views);
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  cards.forEach(card => {
    const div = document.createElement('div'); // Card ...............
    const second = parseInt(card.others.posted_date);
    let hours = Math.floor(second / 3600);
    let mins = Math.floor(((second / 3600) - hours) * 60);
    div.innerHTML = `
          <div class="card bg-base-300 shadow-xl">
            <figure class="relative">
              <img
                src=${card?.thumbnail}
                alt="thumbnail"
                class="rounded-2xl w-full h-44"
              />
              <p
                class="bg-[#171717] text-white text-xs px-1 rounded-[4px] absolute bottom-2 right-2"
              >
                ${second ? hours + "hrs" : " "} ${second ? mins + "min ago" : " "}
              </p>
            </figure>
            <div class="">
              <div class="flex my-5 justify-between">
                <div class="w-16 h-16 rounded-full bg-[url('${card?.authors[0]?.profile_picture}')] bg-cover bg-center">
                  
                </div>
                <div class="w-3/4">
                  <h1 class="font-bold text-sm">
                  ${card?.title}
                  </h1>
  
                  <div class="flex">
                    <h2 class="text-[#171717B2]">${card?.authors[0]?.profile_name}</h2>
                    <p></p>
                    <img src=${card?.authors[0]?.verified ? "./image/verify.png" : "."}  alt="" class="w-6 ml-1 " id="isVerified"/>
                  </div>
                  <div id="new-container">
                  <p id="views" class="text-[#171717B2]">${card?.others?.views} views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
    cardContainer.appendChild(div);

  })
}


const displayCard = (cards) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  const emptyCardContainer = document.getElementById('empty-card-container');
  emptyCardContainer.innerHTML = '';
  if (cards.length !== 0) {
    cards.forEach(card => {
      const div = document.createElement('div'); // Card ...............
      const second = parseInt(card.others.posted_date);
      let hours = Math.floor(second / 3600);
      let mins = Math.floor(((second / 3600) - hours) * 60);
      div.innerHTML = `
            <div class="card bg-base-300 shadow-xl">
              <figure class="relative">
                <img
                  src=${card?.thumbnail}
                  alt="thumbnail"
                  class="rounded-2xl w-full h-44"
                />
                <p
                  class="bg-[#171717] text-white text-xs px-1 rounded-[4px] absolute bottom-2 right-2"
                >
                  ${second ? hours + "hrs" : " "} ${second ? mins + "min ago" : " "}
                </p>
              </figure>
              <div class="">
                <div class="flex my-5 justify-between">
                  <div class="w-16 h-16 rounded-full bg-[url('${card?.authors[0]?.profile_picture}')] bg-cover bg-center">
                    
                  </div>
                  <div class="w-3/4">
                    <h1 class="font-bold text-sm">
                    ${card?.title}
                    </h1>
    
                    <div class="flex">
                      <h2 class="text-[#171717B2]">${card?.authors[0]?.profile_name}</h2>
                      <p></p>
                      <img src=${card?.authors[0]?.verified ? "./image/verify.png" : "."}  alt="" class="w-6 ml-1 " id="isVerified"/>
                    </div>
                    <div id="new-container">
                    <p id="views" class="text-[#171717B2]">${card?.others?.views} views</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
      cardContainer.appendChild(div);
    })


  }
  else {
    const div = document.createElement('div'); //Empty card...............
    div.innerHTML = `
        <div class="flex flex-col justify-center items-center text-center mt-12 md:mt-12">
          <img src="./image/Icon.png" alt="" class="" />
          <h3 class="text-xl lg:text-4xl font-bold mt-5">
            Oops!! Sorry, There is no content here
          </h3>
        </div>
        `;
    emptyCardContainer.appendChild(div);
  }


}


