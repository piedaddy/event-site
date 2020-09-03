import moment from "moment";
import EventButton from "./components/EventButton/EventButton";
import PeopleSVG from "./components/SVG/PeopleSVG";



export default function MappingGridTest({event, index, userID, objectTest}) {
  let date;
  let time;
  let isUserAttending = false;
  let isUserOwner = false;
  let count = 0;
  let totalPeople;
  let eventStartAt = event.startsAt;
  date = moment(eventStartAt).format("MMMM Do, YYYY");
  time = moment(eventStartAt).format("h:mm a");
  event.attendees.map(attendee => {
    if (attendee.id === userID) {
      isUserAttending = true;
    }
    count += 1;
  });
  if (event.owner.id === userID) {
    isUserOwner = true;
  }
  count === 0 ? (totalPeople = 0) : (totalPeople = count);
  return (
    <div key={index} className="event_list">
      <div className="event_time">
        {date} - {time}
      </div>
      <div className="event_names">
        <div className="event_title">
          <h3>{event.title}</h3>
        </div>
        <div className="event_owner">
          {event.owner.firstName} {event.owner.lastName}
        </div>
      </div>
      <p className="event_description">{event.description}</p>
      <div className="event_list_bottom-row">
        <div className="event_capacity">
          <div>
            <PeopleSVG />
          </div>
          {totalPeople} of {event.capacity}
        </div>
        <EventButton
          isUserAttending={isUserAttending}
          isUserOwner={isUserOwner}
          eventID={event.id}
          userID = {object.userID}
          userEventList={object.userEventList}
          auth={object.auth}
          userInfo={object.userInfo}
          firstInitial={object.firstInitial}
          lastInitial={objectlastInitial}
          isFromHome={object.isFromHome}
        />
      </div>
    </div>
  );
}