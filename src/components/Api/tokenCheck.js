const url = "https://testproject-api-v2.strv.com/auth/native";

export const getNewAuthToken = async (auth) => {
  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      APIKey: "a44883edde409d11fc9fca4b4c028b311ea4cabc",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: auth
    }),
  });
  const data = await response.json();
  console.log('TOKEN CHECK', data, 'response', response)
  }



    //const handleLeaveEvent = async () => {
  // const requestParams = {
  //   method: "DELETE",
  //   headers: {
  //     APIKey: "a44883edde409d11fc9fca4b4c028b311ea4cabc",
  //     Authorization: auth,
  //     "Content-type": "application/json",
  //     "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]'),
  //   },
  // };
  // //try {
  // let response = await fetch(
  //   `${joinURL}${eventID}/attendees/me`,
  //   requestParams
  // );
  // let data = await response.json();
  // console.log("TRY", "response", response, "data", data);
  // if (data.error === "Auth.InvalidToken") {
  //   const newToken = await getNewAuthToken(auth);
  //   requestParams.headers.Authorization = newToken;
  //   console.log("newtoe", newToken);
  //   response = await fetch(
  //     `${joinURL}${eventID}/attendees/me`,
  //     requestParams
  //   );
  //   data = await response.json();
  //   getEventList();
  //   console.log("ERROR", "response", response, "data", data);
  // }

  //}
  // catch {
  //   const newToken = getNewAuthToken();
  //   requestParams.headers.Authorization = newToken;
  //   const response = await fetch(`${joinURL}${eventID}/attendees/me`, requestParams)
  //   const data = await response.json();
  //   console.log("ERROR", "response", response, 'data', data);
  // }
  //};