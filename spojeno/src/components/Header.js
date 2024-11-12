import {useState} from 'react'

export default function Header(props) {
    //funkcija preko propsa prima username i ulogu osobe

    const [openDropdown, setDropdown] = useState(false)

    //funkcija koja kada je stisnut gumb menua mijenja state za dropdown da se otvori
    function handleDropdown() {
        setDropdown(
            prevState => !prevState
        )
    }

    return(
        <header>
            <div className="header-menu-name">
                <img src="./images/menu.png" className="header-menu" onClick={handleDropdown}></img>
                <h1 className="header-name">APARTMEET</h1>
            </div>
            <div className="header-user">
                <p className="header-user-name">{props.userName}</p>
                <img src="./images/profilna.png" className="header-profile"></img>
            </div>
            {openDropdown && <div className="header-dropdown">
                <p>SASTANCI</p>
                <hr/>
                {(props.role === "stanar" || props.role === "predstavnik") && <p>PROMIJENI LOZINKU</p>}
                {props.role === "administrator" && <p>DODAJ ČLANA</p>}
                {props.role === "administrator" && <hr/>}
                {props.role === "administrator" && <p>OBRIŠI ČLANA</p>}
            </div>}
        </header>
    )
    
}