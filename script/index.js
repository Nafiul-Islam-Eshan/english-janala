
const loadLevel = () => {
    const levelUrl = "https://openapi.programming-hero.com/api/levels/all" 
    fetch(levelUrl)
    .then( res => res.json())
    .then(json => displayLessons(json.data));
}

loadLevel();

const displayLessons = (lessons) => {
    // 1- get the container and make empty
    const lessonsContainer = document.querySelector("#lessonsContainer"); // getting the parent container
    lessonsContainer.innerHTML = "" ; // making empty

    // 2- get into evey lessons, then -
    lessons.forEach(lesson => {
        // 2-1- create element
        const btnDiv = document.createElement("div");

        // 2-2- setting inner Html
        btnDiv.innerHTML = `
            <button class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;

        // 2-3- append into container
        lessonsContainer.append(btnDiv);
    });
}