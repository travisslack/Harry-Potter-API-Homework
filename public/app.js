window.addEventListener('load', funciton() {
  var url = 'http://hp-api.herokuapp.com/api/characters';

  makeRequest(url, function() {
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var wizards = JSON.parse(jsonString);
    render(wizards);
  })
})