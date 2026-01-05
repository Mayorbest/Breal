/** UI manipulation with JS */
const imgInfo = document.querySelector('.ImgRef');
const signInDetails = document.querySelector('.signInDetails');
const body = document.querySelector('body');
const content = document.querySelector('.content')
const signupViewBtn = document.querySelector('.signupBtn');
const signupDetails = document.querySelector('.SignupCont');
const signInImg = document.querySelector('.signInImg');
const signinBtn = document.querySelector('.signinBtn')
const SignupPassword = document.querySelector('.SignupPassword')
const confPassword = document.querySelector('.passwordConfirm')
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
  if(SignupPassword.value !== confPassword.value){
    alert("Your passwords doesn't match")
  }
}

signupViewBtn.addEventListener('click', () => {
  active = 'signup'
  imgInfo.style.display = 'grid'
  signInDetails.style.display = 'none';
  signupDetails.style.display = 'grid';
  content.style.backgroundColor = 'grey';
  signInImg.style.display ='none';
  responsiveUI
})

signinBtn.addEventListener('click', ()=> {
  active = 'signin';
  content.style.display = 'grid'
  signInDetails.style.display = 'grid';
  signupDetails.style.display = 'none';
  content.style.backgroundColor = 'rgb(2, 2, 51)';
  responsiveUI
})

signup.addEventListener('click',
  confirmPassword
 );

responsiveUI()
window.addEventListener('load', responsiveUI);
window.addEventListener('resize', responsiveUI);

/** Calling of Backend codes */
const username = document.querySelector('.email').value;
const password = document.querySelector('.password').value;
const fullname = document.querySelector('.fullname').value;
const newUsername = document.querySelector('.newUsername').value;
const newUEmail = document.querySelector('.SignupEmail').value;
const remember = document.querySelector('.rememberMe')

// Client SignUp Auth
async function handleSignUp () {
try{
  const res = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({newUEmail, SignupPassword,
      role: "CLIENT",
      full_name: fullname
    }),
  });

  const data = await res.json();
  if (res.ok) {
    if(remember) {
      localStorage.setItem("client_email", newUEmail);
      localStorage.setItem("client_username", newUsername);
    }
    alert("Signup Sccessfull 😊😎");
    console.log(data);
  } else{alert(data.message || "Signup Failed")}
}catch(err) {
  alert("Error: " + err.message);
}
}

// Client Login Auth
const BrealConfig = {BASE_URL: "/api/v1",
};

async function handleLogin () {
try {
  const res = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email: username, password}),
  })

  const data = await res.json();

  if(res.ok) {
    localStorage.setItem("access_tokden", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    alert("Login sucessful 😁👌");
    console.log(data);
  }else{ alert(data.message || "Login failed 😣😑")}
} catch (err) {
  alert("Error: " + err.message);
}
}
