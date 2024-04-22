function startQuiz() {
  const nar = [
    "As you stroll down the cozy streets of your neighborhood, the irresistible smell of freshly baked goods draws you to a charming bakery. Stepping inside, you're met with the comforting scent of warm bread and the gentle buzz of conversation. The display case showcases an assortment of mouthwatering toast options, each with unique and delicious toppings.",
    "Stepping out from the bakery, you're greeted by the lively pulse of the city streets. Surrounded by the constant motion of people and traffic, you feel a sense of excitement and anticipation.",
    "Entering your cozy abode after a bustling day in the city, you kick off your shoes and settle into your favorite spot, your mind begins to wander as you sit on the good side of your couch.",
    "As the day draws to a close, you wind down and reflect on the events of the day and the choices that have led you here."
  ];

  const ep = [
    [
        "You approach the counter, torn between two options",
        "With your chosen toast in hand, you’re faced with another decision",
        "As you’re heading back after finishing your tasty meal, you pause in front of the bakery’s community bulletin board, where a flyer catches your eye. It advertises an upcoming baking workshop."
    ],
    [
        "You see a street performer captivating passersby with mesmerizing music.",
        "As you make your way through the city, you encounter a colorful mural adorning the side of a building, each brushstroke telling a story of its own.",
        "Along your journey, you’re immediately drawn to the rows of books lining the shelves."
    ],
    [
        "Glancing around your living room, you notice the shelves lined with your fiction book collections and photos from past adventures.",
        "As you settle down for the evening, the sound of music drifting from the speakers catches your attention.",
        "Sitting down at your desk, you notice a blank canvas and a set of paints from across the room. You tried to paint as you have free time and nothing else to do throughout the day."
    ],
    [
        "Glancing at your planner, you’re reminded of the tasks and obligations that await you tomorrow.",
        "Before you can lie on your bed, you notice a pile of laundry waiting to be folded in the corner of the room.",
        "As you drift off to sleep, you think about your plans for the next morning."
    ]
  ];

  const options = [
  [
      ["Strike up a conversation with the friendly bakery employee", "Quietly perusing the toast selections on your own"],
      ["Finding a cozy corner to enjoy your snack in peace", "Joining the bustling crowd at the communal table"],
      ["You sign up for the workshop", "You snap a photo of the flyer and consider it later"]
  ],
  [
      ["Drawn to the beauty of the music, you decide to pause and immerse yourself in the moment", "Preferring to stay focused on your destination, you continue on your way"],
      ["Captivated by the vibrant colors, you decide to pause and take a picture of the mural", "While you appreciate it, you chose to give it only a passing glance before continuing on your way"],
      ["Intrigued by it, you decide to enter the bookstore, eager to explore its treasures.", "Feeling torn between indulging your curiosity and staying on track, you decide to make a note of the bookstore’s location, intending to return later when you have more time to explore"]
  ],
  [
      ["You find yourself reaching for a book from the shelf to read and relax", "You reflect on the memories that cherish your moments and experiences"],
      ["Intrigued by the verses and melodies, you find yourself analyzing the meaning behind the music", "You allow yourself to be swept away by the emotions conveyed by the music as you dance around the living room"],
      ["You find yourself drawn to planning out your painting beforehand", "You follow your heart and express your freedom, embracing spontaneity and experimentation"]
  ],
  [
      ["Feeling a sense of satisfaction in organization, you take a few minutes to review your schedule and prioritize your to-do list for the next day", "You set it aside for the next day"],
      ["You went to work directly and folded your laundry because you hate procrastinating", "Prioritizing relaxation and leisure, you decide to leave the laundry for the next day"],
      ["Wanting to start the day with productivity, you set an alarm", "You want to wake up naturally and trust that you can and will wake up at your own pace"]
  ]
  ];

  let currQuest = 0;
  let ans = { E: 0, S: 0, T: 0, J: 0, I: 0, N: 0, F: 0, P: 0 };
  let choicesMade = 0; 
  let currOpt = 0;

  function dispQuest() {
    const quizCont = document.getElementById('quiz');
    const questDiv = document.createElement('div');
    questDiv.classList.add('question','nar-style');
    questDiv.textContent = nar[currQuest];


    quizCont.innerHTML = '';
    quizCont.appendChild(questDiv);

    for (let j = 0; j < options[currQuest].length; j++) {
      const optDiv = document.createElement('div');
      optDiv.classList.add('option');

      const optTxt = document.createElement('p');
      optTxt.classList.add('ep-style');
      optTxt.textContent = "# " + (j + 1) + ": " + ep[currQuest][j];
      optDiv.appendChild(optTxt);

      const optA = document.createElement('button');
      optA.textContent = options[currQuest][j][0];
      optA.addEventListener('click', function () {
          recChoice(true, j);
      });
      optDiv.appendChild(optA);

      const optB = document.createElement('button');
      optB.textContent = options[currQuest][j][1];
      optB.addEventListener('click', function () {
          recChoice(false, j);
      });
      optDiv.appendChild(optB);

      quizCont.appendChild(optDiv);
    }
  }

  function recChoice(choice, opt) {
    const char = currQuest % 4; 
    ans[char === 0 ? 'E' : char === 1 ? 'S' : char === 2 ? 'T' : 'J'] += choice ? 1 : -1;

    if (choice >= 3){
      return;
    }
    if (opt != currOpt){
      currOpt = opt;
      choicesMade++;
      currQuest++;
    }

    if (currQuest < nar.length) {
      currQuest++;
        dispQuest();
    } else {
        rsltPg();
    }
    dispQuest();
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