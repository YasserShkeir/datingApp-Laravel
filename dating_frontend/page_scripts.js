const dating_pages = {};

dating_pages.baseURL = "http://127.0.0.1:8000";

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

dating_pages.load_landing = async () => {
  const landing_url = `${dating_pages.baseURL}/landing`;
  const response_landing = await dating_pages.getAPI(landing_url);
  dating_pages.Console("Testing Landing API", response_landing.data.data);
};

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
const signInEmail = document.querySelector("#signInEmail");
const signInPass = document.querySelector("#signInPass");
const signInSubmit = document.querySelector("#signInSubmit");

signInSubmit.addEventListener("click", () => {
  // Authenticate and Authorize
});

// -- -- Sign Up
const signUpName = document.querySelector("#signUpName");
const signUpEmail = document.querySelector("#signUpEmail");
const signUpPass = document.querySelector("#signUpPass");
const signUpSubmit = document.querySelector("#signUpSubmit");
