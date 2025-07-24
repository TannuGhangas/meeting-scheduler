import React from 'react';
import { useMeetingStore } from '../store/meetingStore';
import dayjs from 'dayjs';

const MeetingList = () => {
  const { meetings } = useMeetingStore();

  return (
    <div className="meeting-list">
      <h2>Scheduled Meetings</h2>
      {meetings.length === 0 ? (
        <p>No meetings yet.</p>
      ) : (
        <ul>
          {meetings.map((m, idx) => (
            <li className="meeting-card" key={idx}>
              <strong>{m.title}</strong>
              Participants: {m.participants} <br />
              From: {dayjs(m.start).format('MMM D, YYYY h:mm A')} <br />
              To: {dayjs(m.end).format('MMM D, YYYY h:mm A')}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MeetingList;
