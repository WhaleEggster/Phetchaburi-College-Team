// Function to load YAML file asynchronously
function loadYAMLFile(file, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(null, xhr.responseText);
      } else {
        callback(xhr.status);
      }
    }
  };
  xhr.open("GET", file, true);
  xhr.send();
}

// Function to change language based on ID (farel or qashid)
function changeLanguage(language) {
  // Load YAML file
  loadYAMLFile('data.yml', function (err, data) {
    if (err) {
      console.error('Failed to load YAML file');
      return;
    }
    
    // Parse YAML data
    try {
      var id = localStorage.getItem('nama') || 'farel';
      var yamlData = jsyaml.load(data);
      var profil = yamlData[id].picture;
      var rp = yamlData[id].rpm;
      console.log(id, language);

      // Access nested structure based on ID
      var profileContent = yamlData[language][id].content;
      var name = yamlData[language][id].name; 
      var student = yamlData[language][id].student;
      var storyTelling = yamlData[language][id].storyTelling;
      var rupiahPertama = yamlData[language][id].rupiahPertama;

      
      // Update UI with language-specific text
      document.getElementById('lang').textContent = language.toUpperCase();
      console.log(profil, profileContent, storyTelling, rupiahPertama);
      document.getElementById('name').textContent = name;
      document.getElementById('student').textContent = student;
      document.getElementById('gambar').src = profil;
      document.getElementById('rupiah').src = rp;
      document.getElementById('profile-content').textContent = profileContent;
      document.getElementById('story-telling').textContent = storyTelling;
      document.getElementById('rupiah-pertama').textContent = rupiahPertama;
    } catch (e) {
      console.error('Error parsing YAML:', e);
    }
  });
}

function clickMe(){
  var data = localStorage.getItem('nama') || 'farel';
  var lang = localStorage.getItem('language') || 'id';
  console.log('Current nama:', data);
  console.log('Current language:', lang);
  
  if (data == 'farel'){
    console.log('Switching to qashid');
    localStorage.setItem('nama', 'qashid');
  } else {
    console.log('Switching to farel');
    localStorage.setItem('nama', 'farel');
  }
  
  changeLanguage(lang);
}

