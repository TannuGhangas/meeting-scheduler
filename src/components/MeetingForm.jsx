import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMeetingStore } from '../store/meetingStore';
import dayjs from 'dayjs';

const MeetingForm = () => {
  const { meetings, addMeeting } = useMeetingStore();
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState('');
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Overlap check
    const isOverlapping = meetings.some((m) =>
      (dayjs(start).isBefore(m.end) && dayjs(end).isAfter(m.start))
    );

    if (isOverlapping) {
      setError('Meeting time overlaps with an existing meeting.');
      return;
    }

    addMeeting({ title, participants, start, end });
    setTitle('');
    setParticipants('');
    setStart(null);
    setEnd(null);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Meeting Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Participants"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
        required
      />
      <div>
        Start:{' '}
        <DatePicker
          selected={start}
          onChange={(date) => setStart(date)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Start Time"
        />
      </div>
      <div>
        End:{' '}
        <DatePicker
          selected={end}
          onChange={(date) => setEnd(date)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="End Time"
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Schedule Meeting</button>
    </form>
  );
};

export default MeetingForm;
