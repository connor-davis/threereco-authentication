import { database, user } from "../../utils/gun";

/**
 * This function will check the graph for the users chosen alias and if it is
 * already taken it will return false in the Promise.
 * 
 * @param {String} alias
 * 
 */
 let aliasExists = (alias) =>
 new Promise((resolve, _) => {
   database.get(`~@${alias}`).once((data) => {
     if (data) resolve(true);
     else resolve(false);
   });
 })

/**
* This method will sign up a new user in using their credentials. It will also run a check to make sure that the id is unique. This will prevent duplicate accounts using the same identifcation.
*
* @param {Object} credentials 
* @param {String} credentials.id
* @param {String} credentials.password
* 
* @param {Function} callback The callback provides either an error message and code or the users soul if a successfull registration took place.
*/
let register = (credentials = {}, callback = () => { }) => {
 if (!credentials.id || !credentials.password)
   return callback({
     errMessage: 'Please specify required credentials.',
     errCode: 'invalid-credentials',
   });
 else {
   (async () => {
     let exists = await aliasExists(credentials.id);

     if (!exists)
       user.create(credentials.id, credentials.password, (response) => {
         console.log("Created a new user.");

         if (response.err)
           return callback({
             errMessage: response.err,
             errCode: 'gun-create-error',
           });
         else {
           return callback({
             errMessage: undefined,
             errCode: undefined,
             soul: response.pub,
           });
         }
       });
     else callback({ errMessage: 'ID Number already taken.', errCode: 'alias-taken' });
   })();
 }
};

export default register;