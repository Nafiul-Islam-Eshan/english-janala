const loadLevel = () => {
  const levelUrl = "https://openapi.programming-hero.com/api/levels/all";
  fetch(levelUrl)
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  const wordsUrl = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(wordsUrl)
    .then((res) => res.json())
    .then((levelWords) => displayLevelWords(levelWords.data));
};

const displayLevelWords = (words) => {
  // 1- get the container and make empty
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";

  if (words.length === 0){
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
            <p class="font-bold text-2xl "> ${word.word} </p>
            <p class="font-semibold ">Meaning /Pronounciation</p>
            <div class="font-bangla font-bold text-xl">" ${word.meaning} / ${word.pronunciation} "</div>
            <div class="flex justify-between items-center mt-1">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF0]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

    // 2-3- appending into container
    wordContainer.append(card);
  });
};

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
        <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;

    // 2-3- append into container
    lessonsContainer.append(btnDiv);
  });
};

loadLevel();
