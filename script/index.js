
// This function ---
//    1. fetch the data of lesson buttons
const loadLevel = () => {
  const levelUrl = "https://openapi.programming-hero.com/api/levels/all"; // url of btn datad
  fetch(levelUrl) // fetch started
    .then((res) => res.json()) // making the resonse in json format
    .then((json) => displayLessons(json.data)); // value of data key inside the json format passed to the displayLessons function
};


const removeActive = () => {
  const levelBtns = document.querySelectorAll(".level-btns") // get all lesson buttons when any lesson btn is clicked
  levelBtns.forEach(levelBtn => {
    levelBtn.classList.remove("active");
  });
}


// This fuction ---
//    1. fetches json data of all words in each lesson
//    2.takes value of lesson no. from the clicked btn. Onclick handler in 96 line
const loadLevelWord = (id) => { // id = unique id of each level
  const wordsUrl = `https://openapi.programming-hero.com/api/level/${id}`; // url of lesson words 
  fetch(wordsUrl) // started fetching 
    .then((res) => res.json()) // convert the response into json 
    .then((levelWords) => {  // while every lesson words fetched, I will do something
      removeActive(); // will call the removeActive function
      const clickedBtn = document.getElementById(`lesson-btn-${id}`); // will get the selected lesson btn
      clickedBtn.classList.add("active"); // this selected btn will get some style
      
      displayLevelWords(levelWords.data); //send the value of data key inside fetched json to displayLevelWords function
    });
};


// This function ---
//    1. takes an id as a parameter
//    2. fetches word details of that specific id
const loadWordDetail = async (id) => { // id = unique id of word details
  const url = `https://openapi.programming-hero.com/api/word/${id}`; // url of word details
  const res = await fetch(url); // fetching and getting respond
  const detail = await res.json();  // converting the respond to json
  displayWordDetail(detail.data); // detail = object of word detail
}


const displayWordDetail = (word) => {
  const wordDetailContainer = document.getElementById("word-detail-container");
  wordDetailContainer.innerHTML = `<p>Yes Iam a modal given by js</p>`
  document.getElementById("my_modal_5").showModal()
}



// This function ---
//    1. will receive an array. This array is of object what containes keys id,level,word,meaning,pronunciation
//    2. Display these each object in a card in the UI
const displayLevelWords = (words) => {
  // 1- get the container and make empty
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";

  if (words.length === 0){  // if there is no word to show 
    wordContainer.innerHTML = `
        <div class="col-span-full text-center space-y-3 py-6 md:py-10 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-gray-400 text-[14px] ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-2xl md:text-3xl font-">নেক্সট Lesson এ যান</h2>
        </div>
    `
  }

  // 2- Get into every words, then-
  words.forEach((word) => {
    // 2-1- Create element
    const card = document.createElement("div");

    // 2-2- setting innerHTML

    //  "id": 4,
    // "level": 5,
    // "word": "Diligent",
    // "meaning": "পরিশ্রমী",
    // "pronunciation": "ডিলিজেন্ট"

    card.innerHTML = `
        <div class=" rounded-sm bg-white text-center p-3 space-y-4 shadow-xl">

            <p class="font-bold text-2xl "> ${word.word ? word.word : "Word not found"} </p> 

            <p class="font-semibold ">Meaning /Pronounciation</p>

            <div class="font-bangla font-bold text-xl">" ${word.meaning? word.meaning : "Meaning not found"} / ${word.pronunciation? word.pronunciation : "Pronunciation not found"} "</div>

            <div class="flex justify-between items-center mt-1">
            
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>

            </div>
        </div>
        `;

    // 2-3- appending into container
    wordContainer.append(card);
  });
};


// This fuction ---
//    1. Takes the value of data key inside json formate, what are lesson buttons data
//    2. display lesson buttons in UI
const displayLessons = (lessons) => {
  // 1- get the container and make empty
  const lessonsContainer = document.querySelector("#lessonsContainer"); // getting the parent container
  lessonsContainer.innerHTML = ""; // making empty

  // 2- get into evey lessons, then -
  lessons.forEach((lesson) => {
    // 2-1- create element
    const btnDiv = document.createElement("div");

    // 2-2- setting inner Html
    btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary level-btns">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `; // onclick triggers loadLevelWord function

    // 2-3- append into container
    lessonsContainer.append(btnDiv);
  });
};

loadLevel(); // calling loadLevel fuunction
