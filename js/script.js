// MVC PATTERN

class Model {
  constructor() {
    this.section2Data = [
      {
        title: "Sed ut perspiciatis",
        description:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...",
      },
      {
        title: "Nemo enim ipsam",
        description:
          "Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt...",
      },
      {
        title: "Lorem ipsum dolor",
        description:
          "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...",
      },
      {
        title: "Tempor incididunt",
        description:
          "Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est...",
      },
    ];
    this.section3Data = [
      {
        title: "Sed ut perspiciatis",
        description:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
      },
      {
        title: "Lorem ipsum dolor",
        description:
          "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        title: "Nemo enim ipsam",
        description:
          "Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.",
      },
    ];

    this.cardData = [
      {
        title: "Sed ut perspiciatis",
        description:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia.",
        imgUrl: "./assets/section-4/1.png",
      },
      {
        title: "Lorem ipsum dolor",
        description:
          "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        imgUrl: "./assets/section-4/2.png",
      },
      {
        title: "Nemo enim ipsam",
        description:
          "Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        imgUrl: "./assets/section-4/3.png",
      },
    ];
    this.columnsData = [
      {
        heading: "Mobile app",
        items: ["Features", "Live share", "Video record"],
      },
      {
        heading: "Community",
        items: ["Featured artists", "The Portal", "Live events"],
      },
      {
        heading: "Company",
        items: ["About us", "Contact us", "History"],
      },
    ];
    this.socialIconsData = [
      { alt: "Facebook", imgUrl: "./assets/footer/fb.png" },
      { alt: "Twitter", imgUrl: "./assets/footer/twitter.png" },
      { alt: "Instagram", imgUrl: "./assets/footer/insta.png" },
      { alt: "LinkedIn", imgUrl: "./assets/footer/linkedin.png" },
    ];
    this.formData = {};
  }

  // Save form data
  saveFormData(formData) {
    this.formData = formData;
  }
}

class View {
  renderSection2(container, dataArray) {
    const content = dataArray
      .map((item) => {
        return `
                      <div class="grid-item">
                          <h3>${item.title}</h3>
                          <p>${item.description}</p>
                          <button class="btn-primary">Learn More</button>
                      </div>
                  `;
      })
      .join("");

    container.innerHTML = content;
  }
  renderSection3(container, dataArray) {
    const content = dataArray
      .map((item) => {
        return `
                  <div class="grid-item">
                          <h2>${item.title}</h2>
                          <p>${item.description}</p>
                    </div>
                  `;
      })
      .join("");

    container.innerHTML = content;
  }
  renderCards(container, cardData) {
    const content = cardData
      .map((item) => {
        return `
                <div class="card">
                  <div><img src="${item.imgUrl}" alt="${item.title}"></div>
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                </div>
              `;
      })
      .join("");

    container.innerHTML = content;
  }
  renderSocialIcons(container, data) {
    const content = data
      .map((icon) => {
        return `
          <div class="social-icon">
            <img src="${icon.imgUrl}" alt="${icon.alt}">
          </div>
        `;
      })
      .join("");

    container.innerHTML = content;
  }

  showFormResult(message) {
    const formResult = document.getElementById("form-result");
    if (formResult) {
      formResult.textContent = message;
    } else {
      console.error("form-result element not found!");
    }
  }

  clearForm() {
    document.getElementById("signupForm").reset();
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.initSection2();
    this.initSection3();
    this.initCards();
    this.initSocialIcons();
    this.initHamburgerMenu();
    this.initFormSubmission();
  }

  // Initialize Section 2
  initSection2() {
    const section2Container = document.getElementById("sec-2-grid-container");
    this.view.renderSection2(section2Container, this.model.section2Data);
  }

  // Initialize Section 3
  initSection3() {
    const section3Container = document.getElementById("sec-3-container");
    this.view.renderSection3(section3Container, this.model.section3Data);
  }

  // Initialize the cards
  initCards() {
    const cardContainer = document.getElementById("card-container");
    this.view.renderCards(cardContainer, this.model.cardData);
  }

  // Hamburger menu
  initHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const navList = document.querySelector(".nav-list");

    hamburger.addEventListener("click", () => {
      navList.classList.toggle("show");
    });
  }
  // social icons
  initSocialIcons() {
    const container = document.getElementById("social-icons-container");
    this.view.renderSocialIcons(container, this.model.socialIconsData);
  }
  //  initialize form
  initFormSubmission() {
    document
      .getElementById("signupForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = {
          first_name: document.getElementById("firstName").value,
          last_name: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          phone_number: document.getElementById("phone").value,
          password: document.getElementById("password").value,
        };

        if (
          formData.first_name &&
          formData.last_name &&
          formData.email &&
          formData.phone_number &&
          formData.password
        ) {
          this.model.saveFormData(formData);

          this.view.showFormResult("Registration successful!");

          this.view.clearForm();

          console.log(JSON.stringify(formData, null, 2));
        } else {
          this.view.showFormResult("Please fill out all fields.");
        }
      });
  }
}

//  MVC initialize
document.addEventListener("DOMContentLoaded", () => {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
});
