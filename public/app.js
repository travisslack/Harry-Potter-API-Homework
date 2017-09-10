window.addEventListener('load', function () {
  var url = 'http://hp-api.herokuapp.com/api/characters';

  makeRequest(url, function() {
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var wizards = JSON.parse(jsonString);
    render(wizards);
  });
});

var makeRequest = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', callback);
  xhr.send();
}


var render = function (wizards) {
  var storedWizard = localStorage.getItem('selectedWizard');
  var wizardToDisplay = null;

  if (storedWizard) {
    wizardToDisplay = JSON.parse(storedWizard);
    var select = document.querySelector('#wizards');
    select.selectedIndex = wizardToDisplay.index;
  }
  else {
    wizardToDisplay = wizards[0];
  }

  populateSelect(wizards);
  updateInfo(wizardToDisplay);
}

var populateSelect = function (wizards) {
  var select = document.getElementById('wizards');

  wizards.forEach(function (item, index) {
    item.index = index;
    var option = document.createElement('option');
    option.value = index;
    option.text = item.name;
    select.appendChild(option);
    // var img = createImage(wizardObject);
    // option.appendChild(img);
  });

  select.addEventListener('change', function (event) {
    var index = this.value;
    var wizard = wizards[index];

    updateInfo(wizard);

    var jsonString = JSON.stringify(wizard);
    localStorage.setItem('selectedWizard', jsonString);
  });
}

// var createImage = function (wizard) {
//   var image = document.createElement('img');
//   image.src = wizard.image;
//   image.alt = wizard.name;
//   return image;
// };


var updateInfo = function (wizard) {
  var pTags = document.querySelectorAll('#info p');
  pTags[0].innerText = wizard.species;
  pTags[1].innerText = wizard.gender;
  pTags[2].innerText = wizard.house;
  pTags[3].innerText = wizard.dateOfBirth;
  pTags[4].innerText = wizard.ancestry;
  pTags[5].innerText = wizard.patronus;
  pTags[6].innerText = wizard.hogwartsStudent;
  pTags[7].innerText = wizard.hogwartsStaff;
  pTags[8].innerText = wizard.alive;



  request.addEventListener('load', function() {
    loadWizardCharts(request.responseText);
  });


  var loadWizardCharts = function(responseText) {
    var wizards = JSON.parse(responseText);


    var wizardancestryLabels = wizards.reduce(function(labels, wizard){
      return labels.includes(wizard.ancestry) ? labels : labels.concat(wizard.ancestry)
    },[])

    var wizardAncestryData = {
    name: "Number of Countries",
    data: []
  };

  wizardAncestryData.data = wizardancestryLabels.map(function(ancestryLabel){
    return wizards.filter(function(wizard) {
      return wizard.ancestry === ancestryLabel 
    }).length
  })
  
  new ColumnChart("Wizards with different Ancestry", wizardAncestryData, wizardancestryLabels);
};

}

