import React from "react";
import { FaSistrix, FaMicrophone } from "react-icons/fa";
import { DarkModeToggle } from "react-dark-mode-toggle-2";

const Home = (props) => {

    const [state, setState] = React.useState("");

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

    const searchGoogle = (e) => {
        props.history.push({ pathname: "/search", state });
    };

    return (
        <div className="home">
            <DarkModeToggle
                onChange={handleChangeTheme}
                isDarkMode={isDarkMode}
                className="dark"
            />
            <div className="home__container">
                <div className="home__logo">
                    <img src="/images/logo2.png" alt="Logo" className="logo2" />
                    <h1>GSL</h1>
                </div>
                <form className="home__form" onSubmit={searchGoogle}>
                    <input
                        type="text"
                        className="home__input"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        required
                    />
                    <div className="home__group">
                        <input type="submit" className="home__btn" value="GSL Search" />
                    </div>
                    <FaSistrix className="search__icon" />
                    <FaMicrophone className="microphone" />
                </form>
            </div>
        </div>
    );
};

export default Home;
