console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('.location')
const search = document.querySelector('#locationFormInput')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location);

    messageOne.innerHTML = `<div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>`
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            console.log(data);
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})