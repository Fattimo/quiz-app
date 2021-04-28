const Dropdown = (props) => {
    const handleSelect = selection => e => {
        props.toggle()
        props.setter(selection)
    }
    return (
        <div className="relative inline-block text-left mx-3">
            <div className="flex justify-between">
                <button type="button" onClick={props.toggle} className={`inline-flex justify-end rounded-md w-${props.width || "auto"} border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-${props.decorator ? props.selection : 'indigo'}-500 capitalize`} id="menu-button" aria-expanded="true" aria-haspopup="true">
                    <div className="flex justify-end items-center">
                        <div className={props.decorator ? "pr-1" : ""}>{props.selection}</div>
                        {props.decorator ? <div className={`w-3 h-3 bg-${props.selection}-500`}/> : ""}
                    </div>
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className={`${props.show ? "block" : "hidden"} max-h-32 origin-top-right z-10 absolute right-0 mt-2 w-auto px-2 py-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div className="py-1 max-h-28 overflow-auto" role="none">
                {props.options.map((item, index) => (
                    <button className="flex justify-end items-center w-full hover:bg-gray-50" onClick={handleSelect(item)} key={index}>
                    <div className="text-gray-700 block pl-3 pr-1.5 py-1.5 text-sm capitalize">{item}</div>
                    {props.decorator ? <div className={`w-4 h-4 bg-${item}-500`}/> : ""}
                    </button>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Dropdown