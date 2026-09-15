// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('nav-open');
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('nav-open')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  // Automatically close menu when an item is tapped
  document.querySelectorAll('#nav-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav-open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

// Switch between Student and B2B forms
function switchForm(type) {
  const studentForm = document.getElementById('student-form');
  const b2bForm = document.getElementById('b2b-form');
  const studentBtn = document.getElementById('btn-student-tab');
  const b2bBtn = document.getElementById('btn-b2b-tab');

  if (type === 'student') {
    studentForm.classList.remove('hidden-form');
    studentForm.classList.add('active-form');
    b2bForm.classList.remove('active-form');
    b2bForm.classList.add('hidden-form');

    studentBtn.classList.add('active');
    b2bBtn.classList.remove('active');
  } else {
    b2bForm.classList.remove('hidden-form');
    b2bForm.classList.add('active-form');
    studentForm.classList.remove('active-form');
    studentForm.classList.add('hidden-form');

    b2bBtn.classList.add('active');
    studentBtn.classList.remove('active');
  }
}

// Custom Country text input toggle
function toggleOtherCountryField() {
  const select = document.getElementById('stu-country');
  const otherContainer = document.getElementById('other-country-container');
  const otherInput = document.getElementById('stu-other-country');

  if (select.value === 'Other') {
    otherContainer.style.display = 'block';
    otherInput.setAttribute('required', 'required');
    otherInput.focus();
  } else {
    otherContainer.style.display = 'none';
    otherInput.removeAttribute('required');
  }
}

// WhatsApp Submission exclusively routed to: 92 301 8686154
function handleFormSubmit(event, formType) {
  event.preventDefault();
  const whatsappNumber = "923018686154";
  let message = "";

  if (formType === 'student') {
    const name = document.getElementById('stu-name').value.trim();
    const phone = document.getElementById('stu-phone').value.trim();
    const email = document.getElementById('stu-email').value.trim();
    const qual = document.getElementById('stu-qual').value;
    let country = document.getElementById('stu-country').value;
    
    if (country === 'Other') {
      const otherVal = document.getElementById('stu-other-country').value.trim();
      country = otherVal ? `Other (${otherVal})` : 'Other';
    }

    const test = document.getElementById('stu-test').value;
    const notes = document.getElementById('stu-message').value.trim() || 'No additional notes provided';

    message = `*New Student Assessment Inquiry - Pride Study Abroad*%0A%0A` +
              `*Name:* ${encodeURIComponent(name)}%0A` +
              `*WhatsApp/Phone:* ${encodeURIComponent(phone)}%0A` +
              `*Email:* ${encodeURIComponent(email)}%0A` +
              `*Target Country:* ${encodeURIComponent(country)}%0A` +
              `*Qualification:* ${encodeURIComponent(qual)}%0A` +
              `*English Proficiency:* ${encodeURIComponent(test)}%0A` +
              `*Candidate Notes:* ${encodeURIComponent(notes)}%0A%0A` +
              `*Direct Email:* info@pridestudyabroad.com`;
  } else if (formType === 'b2b') {
    const company = document.getElementById('b2b-company').value.trim();
    const name = document.getElementById('b2b-name').value.trim();
    const phone = document.getElementById('b2b-phone').value.trim();
    const email = document.getElementById('b2b-email').value.trim();
    const type = document.getElementById('b2b-type').value;
    const volume = document.getElementById('b2b-volume').value;
    const notes = document.getElementById('b2b-message').value.trim() || 'No specific notes provided';

    message = `*New B2B Partnership Inquiry - Pride Study Abroad*%0A%0A` +
              `*Agency / Partner:* ${encodeURIComponent(company)}%0A` +
              `*Contact Person:* ${encodeURIComponent(name)}%0A` +
              `*WhatsApp/Phone:* ${encodeURIComponent(phone)}%0A` +
              `*Email:* ${encodeURIComponent(email)}%0A` +
              `*Partnership Type:* ${encodeURIComponent(type)}%0A` +
              `*Expected Student Cohort:* ${encodeURIComponent(volume)}%0A` +
              `*Proposal Notes:* ${encodeURIComponent(notes)}%0A%0A` +
              `*Direct Email:* info@pridestudyabroad.com`;
  }

  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// Smooth scroll & Dynamic Active Tab Highlight on Scroll
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 74;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Dynamic Scroll Active Tab Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a.nav-link-item');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 130;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
});