// import React, { useState } from "react";
// import ColumnSelect from "react-column-select";

// export default function HobbiesSelect({ id, labelText }) {
//   const [selected, setSelected] = useState([]);

//   const hobbies = [
//     { value: "1", label: "Hockey" },
//     { value: "2", label: "Painting" },
//     { value: "3", label: "Singing" }
//   ];

//   const onChange = values => {
//     setSelected(values);
//   };

//   return (
//     <div>
//       {labelText ? (
//         <label htmlFor={id} className="m-0">
//           {labelText}
//         </label>
//       ) : (
//         ""
//       )}

//       {/* <h2>Select Your Hobbies</h2> */}
//       <ColumnSelect
//         options={hobbies}
//         onChange={onChange}
//         leftHeader="Available Hobbies"
//         rightHeader="Selected Hobbies"
//         theme={{
//           buttonBgColor: "#CBD5E0",
//           columnBgColor: "#CBD5E0",
//           columnBorderColor: "#CFA4FF",
//           headerBgColor: "rgba(95, 141, 244, 1)",
//           optionHoverBgColor: "#FAFBFC",
//           optionSelectedBgColor: "#EDF2F7",
//           searchFocusBorderColor: undefined,
//           textColor: "#4e4e4e"
//         }}
//       />
//     </div>
//   );
// }

// // buttonBgColor = "#CBD5E0";
// // columnBgColor = "#CBD5E0";
// // columnBorderColor = "#CFA4FF";
// // headerBgColor = "rgba(95, 141, 244, 1)";
// // optionHoverBgColor = "#FAFBFC";
// // optionSelectedBgColor = "#EDF2F7";
// // textColor = "#4e4e4e";

