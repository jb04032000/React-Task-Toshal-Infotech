import moment from "moment";
import { Spinner } from "react-bootstrap";

export const loader = () => {
  return <Spinner animation="border" />;
};

export const getFormattedTime = (time) => moment(time, "hh:mm").format("LT");

export const getModifiedTime = (startTime, endTime, formate = "minutes") => {
  const formattedStartTime = moment(
    moment(startTime, "hh:mm").format("LT"),
    "HH:mm:ss a"
  );
  const formattedEndTime = moment(
    moment(endTime, "hh:mm").format("LT"),
    "HH:mm:ss a"
  );
  // calculate total duration
  const duration = moment.duration(formattedEndTime.diff(formattedStartTime));
  if (formate === "minutes") {
    return Math.abs(parseInt(duration.asMinutes()));
  } else {
    return Math.abs(parseInt(duration.asHours()));
  }
};

export const getTotalMinutes = (records) => {
  const listofMinutes = records.map((record) =>
    getModifiedTime(record.startTime, record.endTime)
  );
  let sum = 0;
  for (const item of listofMinutes) {
    sum += item;
  }
  return sum;
};

export const getTotalHours = (records) => {
  const listofHours = records.map((record) =>
    getModifiedTime(record.startTime, record.endTime, "hours")
  );
  let sum = 0;
  for (const item of listofHours) {
    sum += item;
  }
  return sum;
};

export const setRecordsInStorage = (records) => {
  return localStorage.setItem("records", JSON.stringify(records));
};

export const getRecordsFromStorage = () =>
  localStorage.getItem("records") || [];
