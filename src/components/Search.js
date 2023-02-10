import React from "react";
import { FaSistrix, FaMicrophone } from "react-icons/fa";
import axios from "axios";
import Show from "./Show";
import { DarkModeToggle } from "react-dark-mode-toggle-2";
import logo from '../images/logo2.png';

const Search = (props) => {

    const [isDarkMode, setIsDarkMode] = React.useState(localStorage.getItem('data-theme') === 'dark' ? true : false)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newColorScheme = e.matches ? 'dark' : 'light'

        setIsDarkMode(newColorScheme === 'dark' ? true : false)
        localStorage.setItem('data-theme', newColorScheme)
        document.body.setAttribute('data-theme', localStorage.getItem('data-theme'))
    })

    const handleChangeTheme = () => {
        setIsDarkMode(!isDarkMode)
        if (!isDarkMode) {
            localStorage.setItem('data-theme', 'dark')
            document.body.setAttribute('data-theme', 'dark')
        } else {
            localStorage.setItem('data-theme', 'light')
            document.body.setAttribute('data-theme', 'light')
        }
    }

    const goBack = () => {
        props.history.push("/");
    };

    const [state, setState] = React.useState(
        props.location.state ? props.location.state : ""
    );

    const [results, setResults] = React.useState([]);
    const [info, setInfo] = React.useState("");

    const searchGoogle = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY}&cx=${process.env.REACT_APP_CX_KEY}&q=${state}`
            );
            if (response) {
                setResults(response.data.items);
                setInfo(response.data.searchInformation);
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        async function getPosts() {
            if (props.location.state) {
                try {
                    const response = await axios.get(
                        `https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY}&cx=${process.env.REACT_APP_CX_KEY}&q=${state}`
                    );
                    if (response) {
                        setResults(response.data.items);
                        setInfo(response.data.searchInformation);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getPosts();
    }, []);

    return (
        <div className="search">
            <DarkModeToggle
                onChange={handleChangeTheme}
                isDarkMode={isDarkMode}
                className="dark"
            />
            <div className="search__form">
                <div className="search__form-logo">
                    <img src={logo} alt="logo" onClick={goBack} />
                </div>
                <div className="search__form-input">
                    <form className="home__form" onSubmit={searchGoogle}>
                        <input
                            type="text"
                            className="home__input"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />

                        <FaSistrix className="search__icon" />
                        <FaMicrophone className="microphone" />
                    </form>
                </div>
            </div>
            <Show results={results} info={info} />
        </div>
    );
};

export default Search;
