const form = document.querySelector('#form-name')
const input = form.children[2].firstElementChild
const output = form.children[3]

form.addEventListener('submit', (e) => {
    e.preventDefault()  // prevents form submission
    // console.log('ok')
    // console.log(e)

    let name = input.value.replace(/\s/g, "")

    if (name.length > 0) {

    // HW1: validate & sanitize the input:
    //      don't send empty requests
    //      remove extra spaces

    // HW2: check when empty response and show a corresponding message
    console.log(name)

    // 1. send request(name) -- > API
    // 2. wait for response(JSON format) <-- API
    // 3. extract data
    // 4. display info


    // AJAX
    const xhr = new XMLHttpRequest()
    xhr.open("GET", `https://api.nationalize.io/?name=${name}`)
    xhr.send()

    xhr.onload = () =>{
        let response = xhr.responseText
        let data = JSON.parse(response)
        
        let nationality = data.country[0].country_id
        console.log(nationality)
            if(nationality !== null) {
                output.innerText = `You are most probably from ${nationality}` 
            } else {
                output.innerText = "Couldn't find a name"
        }
    }
    } else {
        output.innerText = "Enter a name"
    }
    
})

// document.body.addEventListener('keydown', (e) => {
//     e.preventDefault()
// })

// req --> GET https://api.nationalize.io/?name={putNameHere}   (?name=...    - URL query parameters)
// res <-- JSON string

// 1. user - > hits ENTER (input)  'keydown'
// 2. browser listens to this, captures the event
// 3. searches for the FORM the input is in
// 4. emits a 'submit' event on this form