function Error(props) {
    return (
        <div className="mt-3 text-center text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-2xl mx-auto md:mt-5 md:text-lg">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-10 text-center">
            <span className="block inline uppercase tracking-widest text-gray-700">Error page</span>
            </h1>
            <p> Most likely a faulty id was input into the url. </p>
        </div>
    );
}

export default Error