const imgInfo = document.querySelector('.ImgRef');
const signInDetails = document.querySelector('.signInDetails');
const body = document.querySelector('body');
const content = document.querySelector('.content')
const signupViewBtn = document.querySelector('.signupBtn');
const signupDetails = document.querySelector('.SignupCont');
const signInImg = document.querySelector('.signInImg');
const signinBtn = document.querySelector('.signinBtn')
const password = document.querySelector('.SignupPassword');
const confPassword = document.querySelector('.passwordConfirm');
const signin = document.querySelector('.LoginBtn');
const signup = document.querySelector('.getInBtn')

let active = 'signin'

function responsiveUI () {
  const mobileWidth = window.innerWidth <= 550;

  if (active === 'signup'){
    content.style.backgroundColor = 'grey';
    signInDetails.style.display = 'none';
    signupDetails.style.display = 'grid';
    if (mobileWidth) {
      content.style.display = 'none';
      imgInfo.style.display = 'grid';
      imgInfo.style.width ='100%'
    } else {
      content.style.display = 'grid';
      imgInfo.style.display = 'grid';
    }
  } else {
    signupDetails.style.display = 'none';
    signInDetails.style.display = 'grid';
    content.style.backgroundColor = 'rgb(2, 2, 51)';
    if (mobileWidth) {
      imgInfo.style.display = 'none';
      content.style.display = 'grid';
      content.style.width = '100%'
    } else {
      content.style.display = 'grid';
      imgInfo.style.display = 'grid';
    }
  }
}

function confirmPassword() {
  if(password.value === confPassword){
    return;
  }else{ alert(new Error("Your passwords doesn't match"))}
}

signupViewBtn.addEventListener('click', () => {
  active = 'signup'
  content.style.backgroundColor = 'grey';
  signInDetails.style.display = 'none'
  signupDetails.style.display = 'grid'
  signInImg.style.display ='none'
  responsiveUI
})

signinBtn.addEventListener('click', ()=> {
  active = 'signin';
  signupDetails.style.display = 'none';
  signInDetails.style.display = 'grid';
  content.style.backgroundColor = 'rgb(2, 2, 51)';
  responsiveUI
})

signup.addEventListener('click', confirmPassword);

responsiveUI
window.addEventListener('load', responsiveUI);
window.addEventListener('resize', responsiveUI);