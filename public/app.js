var app = function() {
  var url = 'http://hp-api.herokuapp.com/api/characters';
  var request = new XMLHttpRequest();
  request.open('GET', url);

  request.addEventListener('load', function() {
    var wizardsData = JSON.parse(request.responseText);
    renderDropDown(wizardsData);
  });

  request.send();
};

var renderList = function(wizardsObjects) {
  var mainDiv = document.getElementById('main');
  var list = document.createElement('ul');

  wizardsObjects.forEach(function (wizard) {
    var li = createListItem(wizard);
    list.appendChild(li);
  });

  mainDiv.appendChild(list);
};

var createListItem = function (wizardObject) {
  var li = document.createElement('li');
  li.innerText = wizardObject.name;
  var img = createImage(wizardObject);
  li.appendChild(img);
  var detailsList = createDetailsList(wizardObject);
  li.appendChild(detailsList);
  return li;
};

var createImage = function (wizard) {
  var image = document.createElement('img');
  image.src = wizard.image;
  image.alt = wizard.name;
  return image;
};

// Details List to show up

var createDetailsList = function (wizardObject) {
  var list = document.createElement('ul');
  var details = combineDetails(wizardObject);

  details.forEach(function (detailString) {
    var listItem = document.createElement('li');
    listItem.innerText = detailString;
    list.appendChild(listItem);
  });
  return list;
};

var combineDetails = function (character) {
  var genders = character.gender;
  var houses = character.house;
  // var dateOfBirths = character.dateOfBirth;
  // var alives = character.alive;
  // var hogwartsStudents = character.hogwartsStudent;
  // var hogwartsStaffs = character.hogwartsStaff;
  var combinedDetails = genders.concat(houses);

  var detailNameStrings = combinedDetails.map(function (detail) {
    return detail.name;
  });

  detailNameStrings.push(wizard.ancestry);
  var uniqueNames = removeDuplicates(detailNameStrings);
  return uniqueNames;
}

var removeDuplicates = function (details) {
  var uniqueDetails = details.filter(function (detail, currentIndex) {
    var firstIndexOfdetail = details.indexOf(detail);

    // full with if statement
    var firstOccurence;
    if (firstIndexOfdetail === currentIndex) {
      firstOccurence = true
    }
    else {
      firstOccurence = false
    }
    return firstOccurence;

    // shortcut - assign condition result directly
    var firstOccurence = (firstIndexOfdetail === currentIndex);
    return firstOccurence;

    // extra shortcut - return condition result directly without assigning
    return firstIndexOfdetail === currentIndex;
  });
  return uniqueDetails;
}

var renderDropDown = function (wizardsData) {
  var dropDown = createDropDown(wizardsData);
  var mainDiv = document.getElementById('main');

  mainDiv.appendChild(dropDown);
}

var createDropDown = function (wizards) {
  var select = document.createElement('select');

  var defaultOption = document.createElement('option');
  defaultOption.innerText = 'Select a wizard';
  defaultOption.value = -1;
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  wizards.forEach(function (wizardObject, index) {
    var optionTag = createOptionTag(wizardObject.name, index);
    select.appendChild(optionTag)
  });
  select.addEventListener('change', function (event) {
    var selectedIndex = event.target.value;
    selectWizard(wizards, selectedIndex);
  });
  return select;
}

var createOptionTag = function (text, index) {
  var option = document.createElement('option');
  option.innerText = text;
  option.value = index;
  return option;
}

var selectWizard = function (wizards, selectedIndex) {
  var wizardObject = wizards[selectedIndex];
  var wizardElement = createListItem(wizardObject);
  renderSingleWizard(wizardElement);
}

var renderSingleWizard = function (wizardElement) {
  var mainDiv = document.getElementById('main');

  var existingWizardListItem = document.querySelector('li');
  if (existingWizardListItem !== null) {
    mainDiv.removeChild(existingWizardListItem);
  }

  mainDiv.appendChild(wizardElement);
}

window.addEventListener('load', app);

