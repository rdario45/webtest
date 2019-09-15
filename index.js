// asking for GitHub username
var user = prompt('Please enter your github username.');

// show username 
const usernameElement =  document.querySelector('#username')
const usernameText = document.createTextNode(user)
usernameElement.appendChild(usernameText)

var r = new XMLHttpRequest();

var promise = new Promise(function(resolve, reject) {
  try {
    r.open("GET", `https://api.github.com/users/${user}/repos`, true)
    r.onreadystatechange = function () {    
      if (r.readyState != 4 || r.status != 200) return;
      resolve(r);
    };
    r.send()
  } catch(e) {
    reject(Error("It broke"));
  }
})

var ul = document.querySelector('#bebe')

var promiseNames = promise
.then( xhr => JSON.parse(xhr.response))
.then( json => json.map(obj=> obj.name))
.then( names => {  
  // show total repos 
  const total =  document.querySelector('#total')
  const textTotal = document.createTextNode("= "+names.length)
  total.appendChild(textTotal)

  if(names.length > 0) {
    // remove no items li
    const noItem = document.querySelector('#no_items')    
    ul.removeChild(noItem);

    // add repos names as li
     names.forEach(n => {
      const li = document.createElement("LI")
      const textName = document.createTextNode(n)
      li.appendChild(textName)
      ul.appendChild(li)
    });
  }
})
