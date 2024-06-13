const backgroundColors = [
  '#efebe8', '#faf9f9', '#eaeae9', '#e5f2ed', '#efdfdf',
  '#e6e2db', '#faf9f9', '#D5D5C4', '#FAF5EB', '#F2E9CF',
  '#fceede', '#f4f4f6', '#fcece0', '#fafafa', '#ffffff', '#ECECE4'
];

const textColors = [
  '#333333', '#747474', '#635f59', '#bf4c17', '#b04133',
  '#a64b19', '#434c38', '#283d34', '#0e4144', '#324441',
  '#004e35', '#dd9221', '#f1865b', '#f8ab28', '#e7a84e',
  '#383860', '#2f2d3f', '#233946', '#0e4150', '#704d68',
  '#42273e', '#d85b52', '#b53329', '#873734', '#e53b3f',
  '#9c2c1d', '#9e1922', '#e61d40'
];

const ideaBody = document.querySelector("#idea-body");
const button = document.querySelector("#idea-btn");
const svgs = document.querySelectorAll("svg");
let rotation = 360;
let ideas = [];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function loadRandomIdea() {
  if (ideas.length === 0) return;
  
  const randomIdea = getRandomElement(ideas);
  const bgColor = getRandomElement(backgroundColors);
  const textColor = getRandomElement(textColors);

  document.body.style.backgroundColor = bgColor;
  document.body.style.color = textColor;
  document.body.style.transition = "0.3s";

  button.style.transform = `rotate(${rotation}deg)`;
  rotation += 360;

  svgs.forEach(svg => {
    svg.style.fill = textColor;
    svg.style.transition = "0.3s";
  });

  ideaBody.innerHTML = `
    <h1 class="idea-name">${randomIdea.name} App</h1>
    <div id="idea-info" class="infobox">
      <p id="idea">${randomIdea.info}</p>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('ideas.json')
    .then(response => response.json())
    .then(data => {
      ideas = data;
      loadRandomIdea();
      button.addEventListener("click", loadRandomIdea);
      setTimeout(() => location.reload(true), 15000);
    })
    .catch(error => console.error('Error fetching ideas:', error));
});