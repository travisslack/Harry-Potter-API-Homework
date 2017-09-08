window.addEventListener('load', function() {
  
  var url = 'http://hp-api.herokuapp.com/api/characters';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.addEventListener('load', function() {
    var wizardsData = JSON.parse(xhr.xhrText);
    renderList(wizardsData);
  })

  



})

