"use client";
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sideProfile, setSideProfile] = useState(false);
  const [alertPanel, setAlertPanel] = useState(false);
  const getCurrentDateFormatted = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  function dateDifference(date1, date2) {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const differenceInMilliseconds = Math.abs(firstDate - secondDate);
    const millisecondsInOneDay = 24 * 60 * 60 * 1000;
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / millisecondsInOneDay
    );

    return differenceInDays;
  }
  return (
    <AppContext.Provider
      value={{ sideProfile, setSideProfile, alertPanel, setAlertPanel ,dateDifference,getCurrentDateFormatted}}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
