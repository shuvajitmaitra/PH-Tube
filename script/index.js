const dataLoad = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    categories = data.data;
    displayCategory(categories);
}
const displayCategory = (categories) => {
    const tabContainer = document.getElementById('tab-container');
    categories.forEach(category => {
        const div = document.createElement('div');
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
const displayCard = (cards) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    cards.forEach(card => {
        const div = document.createElement('div');
        // card.authors.forEach(verfy => {
        //     console.log(verfy.verified);
        //     if (!verfy.verified === false || verfy.verified === " ") {
        //         const isVerified = document.getElementById('isVerified');
        //         isVerified.classList.add('hidden')

        //     }
        // })
        div.innerHTML = `
        <div class="card bg-base-300 shadow-xl">
          <figure class="relative">
            <img
              src=${card?.thumbnail}
              alt="Shoes"
              class="rounded-2xl w-full h-44"
            />
            <p
              class="bg-slate-400 text-xs px-1 rounded-[4px] absolute bottom-2 right-2"
            >
              3hrs 56mins
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
                  <p>${card?.authors[0]?.verified}</p>
                  <img src="./image/verify.png" alt="" class="w-6 ml-1 " id="isVerified"/>
                </div>
                <p class="text-[#171717B2]">${card?.others?.views} views</p>
              </div>
            </div>
          </div>
        </div>
        `;
        cardContainer.appendChild(div);
    })
}
cardLoad(1000);