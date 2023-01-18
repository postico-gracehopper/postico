import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [initialUsernameRender, setInitialUsernameRender] = useState(true);
  const [initialPasswordRender, setInitialPasswordRender] = useState(true);
  const [initialEmailRender, setInitialEmailRender] = useState(true);
  const [displayTooltip, setDisplayTooltip] = useState(false);

  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    // const username = evt.target.username.value;
    // const password = evt.target.password.value;
    // const email = evt.target.email.value;
    if (displayName === 'login') {
      if (username && password) {
        setDisplayTooltip(false);
        dispatch(authenticate({ username, password, method: formName }));
      } else {
        setInitialUsernameRender(false);
        setInitialPasswordRender(false);
        setInitialEmailRender(false);
        setDisplayTooltip(true);
      }
    } else {
      if (username && password && email) {
        setDisplayTooltip(false);
        dispatch(authenticate({ username, password, email, method: formName }));
      } else {
        setInitialUsernameRender(false);
        setInitialPasswordRender(false);
        setInitialEmailRender(false);
        setDisplayTooltip(true);
      }
    }
  };

  const handleError = (error) => {
    console.log('ERROR: ', error);
    if (error.split(': ')[0] === 'Validation error') {
      const errors = error.split(/\r?\n/).map((e) => e.split(': ')[1]);
      console.log(errors);
      const message = errors.map((e) => `${e.split(',')[0]} already exists. `);
      return message;
    } else return error;
  };

  return (
    <div className="container mx-auto my-8 h-full flex justify-center items-center font-plex">
      <form onSubmit={handleSubmit} name={name} className="block">
        <div className="block">
          <div className="block">
            {displayName === 'Login' ? (
              <h1 className="font-plex mb-6 font-xl text-center uppercase tracking-widest block">
                Login
              </h1>
            ) : (
              <h1 className="font-plex mb-6 font-xl text-center uppercase tracking-widest block">
                Create an account
              </h1>
            )}
            <div className="border-tahiti p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg block">
              <div className="mb-4 block">
                <label
                  htmlFor="username"
                  className="font-bold uppercase text-grey-darker mb-2 block"
                >
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="Your username"
                  className="bg-gray-50 border border-stone text-stone text-sm rounded-lg focus:ring-tahiti focus:border-tahiti w-full p-2.5 block"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setInitialUsernameRender(false);
                  }}
                />
                {username || initialUsernameRender ? null : (
                  <small style={{ color: 'red' }}>Enter a username</small>
                )}
              </div>
              <div className="block">
                <label
                  htmlFor="password"
                  className="font-bold uppercase text-grey-darker mb-2 block"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Your password"
                  className="bg-gray-50 border border-stone text-stone text-sm rounded-lg focus:ring-tahiti focus:border-tahiti w-full p-2.5 block"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setInitialPasswordRender(false);
                  }}
                />
                {password || initialPasswordRender ? null : (
                  <small style={{ color: 'red' }}>Enter a password</small>
                )}
              </div>
              {displayName === 'Sign Up' ? (
                <div className="block">
                  <label
                    htmlFor="email"
                    className="font-bold uppercase text-grey-darker mb-2 block"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-50 border border-stone text-stone text-sm rounded-lg focus:ring-tahiti focus:border-tahiti w-full p-2.5 block"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setInitialEmailRender(false);
                    }}
                  />
                  {email || initialEmailRender ? null : (
                    <small style={{ color: 'red' }}>Enter an email</small>
                  )}
                </div>
              ) : (
                <></>
              )}
              <div className="text-center my-4 block">
                <button
                  type="submit"
                  className="bg-pool hover:bg-tahiti text-white font-bold py-2 px-8 rounded text-center uppercase tracking-widest"
                >
                  {displayName}
                </button>
              </div>
              <div className="block">
                {displayName === 'Login' && (
                  <p className="italic font-xs">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-pool hover:text-tahiti">
                      Create one here.
                    </a>
                  </p>
                )}
              </div>
              {error && (
                <div style={{ color: 'red' }}>{handleError(error)}</div>
              )}
              {displayTooltip && (
                <div style={{ color: 'red' }}>
                  Please enter required fields.
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
