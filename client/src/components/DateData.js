import React from "react";

const dateChecker = date => {
  var regexCode = new RegExp(
    "^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$"
  );
  return regexCode.test(date);
};

const DateData = props =>
  dateChecker(props.match.params.datedata) ? (
    <div>
      <time>{props.match.params.datedata}</time>
    </div>
  ) : (
    <div>
      <time>Wrong time format! need /dd-mm-yyyy in URL</time>
    </div>
  );
export default DateData;
