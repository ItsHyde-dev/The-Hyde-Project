function authenticate({ email, password }: { email: string, password: string }) {

  if (
    !validateEmail(email) ||
    !validatePassword(password)
  ) return false

  // currently hardcoding
  // call api for authentication
  if (
    email.trim() != "heyitshyde@gmail.com" ||
    password.trim() != "Pass@123"
  ) return false

  // set the token in the local storage

  let token = ""
  setToken(token)

  return true;
}


function setToken(token: string) {
  "use client"
  localStorage.setItem("token", token)
  localStorage.setItem("isLoggedIn", "true")
}

function validateEmail(email: string) {
  return true;
}

function validatePassword(password: string) {
  return true;
}

export { authenticate }
