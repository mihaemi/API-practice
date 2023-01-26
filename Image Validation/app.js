const formUpload  = document.querySelector('#form-upload')
const inputFile   = document.querySelector('#form-upload input')
const previewImg  = document.querySelector('#form-upload img')

let model = null

cocoSsd.load().then(loadedModel => {
    model = loadedModel
})
const onUpload = (e) => {
    console.dir(inputFile)
    // 1. get the file info
    let fileInfo = inputFile.files[0]

    // 2. convert to address
    let url = URL.createObjectURL(fileInfo)

    // 3. put the address into the image.src attribute
    previewImg.src = url

    // 4. show the image element
    previewImg.style.display = 'inline-block'

    // 5. detect objects in our image
    setTimeout(()=> {
        previewImg.width = previewImg.offsetWidth
        previewImg.height = previewImg.offsetHeight
        model.detect(previewImg).then(predictions => {
        console.log('Predictions:', predictions)
        for(let i=0;i<predictions.length;i++) {
            if(predictions[i].class==="cat" && predictions[i].score>=0.5) {
                alert('This image upload was cancelled cause it contains CATS!)')
            }
        }
    })
    }, 500)
    
}

inputFile.addEventListener('change', onUpload)



/*

    image.jpg  --> input ------> File{} ----->MEMORY
                                    |           |
                                    |           |
                                    |           |
                URL.createObjectURL( )          |
                                                |
                                                |
        url <-----------------------------------




*/