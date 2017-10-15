const env = process.env;
const nodeEnv = env.NODE_ENV || 'development';



const config = {
    port: env.PORT || 3000,
    PUBLIC_URL: 'PublicRedirectionUrlIfNecessary',
    secret : 'YourSuperSecret',
    dbName: 'databaseName',

    // For nodemailer configuration
    emailConfig: {
    	host: 'smtp.exemple.com',
	    port: 587,
	    secure: false,
	    tls: {
	        rejectUnauthorized: false
	    },
        auth: {
            user: 'nicolas@exemple.com', // Your email id
            pass: 'password' // Your password
        }
    }
}

module.exports = config;