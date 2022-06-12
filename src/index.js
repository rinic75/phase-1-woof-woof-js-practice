document.addEventListener('DOMContentLoaded', ()=> {
  fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => renderDog(dog)))
    
  function renderDog(dog) {
    const dogBar = document.querySelector('#dog-bar')
    const span = document.createElement('span')
    span.textContent = dog.name;
    span.dataset.id = dog.id;
    dogBar.append(span)

    span.addEventListener('click', e => fetchSingleDog(e.target.dataset.id))
        
  }
  
  function fetchSingleDog(id) {
    fetch(`http://localhost:3000/pups/${id}`)
      .then(res => res.json())
      .then(dog => renderMoreInfo(id,dog))
    }

  function renderMoreInfo(id, dog) {
    let newValue
    const dogInfo = document.querySelector('#dog-info')
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const bttn = document.createElement('button')
    dogInfo.innerHTML = ''
    img.src = dog.image
    h2.textContent = dog.name
    if (dog.isGoodDog) {
      bttn.textContent = 'Good Dog!'
    } else {
      bttn.textContent = 'Bad Dog!'
    }
    bttn.addEventListener('click', e => {
      if (e.target.innerHTML === 'Good Dog!') {
        bttn.textContent = 'Bad Dog!'
        newValue = false
        patchDog(id, newValue)
      } else {
        bttn.textContent = 'Good Dog!'
        newValue = true
        patchDog(id, newValue)
      }
    })
    dogInfo.append(img, h2, bttn)

  }

  function patchDog(id, newValue) {
    fetch(`http://localhost:3000/pups/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: newValue
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
    }
})
