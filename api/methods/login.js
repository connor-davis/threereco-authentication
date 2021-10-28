import { user } from "../../utils/gun";

/**
 * This method will sign an existing user in using their credentials.
 *
 * @param {Object} credentials 
 * @param {String} credentials.id
 * @param {String} credentials.password
 * 
 * @param {Function} callback The callback provides either an error message and code or the users soul if a successfull login took place.
 */
let login = (credentials = {}, callback = () => { }) => {
    if (!credentials.id || !credentials.password)
        return callback({
            errMessage: 'Please specify required credentials.',
            errCode: 'invalid-credentials',
        });
    else {
        user.auth(credentials.id, credentials.password, (response) => {
            if (response.err)
                return callback({
                    errMessage: response.err,
                    errCode: 'gun-auth-error',
                });
            else {
                return callback({
                    errMessage: undefined,
                    errCode: undefined,
                    soul: response.soul.replace('~', ''),
                });
            }
        });
    }
};

export default login;