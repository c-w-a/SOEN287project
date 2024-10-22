document.getElementById('signupForm').onsubmit = function(event) 
{
    event.preventDefault(); // Prevent page reload
    
    
    const email = document.getElementById('email').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    
    localStorage.setItem('email', email);
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('address', address);
    localStorage.setItem('password', password);
    localStorage.setItem('phone', phone);
    
    window.location.href = 'homepage.html';
  }
