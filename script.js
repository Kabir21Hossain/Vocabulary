const loadData = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data))
    .catch((error) => {
      console.error("Could not load lessons:", error);
      alert(
        "Unable to load lessons. Please check your connection and refresh the page.",
      );
    });
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const wordDetailsModal = (wordData) => {
  const synonyms = Array.isArray(wordData.synonyms) ? wordData.synonyms : [];
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
    <h3 class="text-xl font-extrabold">${wordData.word} (<i class="fa-solid fa-microphone"></i> : ${wordData.pronunciation})</h3>
    <p class="text-md font-bold">Meaning</p>
    <p class="text-md">${wordData.meaning}</p>
    <p class="font-extrabold">Example</p>
    <p class="text-gray-300 text-lg">${wordData.sentence}</p>
    <p class="font-bold">সমার্থক শব্দ গুলো</p>

    ${synonyms.length > 0 ? `<ul class="list-disc list-inside space-x-2">
      ${synonyms.map((syn) => `<button class="btn btn-outline btn-soft btn-info">${syn}</button>`).join("")}
    </ul>` : `<p>এই শব্দের কোন সমার্থক শব্দ নেই।</p>`}

    <button class="btn btn-primary" onclick="completeLearning('${wordData.word}')">Complete Learning</button>
  `;

  document.getElementById("my_modal_5").showModal();
};

const displayWordDetails = async (wordId) => {
  const url = `https://openapi.programming-hero.com/api/word/${wordId}`;

  const res = await fetch(url);
  const wordData = await res.json();
  wordDetailsModal(wordData.data);
};

const showDetails = (level_no) => {
  document.getElementById("selected-lesson").classList.add("hidden");

  const lessonButtons = document.querySelectorAll(".lesson-list .btn");
  lessonButtons.forEach((btn) => btn.classList.remove("bg-gray-400"));

  if (lessonButtons[level_no - 1]) {
    lessonButtons[level_no - 1].classList.add("bg-gray-400");
  }
  document.querySelector('.loader').classList.toggle('hidden');
  const url = `https://openapi.programming-hero.com/api/level/${level_no}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      
      const levelContainer = document.querySelector(".levelContainer");
      levelContainer.innerHTML = "";
      levelContainer.classList.add("py-10");
      const words = data.data;

      if (words.length === 0) {
        document.querySelector('.loader').classList.toggle('hidden');
        const div = document.createElement("div");
        div.classList.add(
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "py-10",
        );

        const img = document.createElement("img");
        img.src = "assets/alert-error.png";
        img.alt = "No words found";
        img.classList.add("mx-auto", "my-10", "w-24", "h-24");
        div.appendChild(img);
        levelContainer.appendChild(div);
        const message = document.createElement("p");
        message.textContent =
          "এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।";
        message.classList.add(
          "text-center",
          "text-lg",
          "font-bold",
          "text-gray-600",
        );

        const messageBn = document.createElement("p");
        messageBn.textContent = "নেক্সট Lesson এ যান";
        messageBn.classList.add(
          "text-center",
          "text-2xl",
          "font-extrabold",
          "text-black",
          "mt-2",
        );

        div.appendChild(message);
        div.appendChild(messageBn);
        levelContainer.appendChild(div);
      } else {
        document.querySelector('.loader').classList.toggle('hidden');
        for (const word of words) {
          const div = document.createElement("div");
          div.classList.add(
            "card",
            "card-side",
            "bg-base-100",
            "shadow-xl",
            "flex-col",
            "justify-center",
            "gap-4",
            "p-6",
            "w-full",
            "max-w-md",
            "sm:w-[45%]",
            "lg:w-[30%]",
          );
          div.innerHTML = `
        <h2 class="card-title text-xl font-bold text-center">${word.word}</h2>
        <p class="mean_pronun text-sm font-bold">Meaning/Pronunciation</p>
        <h2 class="text-xl font-bold">${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নাই"}/${word.pronunciation}</h2>
        <div class="flex  justify-between items-center mt-8 px-2">
        <button class="btn btn-outline btn-soft btn-info " onclick="displayWordDetails('${word.id}')"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn btn-outline  btn-soft btn-info" onclick="pronounceWord('${word.word}')"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        `;
          levelContainer.appendChild(div);
        }
      }
    })
    .catch((error) => {
      console.error("Could not load lesson details:", error);
      alert("Unable to load lesson details. Please try again.");
    });
};

const displayData = (data) => {
  const lessonBtn = document.querySelector(".lesson-list");

  for (const lesson of data) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-outline", "btn-primary");
    button.innerHTML = `<span><img src="assets/fa-book-open.png"
                            alt=""></span> Lesson-${lesson.level_no}`;
    lessonBtn.appendChild(button);

    button.addEventListener("click", () => showDetails(lesson.level_no));
  }
};

const getData = () => {
  const name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !password) {
    alert("Please enter both name and password.");
    return;
  }

  alert(`Welcome, ${name}! Please select a lesson below.`);
  document.getElementById("gotolesson").scrollIntoView({ behavior: "smooth" });
};

const searchWord = () => {
  const searchInput = document.getElementById('input-text').value.trim().toLowerCase();
  if (!searchInput) {
    alert('Please enter a word to search.');
    return;
  }

  const url = `https://openapi.programming-hero.com/api/words/all`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const words=data.data;
      const filterWords=words.filter(word=>word.word.toLowerCase().includes(searchInput));
      console.log(filterWords);
      if (filterWords.length > 0) {
        renderWords(filterWords);
      } else {
        alert('No matching word found. Please try another search term.');
      }
    })
    .catch((error) => {
      console.error('Search request failed:', error);
      alert('Unable to perform search right now. Please try again later.');
    });
};
const renderWords = (words) => {
  const levelContainer = document.querySelector('.levelContainer');
  const selectedLesson = document.getElementById('selected-lesson');
  selectedLesson.classList.add('hidden');
  levelContainer.innerHTML = '';
  levelContainer.classList.add('py-10');

  for (const word of words) {
    const div = document.createElement('div');
    div.classList.add(
      'card',
      'card-side',
      'bg-base-100',
      'shadow-xl',
      'flex-col',
      'justify-center',
      'gap-4',
      'p-6',
      'w-full',
      'max-w-md',
      'sm:w-[45%]',
      'lg:w-[30%]',
    );
    div.innerHTML = `
      <h2 class="card-title text-xl font-bold text-center">${word.word}</h2>
      <p class="mean_pronun text-sm font-bold">Meaning/Pronunciation</p>
      <h2 class="text-xl font-bold">${word.meaning ? word.meaning : 'অর্থ পাওয়া যায় নাই'}/${word.pronunciation}</h2>
      <div class="flex justify-between items-center mt-8 px-2">
        <button class="btn btn-outline btn-soft btn-info" onclick="displayWordDetails('${word.id}')"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn btn-outline btn-soft btn-info" onclick="pronounceWord('${word.word}')"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    `;
    levelContainer.appendChild(div);
  }
};



loadData();
