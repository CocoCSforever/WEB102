/*
.map() only works on arrays, not objects. to map over an object, you must convert it to an array first — and that’s what Object.entries, Object.keys, or Object.values help you do.
Method              Output                                              Use when you want
Object.keys(obj)    ["name", "age"] (array of keys)                     Just the keys
Object.values(obj)  ["Alice", 25] (array of values)                     Just the values
Object.entries(obj) [["name", "Alice"], ["age", 25]] (keys + values)    Both keys and values
*/

const APIForm = ({inputs, handleChange, onSubmit}) => {
    const inputsInfo = [
        "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
        "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
        "Input true or false if you would like your website screenshot to not contain any ads",
        "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
        "Choose the width of your screenshot (in pixels)",
        "Choose the height of your screenshot (in pixels)",
    ];

    return (
        <div>
            <h2>Select Your Image Attributes:</h2>
            <form className="form-container">
                {inputs &&
                    Object.entries(inputs).map(([category, value], index) => {
                        return (
                            <li className="form" key={index}>
                                <h2>{category}</h2>
                                <input
                                    type="text"
                                    name={category}
                                    value={value}
                                    placeholder="Input this attribute"
                                    onChange={handleChange}
                                    className="textbox"
                                />
                                <br />
                                <br />
                                <p> {inputsInfo[index]} </p>
                            </li>
                        );
                    })}
            </form>
            <button type="submit" onClick={onSubmit}>Take that Pic! 🎞</button>
        </div>
    );
}

export default APIForm;
