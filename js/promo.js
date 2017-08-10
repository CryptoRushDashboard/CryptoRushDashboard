// var baseUrl = 'http://localhost:3000'
var baseUrl = 'http://104.131.11.223'

var generateBtn = document.getElementById('generateCodeBtn')

var GenerateCodeDiv = document.getElementById('GenerateCode')
var LoadingCodeDiv  = document.getElementById('LoadingCode')
var DisplayCodeDiv  = document.getElementById('DisplayCode')
var ErrorCodeDiv    = document.getElementById('ErrorCode')

generateBtn.addEventListener("click", function(e) {
    GenerateCodeDiv.style.display = 'none'
    LoadingCodeDiv.style.display = 'block'

    axios.post(baseUrl+'/license/demo')
    .then((res) => {
        document.getElementById('activation-code').innerHTML = res.data.product_key
        LoadingCodeDiv.style.display = 'none'
        DisplayCodeDiv.style.display = 'block'
    })
    .catch((err) => {
        console.log(err)
        LoadingCodeDiv.style.display = 'none'
        ErrorCodeDiv.style.display = 'block'
    })
})
