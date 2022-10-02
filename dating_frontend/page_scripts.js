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
  // const logintest_url = `${dating_pages.baseURL}/logintest`;
  // const response_logintest = await dating_pages.getAPI(logintest_url);
  // dating_pages.Console("Testing loginTest API", response_logintest.data);

  // const login_url = `${dating_pages.baseURL}/login`;
  // const response_login = await dating_pages.postAPI(login_url);
  // dating_pages.Console("Testing login API", response_login.data);

  // const logout_url = `${dating_pages.baseURL}/logout`;
  // const response_logout = await dating_pages.getAPI(logout_url);
  // dating_pages.Console("Testing logout API", response_logout.data);

  // const register_url = `${dating_pages.baseURL}/register`;
  // const response_register = await dating_pages.postAPI(register_url);
  // dating_pages.Console("Testing login API", response_register.data);

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
  let signInSubmit = document.querySelector("#signInSubmit");

  signInSubmit.addEventListener("click", () => {
    // Authenticate and Authorize
    // -- Data Section
    let signInEmail = document.querySelector("#signInEmail");
    let signInPass = document.querySelector("#signInPass");

    let postData = {
      // email: signInEmail.value,
      // password: signInPass.value,
      email: "test1@test.com",
      password: "yasser123",
    };

    console.log(postData);
    debugger;
    // -- API Section
    // const login_url = `${dating_pages.baseURL}/login`;
    // const response_login = dating_pages.postAPI(login_url, postData);
    // console.log(response_login.data);
    // debugger;
    // dating_pages.Console("Testing login API", response_login.data);
    // debugger;

    // -- API Manual Test
    const login_url = "http://127.0.0.1:8000/api/login";
    axios
      .post(login_url, {
        email: "test1@test.com",
        password:
          "$2y$10$cNpkrs.apGku6Nb5RKyYXOB5HIm0WsNOPO4KDxtPM4D9m1jPna/eS",
      })
      .then(function (response) {
        console.log(response);
        debugger;
      })
      .catch(function (error) {
        console.log(error);
        debugger;
      });
    // const response_login = dating_pages.postAPI(login_url, postData);
    // console.log(response_login.data);
    // debugger;
    // dating_pages.Console("Testing login API", response_login.data);
    debugger;
  });

  // -- -- Sign Up

  let signUpSubmit = document.querySelector("#signUpSubmit");

  signUpSubmit.addEventListener("click", () => {
    let signUpName = document.querySelector("#signUpName");
    let signUpEmail = document.querySelector("#signUpEmail");
    let dateOfBirth = document.querySelector("#dob");
    let signUpPass = document.querySelector("#signUpPass");
    let location = "x";
    let selectedGender = document.querySelector("#selectedGender"); // 0 male; 1 female
    let interests = "Edit Interests";

    let postData = {
      name: signUpName.value,
      email: signUpEmail.value,
      dob: dateOfBirth.value,
      password: signUpPass.value,
      location: location,
      gender_preference: selectedGender.value,
      interests: interests,
    };

    console.log(postData);
    debugger;
    // Verify Credentials then add
    const login_url = "http://127.0.0.1:8000/api/register";
    axios
      .post(login_url, postData)
      .then(function (response) {
        console.log(response);
        debugger;
      })
      .catch(function (error) {
        console.log(error);
        debugger;
      });
    debugger;
  });
};
