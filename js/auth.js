function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("تم تسجيل الدخول:", userCredential.user.email);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("خطأ:", error.message);
      alert("خطأ في تسجيل الدخول: " + error.message);
    });
}

function logoutUser() {
  auth.signOut().then(() => {
    console.log("تم تسجيل الخروج");
    window.location.href = "login.html";
  });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("المستخدم:", user.email);
    document.getElementById('userEmail')?.textContent = user.email;
    document.getElementById('loginBtn')?.classList.add('hidden');
    document.getElementById('logoutBtn')?.classList.remove('hidden');
  } else {
    console.log("لا يوجد مستخدم");
    const protectedPages = ['dashboard.html', 'workers.html', 'camps.html'];
    const currentPage = window.location.pathname.split('/').pop();
    if (protectedPages.includes(currentPage)) {
      window.location.href = "login.html";
    }
  }
});
