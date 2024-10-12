
window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;

  // Selecting navigation links
  let homeLink = document.querySelector('.navbar-nav .home'); // Ensure to use the correct selector for the home link
  let aboutLink = document.querySelector('a[href="#about"]');
  let skillsLink = document.querySelector('a[href="#skills"]'); // Change this to the correct section ID
  let worksLink = document.querySelector('a[href="#works"]'); // Change this to the correct section ID
  let contactLink = document.querySelector('a[href="#contact"]'); // Change this to the correct section ID

  let allLinks = document.querySelectorAll('.navbar-nav a');

  // Selecting sections
  let homeSection = document.querySelector("section.landing"); // Ensure this matches your HTML structure
  let aboutSection = document.querySelector("section.about");
  let skillsSection = document.querySelector("section.skills");
  let worksSection = document.querySelector("section.works");
  let contactSection = document.querySelector("section.contact");

  // Check which section is in view and update the active class
  if (isElementInViewport(homeSection)) {
      updateActiveLink(homeLink);
  } else if (isElementInViewport(aboutSection)) {
      updateActiveLink(aboutLink);
  } else if (isElementInViewport(skillsSection)) {
      updateActiveLink(skillsLink);
  } else if (isElementInViewport(worksSection)) {
      updateActiveLink(worksLink);
  } else if (isElementInViewport(contactSection)) {
      updateActiveLink(contactLink);
  } else {
      // Optionally handle if none of the sections are active
      allLinks.forEach(link => link.classList.remove('active'));
  }
});

// Helper function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to update the active link
function updateActiveLink(activeLink) {
  const allLinks = document.querySelectorAll('.navbar-nav a');
  allLinks.forEach(link => link.classList.remove('active'));
  activeLink.classList.add('active');
}


// =====================================================================================
// =====================================================================================


// Start Contact
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from reloading the page

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Validate form fields
  if (name === '' || email === '' || message === '') {
    document.getElementById('responseMessage').innerHTML = '<div class="alert alert-danger">Please fill out all fields.</div>';
    return;
  }

  // Prepare the EmailJS template params
  const data = {
    service_id: 'service_a89uw4i',
    template_id: 'template_qd20bgq',
    user_id: 'XMZhQ6sT_4ak6-0KJ',
    template_params: {
      name: name,
      email: email,
      message: message,
      subject: 'test subject'
    }
  };

  // Send the email using fetch() as a POST request
  fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text()) // Read the response as text
  .then(responseText => {
    if (responseText === 'OK') {
      // Success message
      document.getElementById('responseMessage').innerHTML = '<div class="alert alert-success">Thank you, ' + name + '! Your message has been sent successfully.</div>';
      document.getElementById('contactForm').reset(); // Clear form
    } else {
      throw new Error('Oops! Something went wrong. Please try again later.');
    }
  })
  .catch(error => {
    // Error message
    document.getElementById('responseMessage').innerHTML = '<div class="alert alert-danger">' + error.message + '</div>';
  });
});

// End Contact
