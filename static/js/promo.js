var baseUrl = 'https://api.getcryptostorm.com'
// var baseUrl = 'http://localhost:3000'

var generateBtn = document.getElementById('generateCodeBtn')

var GenerateCodeDiv = document.getElementById('GenerateCode')
var LoadingCodeDiv  = document.getElementById('LoadingCode')
var DisplayCodeDiv  = document.getElementById('DisplayCode')
var ErrorCodeDiv    = document.getElementById('ErrorCode')

generateBtn.addEventListener("click", function(e) {
    e.preventDefault()

    var email = document.querySelector('input[name=email]').value

    if (email == "") {
        document.querySelector('.email-error').style.display = 'block'
    } else {
        axios.post(baseUrl+'/license/trial', { email: email })
        .then((res) => {
            GenerateCodeDiv.style.display = 'none'
            LoadingCodeDiv.style.display = 'block'

            document.getElementById('activation-code').innerHTML = res.data.product_key
            document.getElementById("code-expiry").innerHTML = new Date(res.data.expires_at)

            LoadingCodeDiv.style.display = 'none'
            DisplayCodeDiv.style.display = 'block'
        })
        .catch((err) => {
            console.log(err)
            LoadingCodeDiv.style.display = 'none'
            ErrorCodeDiv.style.display = 'block'
        })
    }
})
