window.onload = function() 
{
    const email = localStorage.getItem('email');
    const loginstatus = document.getElementById('loginstatus');

    if (email) 
        {
        loginstatus.textContent = 'My Profile';
        loginstatus.onclick = function() 
        {
            window.location.href = 'clientportal.html'; 
        };
    } 
    else
     {
        loginstatus.textContent = 'Log In';
        loginstatus.onclick = function() 
        {
            window.location.href = 'login.html'; 
        };
    }
};
