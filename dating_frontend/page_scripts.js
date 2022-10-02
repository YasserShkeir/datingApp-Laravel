const dating_pages = {};

dating_pages.baseURL = "http://127.0.0.1:8000/api";

dating_pages.Console = (title, values, oneValue = true) => {
  console.log("---" + title + "---");
  if (oneValue) {
    console.log(values);
  } else {
    for (let i = 0; i < values.length; i++) {
      console.log(values[i]);
    }
  }
  console.log("--/" + title + "---");
};

dating_pages.getAPI = async (api_url) => {
  try {
    return await axios(api_url);
  } catch (error) {
    dating_pages.Console("Error from GET API", error);
  }
};

dating_pages.postAPI = async (api_url, api_data, api_token = null) => {
  try {
    return await axios.post(api_url, api_data, {
      headers: {
        Authorization: "token " + api_token,
      },
    });
  } catch (error) {
    dating_pages.Console("Error from POST API", error);
  }
};

dating_pages.loadFor = (page) => {
  eval("dating_pages.load_" + page + "();");
};

dating_pages.load_login = async () => {
  const formCloser = document.querySelectorAll(".close-form p");
  const signInBtn = document.getElementById("signIn");
  const signInForm = document.getElementById("signInForm");
  const signUpBtn = document.getElementById("signUp");
  const signUpForm = document.getElementById("signUpForm");
  const signInSubmit = document.getElementById("signInSubmit");
  const signUpSubmit = document.getElementById("signUpSubmit");
  signInBtn.addEventListener("click", () => {
    signInForm.style.display = "flex";
  });
  signUpBtn.addEventListener("click", () => {
    signUpForm.style.display = "flex";
  });
  formCloser.forEach((closer) => {
    closer.addEventListener("click", () => {
      signInForm.style.display = "none";
      signUpForm.style.display = "none";
    });
  });

  // -- Login Page Input Controller
  // -- -- Sign In
  signInSubmit.addEventListener("click", async (event) => {
    // Authenticate and Authorize
    // -- Data Section
    const signInEmail = document.getElementById("signInEmail");
    const signInPass = document.getElementById("signInPass");
    const postData = {
      email: signInEmail.value,
      password: signInPass.value,
    };
    // -- API Section
    const login_url = `${dating_pages.baseURL}/login`;
    event.preventDefault();
    const response_login = await dating_pages.postAPI(login_url, postData);
    dating_pages.Console("Testing login API", response_login);
    console.log(response_login.data.authorisation.token);
    localStorage.setItem("jwt", response_login.data.data.authorisation.token);

    debugger;
  });

  // -- -- Sign Up
  signUpSubmit.addEventListener("click", async (event) => {
    const signUpName = document.getElementById("signUpName");
    const signUpEmail = document.getElementById("signUpEmail");
    const dateOfBirth = document.getElementById("dob");
    const signUpPass = document.getElementById("signUpPass");
    const location = navigator.geolocation.getCurrentPosition;
    const selectedGender = document.getElementById("selectedGender"); // 0 male; 1 female
    const interests = "Edit Interests";
    const postData = {
      name: signUpName.value,
      email: signUpEmail.value,
      dob: dateOfBirth.value,
      password: signUpPass.value,
      location: location,
      gender_preference: selectedGender.value,
      interests: interests,
    };
    // -- API Section
    const signup_url = `${dating_pages.baseURL}/register`;
    const response_signup = await dating_pages.postAPI(signup_url, postData);
    dating_pages.Console("Testing login API", response_signup);
  });
};

dating_pages.load_landing = async () => {
  const userCardCaller = (id, imageSrc, userName, age, location) => {
    const card = `<div class="flex-col user-card">
                    <img src="${imageSrc}" />
                    <div class="user-card-name">${userName}</div>
                    <div class="user-card-age">Age: ${age}</div>
                    <div class="user-card-location">${location}</div>
                    <div class="flex user-card-controls">
                      <div class="user-card-controls-heart" title="Like">&#10084;</div>
                      <div class="user-card-controls-star" title="Add to Favorites">
                        &#9733;
                      </div>
                    </div>
                  </div>`;

    return card;
  };

  const closeUsers = document.querySelector(
    "#landing-content-closest .user-cards"
  );

  closeUsers.innerHTML += userCardCaller(
    1,
    "./assets/default.jpg",
    "Yasser Shkeir",
    21,
    "Beirut"
  );
};
