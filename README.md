
### GENERAL INFORMATION ABOUT EVENTIO as of 10/08/2020:
 
This project is using the standard [create-react-app] boilerplate with an additional `scss, react-router, react-router-dom, and moment` installations. I used useHistory and useLocation, as well as Router and Switch components from react-router and react-router-dom to connect different components with different URLs and have the user be able to switch through them as they navigate the site. These components still need state to be passed to them, which is where useHistory and useLocation come in. You can use the history object to push different state to the next component, and then grab the states you need that are stored in the location object. 

## THINGS LEFT TO DO: 

# EDIT/DELETE EVENT:  
How editing an event works right now: User clicks on an event that is theirs -> gets taken to the [EditEvent.js] component -> clicks [handleDeleteEvent()] -> gets redirected back to the page they came from.

So the user can access the “edit” function of an event they are an owner of from the [Homepage] and [UserProfile] pages, and entering the [EditEvent] page from either component will allow them to successfully delete their event. However, there needs to be a history.push function that will send the user back to the Homepage if they came from the Homepage. Currently, if the user edits and deletes an event while in their [UserProfile], they will successfully be redirected back there. This is not the case when the user is coming from the Homepage.

In order to achieve this goal, you must add another state that will be passed through to the [EditEvent] component, and then you need a ternary operator or another if statement that will check this state, and depending on if the User accessed this Edit Event page from the Homepage or their User Profile, they will be sent back to the right page. I currently have a state called “isFromHome” that is being declared in [Homepage.js] to true. I haven’t had enough time to make it work completely, but in theory you need to set up the Edit Event component to accept this variable or state, and then use it in [handleDeleteEvent()], in [Events/EditEvent.js]. Then Homepage and [UserProfile] will both pass that state into their Button components, which will then pass it on to the [EditEvent]component. Also ensure that the correct states are being history.push-ed back to the Homepage. Homepage needs userInfo and authToken states in order to render correctly.

After this, this component just needs to be styled and add features to edit the event. You can achieve this by hooking up a request to the API and grabbing the old values and displaying them in the input. So if the user only changes some fields, the whole request will be sent correctly. 
`*needs to be responsive` 


# EVENT DETAIL:
You need to create an event detail component that will make an API request with the event ID (that it grabs from the individual event render) and then you can get the response back as response.json(), save it to a data variable, and then display what you need. You will need to map through it to get the attendee names, since they are in an array, but that is straightforward. Just save it to a variable and render that in the component return. And then the styling :)
`*needs to be responsive`

# LEAVE/JOIN:
Right now a user cannot join or leave an event if they are looking at the events on their User Profile page (they can do it from the homepage). It doesn’t work because the getEventList() function is not currently being passed to the Event Button component when it is being rendered from the User Profile. It will require some work because the User Profile is redirected from the Homepage in a way where you cannot pass functions, so I think this is an example of when some other state management system could be helpful to make it work in a more efficient, less messy way. However to achieve the goal without that, you would need to push the right variables as state when you history.push to the User Profile from the Homepage. You should be able to do this if you pass the userEvents variable from Homepage.js to the UserProfile after it has been filtered for ownership, and then you can have a map function that creates an Event array of events that the User is attending. And then pass that into the Button components in the mappingList and mappingGrid functions in UserProfile. And then the functionality will be fixed.

# “SOMETHING WENT WRONG” PAGE: 
In App.js, make a new Route with a URL of your choosing (maybe “/oops” or something), and then you can history.push to that Route after API requests that have gone wrong (i.e. have some error). To do the styling, just import the LeftPanel.js and render the component and then style from there. 
`*needs to be responsive`

# CREATE EVENT
The create event styling differs slightly from the desired goal, in that for Date and Time inputs have a set display. I think it makes the user input experience a bit better.

# SIGN UP COMPONENT
This one is definitely not responsive and needs to have get some love! 

# API Token Refresh 
In src/Api/tokenCheck, you will find an exportable function that is set up to make an API call to get the refresh token. In your API request, you need to set the request to a variable (for example, requestParams). Then you can use it in your fetch method as the second parameter. I didn't have enough time to make it functional, but in the API calls you should have a statement that looks for the error response of user.notAuthenticated, and if is in the response, then you will do the following code. 
`const newToken = getNewAuthToken();`
`requestParams.headers.Authorization = newToken;`
`const response = await fetch(eventUrl, requestParams)`
There is another example of a potential API request in that tokenCheck.js file.


Good luck! 