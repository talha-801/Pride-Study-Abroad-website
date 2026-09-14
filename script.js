// Toggle between Student and B2B inquiry forms
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

// Show/Hide Custom Country field if "Other" is selected
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

// Format and send form inquiries directly to WhatsApp: +92 328 6174491
function handleFormSubmit(event, formType) {
  event.preventDefault();
  
  // Destination WhatsApp number updated
  const whatsappNumber = "923286174491"; 
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
              `*Candidate Notes:* ${encodeURIComponent(notes)}`;
  } else if (formType === 'b2b') {
    const company = document.getElementById('b2b-company').value.trim();
    const name = document.getElementById('b2b-name').value.trim();
    const phone = document.getElementById('b2b-phone').value.trim();
    const email = document.getElementById('b2b-email').value.trim();
    const type = document.getElementById('b2b-type').value;
    const volume = document.getElementById('b2b-volume').value;
    const notes = document.getElementById('b2b-message').value.trim() || 'No specific notes provided';

    message = `*New B2B Partnership Inquiry - Pride Study Abroad*%0A%0A` +
              `*Agency / College:* ${encodeURIComponent(company)}%0A` +
              `*Contact Person:* ${encodeURIComponent(name)}%0A` +
              `*WhatsApp/Phone:* ${encodeURIComponent(phone)}%0A` +
              `*Email:* ${encodeURIComponent(email)}%0A` +
              `*Partnership Type:* ${encodeURIComponent(type)}%0A` +
              `*Expected Student Cohort:* ${encodeURIComponent(volume)}%0A` +
              `*Proposal Notes:* ${encodeURIComponent(notes)}`;
  }

  // Open WhatsApp chat directly with +92 328 6174491
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// Smooth scroll support & navigation active state highlighting
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 110;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
});