import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div className="container mx-auto my-8 h-full flex justify-center items-center font-plex">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <div>
            <h1 className="font-plex mb-6 font-xl text-center uppercase tracking-widest">
              Login to buy skis
            </h1>
            <div className="border-tahiti p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="font-bold uppercase text-grey-darker block mb-2"
                >
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="Your username"
                  className="bg-gray-50 border border-stone text-stone text-sm rounded-lg focus:ring-tahiti focus:border-tahiti block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="font-bold uppercase text-grey-darker block mb-2"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Your password"
                  className="bg-gray-50 border border-stone text-stone text-sm rounded-lg focus:ring-tahiti focus:border-tahiti block w-full p-2.5"
                />
              </div>
              <div className="text-center my-4">
                <button
                  type="submit"
                  className="bg-pool hover:bg-tahiti text-white font-bold py-2 px-8 rounded text-center uppercase tracking-widest"
                >
                  {displayName}
                </button>
              </div>
              <div>
                {displayName === 'Login' && (
                  <p className="italic font-xs">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-pool hover:text-tahiti">
                      Create one here.
                    </a>
                  </p>
                )}
              </div>
              {error && <div> {error} </div>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
