import { useState } from "react";

function useInput(value) {
    const [input, setInput] = useState(value)

    function inputChangeHandler(event) {
        setInput(event.target.value)
    }

    return [input, inputChangeHandler]
}

export default useInput