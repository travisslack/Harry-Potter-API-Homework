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
  });

  select.addEventListener('change', function (event) {
    var index = this.value;
    var wizard = wizards[index];

    updateInfo(wizard);

    var jsonString = JSON.stringify(wizard);
    localStorage.setItem('selectedWizard', jsonString);
  });
}

