function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.update(tabs[0].id, {url: url});
  });
}

function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({
  description: 'dissue: Search the Drupal issue for %s'
  });
}

function removeProjectName(arr, value) {
  for (b in arr ){
    if (arr[b] == value){
      arr.splice(b,1);
      break;
    }
  }
  return arr;
}

chrome.omnibox.onInputEntered.addListener(function(text) {
  var keyword = text.split(' ');
  var project_name = keyword[0];
  var keyword_array = removeProjectName(keyword, project_name);
  var additional_strings = keyword_array.join('+');
  navigate("https://drupal.org/project/issues/" + project_name + "?text=" + additional_strings + "&status=All");
});

resetDefaultSuggestion();
