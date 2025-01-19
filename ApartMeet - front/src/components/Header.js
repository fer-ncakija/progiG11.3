import {useState} from 'react'
import { Link } from 'react-router-dom'
import profilna_icon from "../assets/profilna.png";
import menu_icon from "../assets/menu.png";

export default function Header(props) {
    //funkcija preko propsa prima username i ulogu osobe

    const [openDropdown, setDropdown] = useState(false)

    //funkcija koja kada je stisnut gumb menua mijenja state za dropdown da se otvori
    function handleDropdown() {
        setDropdown(
            prevState => !prevState
        )
    }

    function logout() {
        props.onLogout();
    }

    return(
        <header>
            <div className="header-menu-name">
                <img src={menu_icon} className="header-menu" onClick={handleDropdown}></img>
                
                <Link to={"/"} className='link'>
                    <h1 className="header-name">APARTMEET</h1>
                </Link>
            </div>
            <div className="header-user">
                <p className="header-user-name">{props.userName}</p>
                <img src={profilna_icon} className="header-profile"></img>
            </div>
            {openDropdown && <div className="header-dropdown">
                <Link to="/" className='link'>
                    <p>SASTANCI</p>
                </Link>
                <hr/>
                {(props.role === "stanar" || props.role === "predstavnik") && <Link to="/promijeniLozinku" className='link'><p>PROMIJENI LOZINKU</p></Link> }
                {(props.role === "stanar" || props.role === "predstavnik") && <hr/>}
                <Link to="/dodajClana" className='link'>{props.role === "admin" && <p>DODAJ ČLANA</p>}</Link>
                {props.role === "admin" && <hr/>}
                {props.role === "admin" && <Link to="/obrisiClana" className='link'><p>OBRIŠI ČLANA</p></Link> && <hr/>}
                <Link to="/" className='link' onClick={logout}>ODJAVI SE</Link>

            </div>}
        </header>
    )
    
}