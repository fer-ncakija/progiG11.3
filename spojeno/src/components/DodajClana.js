import {useState} from 'react'
import './DodajClana.css'

export default function() {

    //state koji cuva unesene podatke
    const [formData, setFormData] = useState(
        {
            userName:"",
            email:"",
            password:""
        }
    )

    //pri svakom upisu u input se azurira formData
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
            ...prevFormData,
            [event.target.name]: event.target.value            
            } 
        })
    }

    //trenutno se podaci nakon sto se stisne gumb za dodavanje ispisuju
    //treba povezati u bazu nakon sto dode backend
    function handleSubmit(event) {
        event.prventDefault()
        console.log(formData)
    }


    return(
        <div className='meeting-container'>
            <form onSubmit={handleSubmit} >
                <div className='dodajclana-form'>
                    <div className='form-line'>
                        <p>Korisničko ime:</p>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="userName"
                            value={formData.userName} />
                    </div>
                    <div className='form-line'>
                        <p>E-mail:</p>
                        <input
                            type="email"
                            onChange={handleChange}
                            name="email"
                            value={formData.email} />
                    </div>
                    <div className='form-line'>
                        <p>Lozinka:</p>
                        <input
                            type="password"
                            onChange={handleChange}
                            name="password"
                            value={formData.password} />
                    </div>
                </div>
                
                <div className='button-div'>
                    <button>Dodaj člana</button>
                </div>

            </form>
        </div>
    )
}