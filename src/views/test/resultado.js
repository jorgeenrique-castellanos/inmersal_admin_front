import React from "react";
import Primer from "./primer"
import Segundo from "./segunda";
import FunctionAsChild from "./FunctionAsChild";

// export default   () =>   Primer(Segundo)

export default () => {
return (<FunctionAsChild>
    {(name) => <div>Hello, {name}!</div>}
</FunctionAsChild>
)}
