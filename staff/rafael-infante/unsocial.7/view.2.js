function buildHeader(className, imageSrc, imageClass) {
  var compo = new Compo(document.createElement('header'))
  compo.container.classList.add(className)

  var image = document.createElement('img')
  image.src = imageSrc
  image.classList.add(imageClass)
  compo.container.appendChild(image)

  var title = document.createElement('h1')
  title.innerText = 'unSocial'
  compo.container.appendChild(title)

  return compo
}

function buildLoginSection() {

  var compo = new Compo(document.createElement('section'))
  compo.container.classList.add('section-container')

  var paragraph = document.createElement('p')
  paragraph.innerText = 'Welcome !'
  compo.container.appendChild(paragraph)

  var title = document.createElement('h2')
  title.innerText = 'Sign in to unSocial'
  compo.container.appendChild(title)

  var text = document.createElement('h4')
  text.innerText = 'Write username and password to access'
  compo.container.appendChild(text)

  var form = (new Form('form-container'))
  compo.add(form)

  form.add(new Label('login-user', 'User name'))
  var usernameInput = new Input('login-user', 'text', 'Enter your user name', true)
  form.add(usernameInput)

  form.add(new Label('login-password', 'Password'))
  var passwordInput = new Input('login-password', 'password', 'Enter your password', true)
  form.add(passwordInput)


  var submitButton = new Button('btn-login', 'submit', 'Login')
  form.add(submitButton)

  var anchorText = document.createElement('p')
  anchorText.innerText = "Don't have an account? "
  compo.container.appendChild(anchorText)

  var registerLink = document.createElement('a')
  registerLink.innerText = "Register"
  anchorText.appendChild(registerLink)

  // var passwordInputContainer = document.createElement('div')
  // var passwordIcon = document.createElement('i')
  // var passwordInput = document.createElement('input')
  //form.appendChild(passwordInputContainer)
  //passwordInputContainer.classList.add('password-container')
  //passwordInputContainer.appendChild(passwordInput)
  //passwordInputContainer.appendChild(passwordIcon)
  // passwordIcon.classList.add('far')
  // passwordIcon.classList.add('fa-eye')
  // passwordIcon.id = 'icon'
  // var isVisible = false
  // passwordIcon.addEventListener('click', function (event) {
  //   passwordIcon.classList.toggle('fa-eye-slash')
  //   if (!isVisible) {
  //     passwordInput.type = 'text'
  //     isVisible = true
  //   } else {
  //     passwordInput.type = 'password'
  //     isVisible = false
  //   }
  // })

  // Send user to register section when clicking on register link
  registerLink.addEventListener('click', function (event) {
    event.preventDefault()
    compo.remove()
    var registerSection = buildRegisterSection()
    body.add(registerSection)
  })
  // actions when submitting the login Form
  form.container.addEventListener('submit', function (event) {
    event.preventDefault()

    var username = usernameInput.getValue()
    var password = passwordInput.getValue()

    try {
      loggedUser = authenticateUser(username, password)
      form.container.reset()
      compo.remove()
      var homeSection = buildHomeSection()
      body.add(homeSection)
    }
    catch (error) {
      passwordInput.setValue('')
      alert(error.message)
      console.error(error)
    }
  })

  return compo
}

function buildRegisterSection() {
  var compo = new Compo(document.createElement('section'))
  compo.container.classList.add('section-container')

  var title = document.createElement('h2')
  title.id = 'register-title'
  title.innerText = 'Register to unSocial'
  compo.container.appendChild(title)

  var form = new Form('form-container')
  compo.add(form)

  form.add(new Label('name', 'Name'))
  var nameInput = new Input('name', 'text', 'Enter your name', true)
  form.add(nameInput)

  form.add(new Label('email', 'Email'))
  var emailInput = new Input('email', 'email', 'Enter your email', true)
  form.add(emailInput)

  form.add(new Label('username', 'User name'))
  var usernameInput = new Input('username', 'text', 'Enter your user name', true)
  form.add(usernameInput)

  form.add(new Label('password', 'Password'))
  var passwordInput = new Input('password', 'password', 'Enter your password', true)
  form.add(passwordInput)

  form.add(new Label('confirm-password', 'Confirm password'))
  var confirmpasswordInput = new Input('confirm-password', 'password', 'Confirm your password', true)
  form.add(confirmpasswordInput)

  var registerButton = new Button('btn-register', 'submit', 'Register')
  form.add(registerButton)

  var registerAnchorText = document.createElement('p')
  registerAnchorText.innerText = 'Already have an account? '
  compo.container.appendChild(registerAnchorText)

  var registerLoginLink = document.createElement('a')
  registerLoginLink.id = 'loginAnchor'
  registerLoginLink.innerText = 'Login'
  registerAnchorText.appendChild(registerLoginLink)

  registerLoginLink.addEventListener('click', function (event) {
    event.preventDefault();
    compo.remove()
    body.add(loginSection)
  })
  // Save data of new user when clicking on register button
  form.container.addEventListener('submit', function (event) {
    event.preventDefault()
    var name = nameInput.getValue()
    var email = emailInput.getValue()
    var username = usernameInput.getValue()
    var password = passwordInput.getValue()
    var confirmPassword = confirmpasswordInput.getValue()

    try {
      registerUser(name, email, username, password, confirmPassword)
      form.reset()
      compo.remove()
      body.add(loginSection)
    }
    catch (error) {
      alert(error.message)
      console.error(error)
    }
  })

  return compo
}

function buildHomeSection() {
  var compo = new Compo(document.createElement('section'))

  compo.container.id = 'home'
  compo.container.classList.add('section-container')

  var title = document.createElement('h2')
  title.innerText = 'Home'
  compo.container.appendChild(title)

  var text = document.createElement('h3')
  text.innerText = 'Hello, ' + loggedUser.name + '!'
  compo.container.appendChild(text)

  var image = document.createElement('img')
  image.style.height = '300px'
  image.src = '/staff/rafael-infante/unsocial/images/boy.png'
  compo.container.appendChild(image)

  var logoutButton = new Button('btn.logout', 'submit', 'Logout')
  compo.add(logoutButton)

  // Functionality of logout button
  logoutButton.container.addEventListener('click', function (event) {
    var condition = prompt('Are you sure? (y/n)')
    if (condition === 'y') {
      event.preventDefault()
      loggedUser = null
      compo.remove()
      body.add(loginSection)
    }
  })
  return compo
}