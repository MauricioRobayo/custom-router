import moment from "moment";

export default function Module3() {
  const date = moment().format("MMMM Do YYYY");
  return <div>{date}</div>;
}
