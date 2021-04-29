import { useState } from "react"

//https://tailwindui.com/components/application-ui/navigation/navbars
/* This example requires Tailwind CSS v2.0+ */
export default function Nav() {
    const navigation = [
        { name: 'All Quizzes', href: '/quizzes' },
        { name: 'Make Quiz', href: '#' },
        { name: 'Liked Quizzes', href: '#' },
        { name: 'Source Code', href: 'https://github.com/Fattimo/quiz-app', target: "_blank" },
      ]

    const [dropdown, setDropdown] = useState(false);
    const expandMobile = () => {
        setDropdown(!dropdown)
    }

  return (
    <nav className="bg-gray-800 mb-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/** Mobile menu button{*/ }
                <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={expandMobile}>
                <span className="sr-only">Open main menu</span>
                {!dropdown ?
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                :<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                }
                </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                {/*TODO: Replace logo with personal stuff*/}
                <div className="flex-shrink-0 flex items-center">
                <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
                <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"/>
                </div>
                <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                {navigation.map((item, index) => (<DashLink item={item} key={index}></DashLink>))}
                </div>
                </div>
            </div>
            {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="ml-3 relative">
                <div>
                    <button type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Profile (Unimplemented)</a>
                    </button>
                </div>
                </div>
            </div> */}
            </div>
        </div>

        {/** Mobile menu, show/hide based on menu state. {*/ }
        <div className="sm:hidden" id="mobile-menu">
            {dropdown ? 
            <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item, index) => (<MobileLink item={item} key={index}></MobileLink>))}
            </div>
           : ""}
        </div>
        </nav>
  )
}

const MobileLink = (props) => (
    <a href={props.item.href} target={props.item.target} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{props.item.name}</a>
)

const DashLink = (props) => (
    <a href={props.item.href} target={props.item.target} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{props.item.name}</a>
)

