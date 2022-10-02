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
  const login_url = `${dating_pages.baseURL}/login`;
  const response_login = await dating_pages.getAPI(login_url);
  dating_pages.Console("Testing login API", response_login.data);

  // Login Page Form Section:
  // -- Login Page Form Controller
  const formCloser = document.querySelectorAll(".close-form p");

  const signInBtn = document.querySelector("#signIn");
  const signInForm = document.querySelector("#signInForm");
  const signUpBtn = document.querySelector("#signUp");
  const signUpForm = document.querySelector("#signUpForm");

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
  let signInEmail = document.querySelector("#signInEmail");
  let signInPass = document.querySelector("#signInPass");
  let signInSubmit = document.querySelector("#signInSubmit");

  signInSubmit.addEventListener("click", () => {
    // Authenticate and Authorize
  });

  // -- -- Sign Up
  let signUpName = document.querySelector("#signUpName");
  let signUpEmail = document.querySelector("#signUpEmail");
  let dateOfBirth = document.querySelector("#dob");
  let selectedGender = document.querySelector("#selectedGender"); // 0 male; 1 female
  let signUpPass = document.querySelector("#signUpPass");
  let signUpSubmit = document.querySelector("#signUpSubmit");

  signUpSubmit.addEventListener("click", () => {
    // Verify Credentials then add
  });
};
