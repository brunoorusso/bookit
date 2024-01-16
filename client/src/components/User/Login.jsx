import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Login(props){
    const { onRegisterClick } = props;

    const [userData, setUserData] = useState({
      email: '',
      password: ''
    })

    const handleInputChange = (event) => {
      const {name, value} = event.target;

      //Atualizar dados
      setUserData((prevData) => ({
          ...prevData,
          [name] : value
      }))

      console.log(userData);

  };

    const handleSubmit = async(ev) => {
      ev.preventDefault();

      try{
          //Chamada à API
          const response = await api.post('/users/login', userData);
          console.log("Resposta da API: ", response.data);
          
          //Limpar form
          setUserData({
              email: '',
              password: ''
          });
      } catch(error){
          console.error('Erro ao enviar dados', error);
      }
  }
    
    return(
    <div className="bg-primary w-full overflow-hidden">
        <div className="flex min-h-full flex-col justify-center px-18 py-24 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-bold leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={userData.email}
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
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
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

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">Create your account</Link>
          </p>
        </div>
    </div>  
    )
}