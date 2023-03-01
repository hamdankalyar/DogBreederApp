const BREED_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector('.breeds');
const div = document.querySelector('.doggos');
const img = document.querySelector('.dog-img');
const loadingSpinner = document.getElementById("loading-spinner");
const toggleButton = document.querySelector('.dark-mode-toggle');
// Fetch the breed list and populate the select element
fetch(BREED_URL)
  .then(response => response.json())
  .then(data => {
    const breedArray = Object.keys(data.message);
    breedArray.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed;
      option.innerText = breed;
      select.appendChild(option);
    });
  })
  .catch(error => console.log(error));

// Listen for changes on the select element and update the dog image
select.addEventListener('change', function(event) {
  const selectedBreed = event.target.value;
  const url = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;
  getDogImage(url);
});

// Retrieve a random dog image from the API and display it
function getDogImage(url) {
  loadingSpinner.style.display = "block";
  img.style.display = "none";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      img.src = data.message;
    })
    .catch(error => console.log(error))
    .finally(() => {
      img.addEventListener('load', function() {
        loadingSpinner.style.display = "none";
        img.style.display = "block";
      });
    });
}

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
