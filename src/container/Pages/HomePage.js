import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import {
  getFormattedTime,
  getModifiedTime,
  getTotalHours,
  getTotalMinutes,
} from "../../basic/helpers";
import {
  addRecord,
  deleteRecord,
  updateRecord,
} from "../../redux/actions/homePageActions";
import "../../styles/HomePage.css";
import { Button } from "react-bootstrap";
import moment from "moment/moment";

const HomePage = () => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({});
  const [selectDate, setSelectDate] = useState(false);
  const [customRecords, setCustomRecords] = useState([]);
  const [userRecords, setUserRecords] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const records = useSelector(
    (state) => state.rootReducer.homePageReducer.records
  );
  const showCustomDateRecords = () => {
    if (records && records.length > 0) {
      const newRecords = records.filter((record) => {
        const dateString = moment(record.date).toDate();
        return moment(dateString).format("YYYY-MM-DD") === selectDate;
      });
      setCustomRecords(newRecords);
    }
  };

  /*---- INPUT RELATED FUNCTIONS ---*/
  const handleInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleEditRecord = (id) => {
    setIsEditMode(true);
    const newRecords = records.find((rec) => rec.id === id);
    setUserInput(newRecords);
  };

  /*---- API RELATED FUNCTIONS ---*/
  const handleAddRecord = (e) => {
    const newRecords = {
      id: uuid(),
      date: moment(),
      startTime: e.target.startTime.value,
      endTime: e.target.endTime.value,
      taskDescription: e.target.taskDescription.value,
    };
    if (records && records.length > 0) {
      const allRecords = [...records, newRecords];
      dispatch(addRecord(allRecords));
    } else {
      dispatch(addRecord(newRecords));
    }
  };
  const handleUpdateRecord = (e) => {
    const newRecords = {
      id: userInput.id,
      date: moment(),
      startTime: e.target.startTime.value,
      endTime: e.target.endTime.value,
      taskDescription: e.target.taskDescription.value,
    };
    if (records && records.length > 0) {
      dispatch(updateRecord(newRecords));
    }
  };
  const handleDeleteRecord = (id) => {
    dispatch(deleteRecord(id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      handleUpdateRecord(e);
    } else {
      handleAddRecord(e);
    }
    setIsEditMode(false);
    setUserInput({});
    e.target.reset();
  };

  /*---- UI RELATED FUNCTIONS ---*/
  const tableFilterSection = () => (
    <>
      <div className="container d-flex justify-content-center">
        <div className=" filter-date-section">
          <div>Select Date :</div>
          <div>
            <Form.Control
              type="date"
              name="selectCustomDate"
              className="ms-2"
              onChange={(e) => setSelectDate(e.target.value)}
              value={selectDate}
            />
          </div>
          <Button onClick={showCustomDateRecords}>Load</Button>
          <Button>Export Timesheet as PNG</Button>
        </div>
      </div>
      <div className="w-100">
        <hr />
      </div>
    </>
  );
  const tableAddDataSection = () => (
    <Form onSubmit={handleSubmit}>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="add-date-section">
          <div>
            <div>Select Start Time</div>
            <Form.Control
              type="time"
              name="startTime"
              placeholder="Start Time"
              className="ms-2"
              onChange={handleInputChange}
              value={userInput.startTime}
              required
            />
          </div>
          <div>
            <div>Select End Time</div>
            <Form.Control
              type="time"
              name="endTime"
              placeholder="End Time"
              className="ms-2"
              onChange={handleInputChange}
              value={userInput.endTime}
              required
            />
          </div>
          <div>
            <div>Task Description</div>
            <Form.Control
              type="input"
              name="taskDescription"
              placeholder="Enter Task Description"
              onChange={handleInputChange}
              value={userInput.taskDescription}
              required
            />
          </div>
          <Button type="submit">
            {isEditMode ? "Update Record" : "Add Record"}
          </Button>
        </div>
      </div>
    </Form>
  );
  const recordDataSection = () => (
    <>
      {userRecords && userRecords.length > 0 ? (
        <>
          <div className="container d-flex justify-content-center my-3 text-light">
            <Table striped bordered hover className="text-light">
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Minutes</th>
                  <th>Task Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="text-light">
                      {getFormattedTime(record.startTime)}
                    </td>
                    <td className="text-light">
                      {getFormattedTime(record.endTime)}
                    </td>
                    <td className="text-light">
                      {getModifiedTime(record.startTime, record.endTime)}
                    </td>
                    <td className="text-light">{record.taskDescription}</td>
                    <td className="text-light actions">
                      <Button onClick={() => handleEditRecord(record.id)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteRecord(record.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div>Day Total In Minutes : {getTotalMinutes(records)}</div>
          <div>Day Total In Hours : {getTotalHours(records)}</div>
        </>
      ) : (
        <div className="my-5">
          No Records Available yet, Please add some records to show
        </div>
      )}
    </>
  );

  useEffect(() => {
    if (selectDate) {
      if (customRecords && customRecords.length > 0) {
        setUserRecords(customRecords);
      } else {
        setUserRecords([]);
      }
    } else {
      if (records && records.length > 0) {
        setUserRecords(records);
      }
    }
  }, [selectDate, customRecords]);
  useEffect(() => {
    if (records && records.length > 0) {
      setUserRecords(records);
    }
  }, [records]);

  return (
    <div>
      <p className="my-3">Time logger </p>
      {tableFilterSection()}
      {tableAddDataSection()}
      {recordDataSection()}
    </div>
  );
};

export default HomePage;
