$('.nselect-1').nSelect();



$(".header-bottom__burger").click(function() { 
    $(".header-bottom__menu").toggleClass("flex")
})


$(".header-bottom__item").click(function() { 
    var children = $(this).children();
    $(children).slideToggle()
})

$('#owl-one').owlCarousel({
    loop:true,
    margin:10,
    items: 1,
    dots: false,
})

$('#owl-two').owlCarousel({
    loop:true,
    margin:0,
    items: 1,
    dots: false,
    nav: true,
    navText: ["<i class='fa fa-angle-left shop-view__slider-arrow shop-view__slider-arrow-left'></i>" ,"<i class='fa fa-angle-right shop-view__slider-arrow shop-view__slider-arrow-right'></i>"]
})


$('#password, #password-confirm').on('keyup', function () {
    if ($('#password').val() == $('#password-confirm').val()) {
        $('#password, #password-confirm').css('background', '#58da2347');
    } else 
        $('#password, #password-confirm').css('background', '#ff000047');
        
});


// let radioBtns = document.querySelectorAll("input[type='radio']")
// let checkedBtn = document.querySelector("input[checked]")
// let texts = document.querySelectorAll('.shop-tabs__text')

// checkedBtn.parentNode.style.background = "#333"


// for (let btn of radioBtns){
//     btn.addEventListener('click', function (e){
//         console.log(typeof radioBtns)
//         if (this && checkedBtn != this){
//             this.parentNode.style.background = "#333"
//             checkedBtn.parentNode.style.background = "none"
//             checkedBtn = this
//         }
//     })
// }

let tabs = document.querySelector('.shop-tabs')
let btns = tabs.querySelectorAll('.shop-tabs__tab-container')
let items = tabs.querySelectorAll('.shop-tabs__text')

function change(arr, i) {
	arr.forEach( item => {
		item.forEach( i => {i.classList.remove('is-active')})
		item[i].classList.add('is-active')
	})
}

for(let i = 0; i < btns.length; i++) {
	btns[i].addEventListener('click', () => {
		change([btns, items], i)
	})
}