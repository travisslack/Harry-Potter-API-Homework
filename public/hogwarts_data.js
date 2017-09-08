var HogwartsData = function(url) {
  this.url = url;
  this.wizards = [];
}

HogwartsData.prototype.getData = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', this.url)
}