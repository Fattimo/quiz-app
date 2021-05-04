function About(props) {
    return (
        <div className="mt-3 text-center text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-2xl mx-auto md:mt-5 md:text-lg">
            <p>
            Tool created by&nbsp;
            <a className = "text-blue-400 underline" href="https://www.linkedin.com/in/matt-chen-050798192">Matt Chen</a>
            &nbsp;to make and take multiple choice quizzes! 
            Created using React, Express, and PostgreSQL (for now).
            </p>
            <br/>
            <p >
                The core functionality of the app is done, which is making and taking quizzes! To make a quiz, just click the Make Quiz button.
                To take a quiz, click on the title of the quiz cards on the All Quizzes page. Finally, you can also edit a quiz, and to do that just
                click the pen next to the title on the All Quizzes page.
            </p>
            <br/>
            <p>
                Planned features that will be complete soon (if not complete already) is manipulation of local storage to save liked quizzes and store
                highest score attempts, general UI updates to improve user experience, search, Jest test suites (on development side), 
                saves on API calls (development), using a custom hook rather than a weird overbloated container for the quiz state management (development), 
                and general styling changes.
            </p>
            <br/>
            <p>
                Once those are finished, this proof of concept phase 1 will be complete, and then I'll be migrating it to be a full blown
                Nextjs/Apollo/GraphQL application with user authentication, which will include a whole slew of other features.
            </p>
            <br/>
            <p>
                Feel free to reach out to me if you have any suggestions for the application!
            </p>
        </div>
    );
}

export default About