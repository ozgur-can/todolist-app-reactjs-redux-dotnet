import React from "react";

const dateChecker = date => {
  var regexCode = new RegExp(
    "^((0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])[-](19|20)?[0-9]{2})*$"
  );
  return regexCode.test(date);
};

export const verifyDate = date => {
  // check if date for example 23-8-2019, make it 23-08-2019
  let tempDateURL = date.split("-");

  if (tempDateURL[0].length === 1) tempDateURL[0] = "0".concat(tempDateURL[0]);
  if (tempDateURL[1].length === 1) tempDateURL[1] = "0".concat(tempDateURL[1]);
  return tempDateURL.join("-");
};

const DateData = props => {
  return dateChecker(props.match.params.datedata) ? (
    <div>
      <time>{verifyDate(props.match.params.datedata)}</time>
    </div>
  ) : (
    <div>
      <time>Wrong time format! need /dd-mm-yyyy in URL</time>
    </div>
  );
};
export default DateData;
