App.Router.route('/login', 'Login', 'guest');
App.Router.route('/register', 'Register', 'guest');
App.Router.route('/register/email-confirmation', 'EmailConfirmation', 'guest');
App.Router.route('/register/activate', 'Activate', 'guest');
App.Router.route('/', 'Home', 'User');
App.Router.route('/home', 'Home', 'User');
