const dating_pages = {};

dating_pages.baseURL = "http://127.0.0.1:8000/api";

let coordinates = [];

// Distance finding function START

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
const calcCrow = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // use earth radius in km cz science
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

// Converts numeric degrees to radians
const toRad = (Value) => {
  return (Value * Math.PI) / 180;
};

// Distance finding function END

// Console Tracker
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

// GET API function
dating_pages.getAPI = async (api_url) => {
  try {
    return await axios(api_url);
  } catch (error) {
    dating_pages.Console("Error from GET API", error);
  }
};

// POST API function - takes the current user api token
dating_pages.postAPI = async (
  api_url,
  api_data,
  api_token = localStorage.getItem("jwt")
) => {
  try {
    return await axios.post(api_url, api_data, {
      headers: {
        Authorization: "Bearer " + api_token,
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
    localStorage.setItem("jwt", response_login.data.authorisation.token);

    // if (localStorage.getItem("jwt")) {
    //   window.open("./landingPage.html", "_self");
    // } else {
    // }
  });

  // -- -- Sign Up
  signUpSubmit.addEventListener("click", async (event) => {
    const signUpName = document.getElementById("signUpName");
    const signUpEmail = document.getElementById("signUpEmail");
    const dateOfBirth = document.getElementById("dob");
    const signUpPass = document.getElementById("signUpPass");
    const location = `${coordinates[0]},${coordinates[1]}`;
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
    console.log(postData);
    debugger;
    // -- API Section
    event.preventDefault();
    const signup_url = `${dating_pages.baseURL}/register`;
    const response_signup = await dating_pages.postAPI(signup_url, postData);
    dating_pages.Console("Testing login API", response_signup);
    debugger;
    if (response_signup) {
      alert("Successfully signed up");
    } else {
      alert("Please use a different email");
    }
  });
};

dating_pages.load_landing = async () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    let crd = pos.coords;
    let lat = crd.latitude.toString();
    let lng = crd.longitude.toString();
    coordinates.push(lat);
    coordinates.push(lng);
    cardsDisplayer("#landing-content-favorites .user-cards", "favorites");
    cardsDisplayer("#landing-content-closest .user-cards", "users");
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  // create user card component
  const userCardCaller = (id, imageSrc, userName, age, distance) => {
    const card = `<div class="flex-col user-card" style="order: index">
                    <img src="${imageSrc}" />
                    <div class="user-card-name">${userName}</div>
                    <div class="user-card-age">Age: ${age}</div>
                    <div class="user-card-location">Distance: ${distance} Km</div>
                    <div class="flex user-card-controls">
                      <div class="user-card-controls-heart" title="Like">&#10084;</div>
                      <div class="user-card-controls-star" title="Add to Favorites">
                        &#9733;
                      </div>
                    </div>
                  </div>`;

    return card;
  };

  const cardsDisplayer = async (divID, APIname) => {
    // Get parent element to add cards in it
    const parentDiv = document.querySelector(`${divID}`);

    // API magic happens here
    const usersCaller = `${dating_pages.baseURL}/${APIname}`;
    const response = await dating_pages.postAPI(usersCaller);
    dating_pages.Console(`Testing ${APIname} API`, response);

    // Get current year to calculate age of users
    const date = new Date();
    let year = date.getFullYear();

    // Add users to an array for us to sort them later
    const users = [];

    let jsonLink = response.data.data;

    if (!jsonLink) {
      jsonLink = response.data.users;
    }

    jsonLink.forEach((user) => {
      users.push({
        ...user,
        // Add distance from current user to each user object
        distance: calcCrow(
          user.location.split(",")[0],
          user.location.split(",")[1],
          coordinates[0],
          coordinates[1]
        ).toFixed(2),
      });
    });

    users.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    // Loop through Users and add them on the frontend
    users.forEach((user) => {
      parentDiv.innerHTML += userCardCaller(
        user.id,
        "./assets/default.jpg", // *.*.*.* ASK QUESTIONS HERE *.*.*.*
        user.name,
        year - user.dob.substring(0, 4),
        user.distance
      );
    });
  };
};

dating_pages.load_editProf = async () => {
  const locationDetector = document.getElementById("locationDetector");

  locationDetector.addEventListener(
    "click",
    () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      function success(pos) {
        let crd = pos.coords;
        let lat = crd.latitude.toString();
        let lng = crd.longitude.toString();
        coordinates.push(lat);
        coordinates.push(lng);
        console.log(coordinates);
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    },
    { once: true }
  );

  const editProfSubmit = document.getElementById("editProfSubmit");

  editProfSubmit.addEventListener("click", async (event) => {
    const editProfName = document.getElementById("editProfName");
    const editProfEmail = document.getElementById("editProfEmail");
    const editProfPhone = document.getElementById("editProfPhone");
    const editProfDOB = document.getElementById("editProfDOB");
    const editProfGender = document.getElementById("editProfGender");
    const editProfImage = document.getElementById("editProfImage");
    const editProfInterests = document.getElementById("editProfInterests");
    const editProfBio = document.getElementById("editProfBio");
    const editProfIncognito = document.getElementById("editProfIncognito");
    const editProfPassword = document.getElementById("editProfPassword");
    const editProfGenderPref = document.getElementById("editProfGenderPref");

    let postData = {
      name: editProfName.value,
      email: editProfEmail.value,
      phone_number: editProfPhone.value,
      image: editProfImage.value,
      dob: editProfDOB.value,
      password: editProfPassword.value,
      location: `${coordinates[0]},${coordinates[1]}`,
      gender: editProfGender.value,
      gender_preference: editProfGenderPref.value,
      interests: editProfInterests.value,
      bio: editProfBio.value,
      incognito: editProfIncognito.value,
    };

    console.log(postData);

    // -- API Section
    const editProf_url = `${dating_pages.baseURL}/editProfile`;
    event.preventDefault();
    const response_login = await dating_pages.postAPI(editProf_url, postData);
    dating_pages.Console("Testing login API", response_login);

    debugger;
  });
};
