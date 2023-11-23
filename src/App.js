import React, { useState, useEffect, memo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import Table from './table';
import {BarLoader} from 'react-spinners'
// import file from 
// import fs from 'fs'
const App = () => {
  const [eventData, setEventData] = useState();

  console.log('eventData', eventData)

  useEffect(() => {

    fetch('/tracking.log')
      .then(response => response.text())
      .then(data => {
        const logLines = data.split('\n');

        // Mảng để lưu trữ các đối tượng
        const table1 = [];
        const table2 = [];
        const table3 = [];
        const table4 = [];
        const table5 = [];
        const table6 = [];

        // Lặp qua từng dòng và chuyển đổi chuỗi JSON thành đối tượng JavaScript
        logLines.forEach((line) => {
          try {
            const jsonStartIndex = line.indexOf('{');
            if (jsonStartIndex !== -1) {
              const jsonString = line.substring(jsonStartIndex);
              const item = JSON.parse(jsonString);
              if (item.event_type == 'edx.course.enrollment.activated' || item.event_type == 'edx.course.enrollment.deactivated') {
                table1.push(item);

              } else if (item.event_type == 'page_close' || item.event_type == 'seq_goto' || item.event_type == 'seq_next' || item.event_type == 'seq_prev') {
                table2.push(item)
              } else if (item.event_type == 'play_video' || item.event_type == 'pause_video' || item.event_type == 'stop_video' || item.event_type == 'load_video' || item.event_type == 'hide_transcript' || item.event_type == 'show_transcript' || item.event_type == 'speed_change_video' || item.event_type == 'video_show_cc_menu' || item.event_type == 'video_hide_cc_menu') {
                table3.push(item);
              } else if (item.event_type == 'edx.problem.hint.demandhint_displayed' || item.event_type == 'edx.problem.hint.feedback_displayed' || item.event_type == 'problem_check' || item.event_type == 'problem_check_fail' || item.event_type == 'problem_graded' || item.event_type == 'problem_rescore' || item.event_type == 'problem_rescore_fail' || item.event_type == 'problem_reset' || item.event_type == 'problem_show') {
                table4.push(item);

              } else if (item.event_type == 'edx.bookmark.accessed' || item.event_type == 'edx.bookmark.added' || item.event_type == 'edx.bookmark.listed' || item.event_type == 'edx.bookmark.removed') {
                table5.push(item)
              } else if (item.event_type == 'edx.forum.comment.created' || item.event_type == 'edx.forum.response.created' || item.event_type == 'edx.forum.response.voted' || item.event_type == 'edx.forum.searched' || item.event_type == 'edx.forum.thread.created' || item.event_type == 'edx.forum.thread.voted') {
                table6.push(item)
              }
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
        )
        setEventData({ table1, table2, table3, table4, table5, table6 });
      })
  }, [])


  return (
    <Router>
      {
        eventData ?
          <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

              {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}

              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className='nav-link' to="/">Home<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/event1">Enrollment Events</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/event2">Navigational Events</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/event3">Video Interaction Events</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/event4">Problem Interaction Events</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/event5">Bookmark Events</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/event6">Discussion Forum Events</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/event1" element={<Table data={eventData.table1} />} />
              <Route path="/event2" element={<Table data={eventData.table2} />} />
              <Route path="/event3" element={<Table data={eventData.table3} />} />
              <Route path="/event4" element={<Table data={eventData.table4} />} />
              <Route path="/event5" element={<Table data={eventData.table5} />} />
              <Route path="/event6" element={<Table data={eventData.table6} />} />
            </Routes>
          </div> :
          <div style={{ width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center',display:'flex' }}>
            <BarLoader color="black" size={58} cssOverride={{width:'200px'}} />
    </div>
          
      }

    </Router>

  );
};

export default memo(App);
