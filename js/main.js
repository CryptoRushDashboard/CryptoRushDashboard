// config
var baseUrl = 'http://localhost:3000'
var transaction = {}
var paymentTimer = null


// Mobile menu
var mobileToggle = document.getElementById('mobile-toggle')

mobileToggle.addEventListener("click", function() {
    document.body.classList.toggle('open')
})

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}


// Payment form
var checkDiscountCode = debounce((transactionId, discountCode) => {
    discountCode = discountCode.replace(' ', '')
    axios.get(baseUrl+'/payment/discount/'+transactionId+'/'+discountCode)
    .then((res) => {
        if (res.data.isValid) {
            document.querySelector('.discount-error').style.display = 'none'
            updatePaymentFrame(transactionId, res.data.amount)
        } else {
            document.querySelector('.discount-error').style.display = 'block'
        }
    })
    .catch((err) => {
        console.log(err)
    })
}, 1000)

var updateEmail = (transactionId, email) => {
    axios.post(baseUrl+'/payment/email/'+transactionId, { email: email })
    .then((res) => {
    })
    .catch((err) => {
        console.log(err)
    })
}

var updatePaymentFrame = function(transactionId, amount) {
    var paymentContainer = document.getElementById('payment-address-container')
    paymentContainer.innerHTML = '<iframe src="https://klukt.com/w/a6eage6yew/'+transactionId+'/'+amount+'/BTC" scrolling="" frameborder="0" style="border:none;border-radius:5px;" width=240 height=300/>'
}

var checkForPayment = function(transactionId) {
    axios.get(baseUrl + '/payment/'+transactionId)
    .then((res) => {
        if (res.data.status == 'failed') {
            clearInterval(paymentTimer)
            document.getElementById('BuyForm').style.display = 'none'
            document.getElementById('PaymentFail').style.display = 'block'
        }
        else if (res.data.status == 'completed') {
            clearInterval(paymentTimer)
            document.getElementById('activation-code').innerHTML = res.data.license
            document.getElementById('BuyForm').style.display = 'none'
            document.getElementById('PaymentSuccess').style.display = 'block'
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

var initPayment = function(modalId) {
    showModal(modalId)
    axios.post(baseUrl + '/payment')
    .then((res) => {
        transaction = res.data
        updatePaymentFrame(res.data._id, res.data.amount)
        paymentTimer = setInterval(() => checkForPayment(res.data._id), 2000)
    })
    .catch((err) => {
        console.log(err)
    })
}

document.querySelector('#BuyModal input[name=discount]').addEventListener("keyup", function(e) {
    checkDiscountCode(transaction._id, e.target.value)
})

document.querySelector('#BuyModal input[name=email]').addEventListener("blur", function(e) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(e.target.value)) {
        document.querySelector('.email-error').style.display = 'block'
    } else {
        document.querySelector('.email-error').style.display = 'none'
        updateEmail(transaction._id, e.target.value)
    }
})


// Modals
var showModal = function(modalId) {
    modalId.style.visibility = 'visible'
    modalId.style.opacity = 1
    document.getElementsByTagName("body")[0].style.overflow = "hidden"
}
var hideModal = function(modalId) {
    modalId.style.opacity = 0
    modalId.style.visibility = 'hidden'
    document.getElementsByTagName("body")[0].style.overflow = "visible"
}

var demoBtn         = document.getElementById('demo')
var demoBannerBtn   = document.getElementById('demoBanner')
var demoModal       = document.getElementById('DemoModal')
var closeDemoModal  = document.getElementById('CloseDemoModal')

demoBtn.addEventListener("click", () => showModal(demoModal))
demoBannerBtn.addEventListener("click", () => showModal(demoModal))
closeDemoModal.addEventListener("click", () => hideModal(demoModal))


var buyBtn         = document.getElementById('buy')
var buyBannerBtn   = document.getElementById('buyBanner')
var buyModal       = document.getElementById('BuyModal')
var closeBuyModal  = document.getElementById('CloseBuyModal')

buyBtn.addEventListener("click", () => initPayment(buyModal))
buyBannerBtn.addEventListener("click", () => initPayment(buyModal))
closeBuyModal.addEventListener("click", () => hideModal(buyModal))

