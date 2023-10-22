import { Hourglass } from "react-loader-spinner";

export default function Loading() {
  return (
    <Hourglass
      visible={true}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass="mt-8"
      colors={["#4825e3", "#7b6bcc"]}
    />
  );
}
