import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Register(){
    const [userData, setUserData] = useState({
            name: '',
            email: '',
            phone: '',
            password: '',
            isCompany: false
        });

    const navigate = useNavigate();
    
    const handleInputChange = (event) => {
        const {name, value, type, checked} = event.target;

        const inputValue = type === 'checkbox' ? checked : value;

        //Atualizar dados
        setUserData((prevData) => ({
            ...prevData,
            [name] : inputValue
        }))
    };

    const handleSubmit = async(ev) => {
        ev.preventDefault();

        try{
            //Chamada à API
            const response = await api.post('/users/register', userData);
            console.log("Resposta da API: ", response.data);
            
            //Limpar form
            setUserData({
                name: '',
                email: '',
                phone: '',
                password: '',
                isCompany: false
            });

            navigate('/login');
        } catch(error){
            console.error('Erro ao enviar dados', error);
        }
    }
    

    return(
        <div className="bg-primary w-full overflow-hidden">
        <div className="flex min-h-full flex-col justify-center px-18 py-24 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Welcome to Bookit!</h2>
            </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-bold leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-bold leading-6 text-gray-900">
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={userData.phone}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-bold leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={userData.password}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex items-center justify-auto">
            <div className="mt-2">
              <input
                id="isCompany"
                name="isCompany"
                type="checkbox"
                checked={userData.isCompany}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
              />
            </div>
            <label
              htmlFor="isCompany"
              className="block text-sm font-bold leading-6 text-gray-900 ml-2"
            >
              Company Account
            </label>
          </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
    </div>  
    )
}