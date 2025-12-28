function respondToWidth () {
  const imgInfo = document.querySelector('.ImgRef');
  const content = document.querySelector('.content');
  const body = document.querySelector('body');

  if(body.clientWidth <= 500) {
    imgInfo.style.display = 'none'
    content.style.width = '100%'
  } else{
    imgInfo.style.display = 'grid'
    content.style.width ='100%'
  }
}
window.addEventListener('load', respondToWidth)
window.addEventListener('resize', respondToWidth)

const signupViewBtn = document.querySelector('.signupBtn');
const signupDetails = document.querySelector('.SignupCont')