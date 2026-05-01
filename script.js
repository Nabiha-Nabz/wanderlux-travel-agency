// Mobile menu toggle and active page highlighting
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu
  const menuIcon = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('show');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // Active page highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (currentPage === '' && href === 'index.html') {
      link.classList.add('active');
    }
  });

  // Trip Cost Calculator
  const calcForm = document.getElementById('costCalculatorForm');
  if (calcForm) {
    calcForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const destination = document.getElementById('destination').value;
      const travellers = parseInt(document.getElementById('travellers').value) || 1;
      const days = parseInt(document.getElementById('days').value) || 1;
      const style = document.getElementById('style').value;

      let baseRate = 0;
      if (destination === 'paris') baseRate = 180;
      else if (destination === 'maldives') baseRate = 280;
      else if (destination === 'swiss') baseRate = 210;
      else if (destination === 'tokyo') baseRate = 170;
      else baseRate = 150;

      let styleMultiplier = 1;
      if (style === 'budget') styleMultiplier = 0.8;
      else if (style === 'standard') styleMultiplier = 1.0;
      else if (style === 'luxury') styleMultiplier = 1.8;

      let total = baseRate * travellers * days * styleMultiplier;
      const totalFormatted = total.toFixed(2);
      document.getElementById('estimatedPrice').innerHTML = `🧳 Estimated Total: $${totalFormatted} USD`;
    });
  }

  // Appointment Form Validation
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const date = document.getElementById('date');
      const message = document.getElementById('message');

      document.querySelectorAll('.error-msg').forEach(el => el.remove());

      if (!name.value.trim()) {
        showError(name, 'Full name is required');
        isValid = false;
      }
      if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        showError(email, 'Valid email required');
        isValid = false;
      }
      if (!phone.value.trim()) {
        showError(phone, 'Phone number required');
        isValid = false;
      }
      if (!date.value) {
        showError(date, 'Please select a date');
        isValid = false;
      }
      if (!message.value.trim()) {
        showError(message, 'Message required');
        isValid = false;
      }

      if (isValid) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-msg';
        successDiv.innerHTML = '✓ Appointment request sent! We will contact you soon.';
        appointmentForm.appendChild(successDiv);
        appointmentForm.reset();
        setTimeout(() => successDiv.remove(), 4000);
      }
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contactFormSubmit');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      const conName = document.getElementById('conName');
      const conEmail = document.getElementById('conEmail');
      const conMsg = document.getElementById('conMsg');

      document.querySelectorAll('.error-msg').forEach(el => el.remove());

      if (!conName.value.trim()) {
        showError(conName, 'Name required');
        isValid = false;
      }
      if (!conEmail.value.trim()) {
        showError(conEmail, 'Email required');
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(conEmail.value)) {
        showError(conEmail, 'Valid email required');
        isValid = false;
      }
      if (!conMsg.value.trim()) {
        showError(conMsg, 'Message required');
        isValid = false;
      }

      if (isValid) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-msg';
        successDiv.innerHTML = '✓ Message sent! Our team will reply within 24 hours.';
        contactForm.appendChild(successDiv);
        contactForm.reset();
        setTimeout(() => successDiv.remove(), 4000);
      }
    });
  }

  function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-msg';
    error.innerText = message;
    input.parentNode.appendChild(error);
  }
});