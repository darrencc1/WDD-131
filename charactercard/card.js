// Object with properties and methods.
//Properties: name, class, level, health, image,
// methods: attacked() -20 heath and levelUp() +1 to level property value. 

//
const characterImage = document.querySelector("#characterImage");
const characterName = document.querySelector("#characterName");
const characterClass = document.querySelector("#characterClass");
const characterLevel = document.querySelector("#characterLevel");
const characterHealth = document.querySelector("#characterHealth");
const attackButton = document.querySelector("#attackButton");
const levelButton = document.querySelector("#levelButton");


let characterCard = {
  name: "Snortleblat",
  class: "Swamp Beast Diplomat",
  level: 1,
  health: 80,
  image: "snortleblat.webp",

  attacked: function() {
    this.health -= 20;

    if (this.health <= 0) {
      this.health = 0;
      alert("Character Died");
    }
  },

  levelUp: function() {
    this.level += 1;
  }
};



function displayCharacter() {
  characterImage.src = characterCard.image;
  characterName.textContent = characterCard.name;
  characterClass.textContent = characterCard.class;
  characterLevel.textContent = characterCard.level;
  characterHealth.textContent = characterCard.health;
}

attackButton.addEventListener("click", function() {
  characterCard.attacked();
  displayCharacter();
});

levelButton.addEventListener("click", function() {
  characterCard.levelUp();
  displayCharacter();
});

displayCharacter();