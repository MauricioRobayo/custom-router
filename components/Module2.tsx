import _ from "lodash";

export default function Module2() {
  const partition = _.partition([1, 2, 3, 4], (n) => n % 2);
  return <div>{JSON.stringify(partition, null, 2)}</div>;
}
