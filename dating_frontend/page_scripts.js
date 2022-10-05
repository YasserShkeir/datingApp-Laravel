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

const logoutCaller = () => {
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", () => {
    localStorage.clear();
    window.open("./index.html", "_self");
  });
};

const locationUpdater = async () => {
  const locationDetector = document.getElementById("locationDetector");

  locationDetector.addEventListener(
    "click",
    () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const success = async (pos) => {
        let crd = pos.coords;
        let lat = crd.latitude.toString();
        let lng = crd.longitude.toString();

        let postData = {
          location: [lat, lng],
        };

        // -- API Section
        const editLocation_url = `${dating_pages.baseURL}/editProfile`;
        const response_location = await dating_pages.postAPI(
          editLocation_url,
          postData
        );
        dating_pages.Console("Testing Location API", response_location);
      };

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    },
    { once: true }
  );
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
    if (response_login) {
      localStorage.setItem("jwt", response_login.data.authorisation.token);
      window.open("./landingPage.html", "_self");
    } else {
      alert("UNAUTHORIZED");
    }
  });

  // -- -- -- Location Saver SignUp
  const locationDetectorSignUp = document.getElementById(
    "locationDetectorSignUp"
  );

  locationDetectorSignUp.addEventListener(
    "click",
    () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const success = async (pos) => {
        let crd = pos.coords;
        let lat = crd.latitude.toString();
        let lng = crd.longitude.toString();
        coordinates[0] = lat;
        coordinates[1] = lng;
        console.log(coordinates);
      };

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    },
    { once: true }
  );

  // -- -- Sign Up
  signUpSubmit.addEventListener("click", async (event) => {
    const signUpName = document.getElementById("signUpName");
    const signUpEmail = document.getElementById("signUpEmail");
    const dateOfBirth = document.getElementById("dob");
    const signUpPass = document.getElementById("signUpPass");
    const location = `${coordinates[0]},${coordinates[1]}`;
    const gender = document.getElementById("gender"); // 0 male; 1 female
    const selectedGender = document.getElementById("selectedGender"); // 0 male; 1 female
    const interests = "Edit Interests";
    const postData = {
      name: signUpName.value,
      email: signUpEmail.value,
      dob: dateOfBirth.value,
      password: signUpPass.value,
      location: location,
      gender: gender,
      gender_preference: selectedGender.value,
      interests: interests,
    };
    // -- API Section
    event.preventDefault();
    const signup_url = `${dating_pages.baseURL}/register`;
    const response_signup = await dating_pages.postAPI(signup_url, postData);
    dating_pages.Console("Testing login API", response_signup);
    if (response_signup) {
      window.open("./landingpage.html");
    } else {
      alert("Please use a different email");
    }
  });
};

dating_pages.load_landing = async () => {
  // Calls the logout Function
  logoutCaller();

  // This function is called so that whenever user clicks on update location btn, location is updated
  locationUpdater();

  // -- API Section
  const retrieveCoords_url = `${dating_pages.baseURL}/editProfile`;
  const response_retrieveCoords = await dating_pages.postAPI(
    retrieveCoords_url
  );
  dating_pages.Console("Testing Retrieve Image API", response_retrieveCoords);

  let userCoordinates = response_retrieveCoords.data.data.location.replace(
    /[\[\]"]+/g,
    ""
  );

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
  const userCardCaller = (
    id,
    imageSrc,
    userName,
    age,
    interests,
    bio,
    distance
  ) => {
    const card = `<div class="flex-col user-card" style="order: index">
                    <img src="data:image/jpeg;base64,${imageSrc}" />
                    <div class="user-card-name">${userName}</div>
                    <div class="user-card-age">Age: ${age}</div>
                    <div class="user-card-interests">Interests: ${interests}</div>
                    <div class="user-card-bio">Bio: ${bio}</div>
                    <div class="user-card-location">Distance: ${distance} Km</div>
                    <div class="flex user-card-controls">
                      <div class="user-card-controls-heart" title="Like">&#10084;</div>
                      <div class="user-card-controls-block" title="Block User">
                        &#128683;
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
      console.log("user: ", user);
      // user.location = user.location.replaceAll(`"`, "");
      // user.location = user.location.replaceAll(`[`, "");
      // user.location = user.location.replaceAll(`]`, "");
      user.location = user.location.replace(/[\[\]"]+/g, ""); // Proof there's always a better way
      users.push({
        ...user,
        // Add distance from current user to each user object
        distance: calcCrow(
          user.location.split(",")[0],
          user.location.split(",")[1],
          userCoordinates.split(",")[0],
          userCoordinates.split(",")[1]
        ).toFixed(2),
      });
    });

    users.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    // Loop through Users and add them on the frontend
    users.forEach((user) => {
      parentDiv.innerHTML += userCardCaller(
        user.id,
        user.image, // *.*.*.* ASK QUESTIONS HERE *.*.*.*
        user.name,
        year - user.dob.substring(0, 4),
        user.interests,
        user.bio,
        user.distance
      );
    });

    const usersLikeButton = document.querySelectorAll(
      "#landing-content-closest .user-card-controls-heart"
    );

    console.log("usersLikeButton: ", usersLikeButton);

    usersLikeButton.forEach((likeButton, index) => {
      likeButton.addEventListener("click", async () => {
        const postData = {
          id: users[index].id,
        };
        // API magic happens here
        const addFavCaller = `${dating_pages.baseURL}/addFavorite`;
        const response = await dating_pages.postAPI(addFavCaller, postData);
        dating_pages.Console(`Testing addFavCaller API`, response);
        location.reload();
      });
    });

    const usersUnLikeButton = document.querySelectorAll(
      "#landing-content-favorites .user-card-controls-heart"
    );

    console.log("usersUnLikeButton: ", usersUnLikeButton);

    usersUnLikeButton.forEach((likeButton, index) => {
      likeButton.innerHTML = "Remove";
      likeButton.title = "Remove from Favorites";
      likeButton.addEventListener("click", async () => {
        const postData = {
          id: users[index].id,
        };
        // API magic happens here
        const removeFavCaller = `${dating_pages.baseURL}/removeFavorite`;
        const response = await dating_pages.postAPI(removeFavCaller, postData);
        dating_pages.Console(`Testing removeFavCaller API`, response);
        location.reload();
      });
    });
  };
};

dating_pages.load_editProf = async () => {
  // Calls the logout Function
  logoutCaller();

  // This function is called so that whenever user clicks on update location btn, location is updated
  locationUpdater();

  // -- API Section
  const retrieveImage_url = `${dating_pages.baseURL}/editProfile`;
  const response_retrieveImage = await dating_pages.postAPI(retrieveImage_url);
  dating_pages.Console("Testing Retrieve Image API", "Base 64 Here");

  let base64Image = response_retrieveImage.data.data.image;

  const editProfProfImg = document.getElementById("editProfProfImg");
  editProfProfImg.src = `data:image/jpeg;base64,` + base64Image;

  const imageChecker = document.getElementById("editProfImage");

  imageChecker.addEventListener("change", () => {
    imageUploaded();
  });

  function imageUploaded() {
    var file = document.querySelector("input[type=file]")["files"][0];

    var reader = new FileReader();

    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

      imageBase64Stringsep = base64String;

      // alert(imageBase64Stringsep);
      base64Image = base64String;
    };
    reader.readAsDataURL(file);
  }

  const editProfSubmit = document.getElementById("editProfSubmit");

  editProfSubmit.addEventListener("click", async (event) => {
    const editProfName = document.getElementById("editProfName");
    const editProfEmail = document.getElementById("editProfEmail");
    const editProfPhone = document.getElementById("editProfPhone");
    const editProfDOB = document.getElementById("editProfDOB");
    const editProfGender = document.getElementById("editProfGender");
    const editProfInterests = document.getElementById("editProfInterests");
    const editProfBio = document.getElementById("editProfBio");
    const editProfIncognito = document.getElementById("editProfIncognito");
    const editProfPassword = document.getElementById("editProfPassword");
    const editProfGenderPref = document.getElementById("editProfGenderPref");

    let postData = {
      name: editProfName.value,
      email: editProfEmail.value,
      phone_number: editProfPhone.value,
      image: base64Image,
      dob: editProfDOB.value,
      password: editProfPassword.value,
      gender: editProfGender.value,
      gender_preference: editProfGenderPref.value,
      interests: editProfInterests.value,
      bio: editProfBio.value,
      incognito: editProfIncognito.value,
    };

    // -- API Section
    const editProf_url = `${dating_pages.baseURL}/editProfile`;
    const response_login = await dating_pages.postAPI(editProf_url, postData);
    dating_pages.Console("Testing login API", response_login);
  });
};
