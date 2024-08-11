function startQuiz() {
  const nar = [
    "As you stroll down Toasty Street, the irresistible smell of freshly baked goods draws you to the coolest bakery in Toastown. Inside, you see the display case showing all sorts of toast with tasty toppings.",
    "Exiting the bakery, you're greeted by the lively pulse of the city streets. Surrounded by the constant motion of people and traffic, you feel excited.",
    "Back home after a busy day, you kick off your shoes and settle into your comfy couch and start daydreaming.",
    "As the day draws to a close, you relax and reflect about what happened and how you got here."
  ];

  const ep = [
    [
      "You approach the counter, torn between two options",
      "With your chosen toast in hand, you’re faced with another decision",
      "As you’re heading home after enjoying your delicious meal, you stop by the bakery's bulletin board and spot a flyer. It announces a baking workshop that is coming up soon."
    ],
    [
      "You spot a street performer wowing everyone with their amazing music.",
      "As you make your way through the city, you stumble upon a vibrant mural painted on a building, each stroke telling a tale.",
      "As your travel, you’re immediately drawn to the rows of books lining the shelves."
    ],
    [
      "Looking around your living room, you see your shelves filled with books and photos from your past adventures.",
      "As you settle down for the night, you perk up at the sound of music playing softly from the speakers.",
      "Sitting at your desk, you notice a blank canvas and a set of paints from across the room. You remember you've been wanting to paint whenever you have some free time."
    ],
    [
      "Glancing at your planner, you’re reminded of the tasks that await you tomorrow.",
      "Before you can lie on your bed, you notice a pile of laundry waiting to be folded in the corner of the room.",
      "As you drift off to sleep, you think about your plans for the next morning."
    ]
  ];

  const options = [
  [
    ["You ask the employee for today's special", "Quietly checking out the toast options on your own"],
    ["You write a note on the post-it wall in the bakery", "Finding a cozy corner to enjoy your snack in peace"],
    ["You sign up for the workshop", "You snap a photo of the flyer and consider it later"]
],
  [
    ["Drawn to the beauty of the music, you pause to immerse yourself in the moment", "Preferring to stay focused on your destination, you continue on your way"],
    ["Captivated by the vibrant colors, you decide to take a picture of the mural", "Appreciating it briefly before moving on with your day"],
    ["Intrigued, you decide to enter the bookstore to explore its treasures.", "Feeling torn between curiosity and staying on track, you decide to make a note of the bookstore’s location to return later"]
  ],
  [
    ["You find yourself reaching for a book from the shelf to read and relax", "You reflect on the memories that cherish your moments and experiences"],
    ["Intrigued by the verses and melodies, you find yourself analyzing the meaning behind the music", "You allow yourself to be swept away by the music as you dance around the living room"],
    ["You find yourself drawn to planning out your painting beforehand", "You follow your heart and express your freedom, embracing spontaneity and experimentation"]
  ],
  [
    ["Feeling a sense of satisfaction in organization, you review your schedule and prioritize your to-do list for the next day", "You set it aside for the next day"],
    ["You went to work directly and folded your laundry", "Prioritizing relaxation and leisure, you decide to leave the laundry for the next day"],
    ["Wanting to start the day with productivity, you set an alarm", "You want to wake up naturally and trust that you can and will wake up at your own pace"]
  ]
  ];

  let currEp = 0;
  let currQuest = 0;
  let ans = { E: 0, S: 0, T: 0, J: 0, I: 0, N: 0, F: 0, P: 0 };
  let choicesMade = 0; 
  let currOpt = 0;

  const totalEpisodes = ep.flat().length;

  function updateProgressBar(){
    // const totalQuest = nar.length * ep[0].length;
    const currProgress = currQuest * ep[0].length + currEp;
    const progPercent = (currProgress/totalEpisodes)*100;

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progPercent + '%';
  }

  function dispQuest() {
    const quizCont = document.getElementById('quiz');
    quizCont.innerHTML = ''; // Clear the quiz container

    updateProgressBar();

    // Create narration element
    if(currEp == 0){
      const questDiv = document.createElement('div');
      questDiv.classList.add('question', 'nar-style');
      questDiv.textContent = nar[currQuest];
      quizCont.appendChild(questDiv);
    }
    
    // Create episode element
    const epDiv = document.createElement('div');
    epDiv.classList.add('episode', 'ep-style');
    epDiv.textContent = ep[currQuest][currEp];
    quizCont.appendChild(epDiv);

    // Display options for current episode only
    const optionsForCurrentEpisode = options[currQuest][currEp];
    for (let i = 0; i < optionsForCurrentEpisode.length; i++) {
      const optDiv = document.createElement('div');
      optDiv.classList.add('option');

      const optTxt = document.createElement('p');
      optTxt.classList.add('ep-style');

      optDiv.appendChild(optTxt);

      const optA = document.createElement('button');
      optA.textContent = optionsForCurrentEpisode[i];
      optA.addEventListener('click', function () {
        recChoice(true, i);
      });
      optDiv.appendChild(optA);

      quizCont.appendChild(optDiv);
    }
  }

  function recChoice(choice, opt) {
    const questionType = currQuest % 4; // 0 = E/I, 1 = S/N, 2 = T/F, 3 = J/P
    const optionType = opt; // 0 or 1

    const properties = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']];

    ans[properties[questionType][optionType]] += choice ? 1 : -1;


    if (opt != currOpt){
      currOpt = opt;
      choicesMade++;
    } else{
      choicesMade++;
    }

    if(choicesMade === 1){
      currEp++;
      choicesMade = 0; 
    }

    if (currEp === ep[currQuest].length) {
      currQuest++;
      currEp = 0;
    }

    if (currQuest < nar.length) {
      dispQuest();
    } else {
      rsltPg();
    }
  }

  function calcRslt() {
    let mbti = '';
    mbti += ans.E > ans.I ? 'E' : 'I';
    mbti += ans.S > ans.N ? 'S' : 'N';
    mbti += ans.T > ans.F ? 'T' : 'F';
    mbti += ans.J > ans.P ? 'J' : 'P';
    return mbti;
  }

  function rsltPg() {
    const mbti = calcRslt();
    window.location.href = `result.html?mbti=${mbti}`;
  }

  dispQuest();
}

startQuiz();