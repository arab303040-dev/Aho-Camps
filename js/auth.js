function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      console.log("تم تسجيل الدخول:", userCredential.user.email);
      window.location.href = "dashboard.html";
    })
    .catch(function(error) {
      console.error("خطأ:", error.message);
      alert("خطأ في تسجيل الدخول: " + error.message);
    });
}

function logoutUser() {
  auth.signOut().then(function() {
    console.log("تم تسجيل الخروج");
    window.location.href = "login.html";
  });
}

auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log("المستخدم:", user.email);
    var emailElement = document.getElementById('userEmail');
    var loginButton = document.getElementById('loginBtn');
    var logoutButton = document.getElementById('logoutBtn');
    if (emailElement) emailElement.textContent = user.email;
    if (loginButton) loginButton.classList.add('hidden');
    if (logoutButton) logoutButton.classList.remove('hidden');
  } else {
    console.log("لا يوجد مستخدم");
    var protectedPages = ['dashboard.html', 'workers.html', 'camps.html'];
    var currentPage = window.location.pathname.split('/').pop();
    if (protectedPages.indexOf(currentPage) !== -1) {
      window.location.href = "login.html";
    }
  }
});
