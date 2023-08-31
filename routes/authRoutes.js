const express = require('express')
const router = express.Router()
// const authController = require('../controllers/authController')

// router.route('/')
//     .get(authController.getAllNotes)
//     // .post(authController.createNewNote)
//     .patch(authController.updateNote)
//     .delete(authController.deleteNote)






const axios = require('axios');


const getData = async (body) => {
  console.log(body);
      const options = {
        'method': 'POST',
        'url': `https://api.miro.com/v1/oauth/token?grant_type=authorization_code&client_id=3458764560345376881&client_secret=Ut9LixsPne5ukQbVSPRsqtbfOoUV6QA2&code=${body}&redirect_uri=http://localhost:3000/dash/authorize`,
        'headers': {
          'accept': 'application/json'
        },
        data: {
          body
        }
      };
    
      try {
        const result = await axios(options);
        // console.log("result")
        // console.log(result)
        // console.log(body);
        return result;
      } catch (e) {
          //  console.log("e.response.data");
          //  console.log(e.response.data);
          // console.log("e")
          // console.log(e)
           return e;
      }
}


    
router.route('/').post(async function(req, res) {
       //make a call to another rest api and then res.send the result
      try {
        // console.log("req.body")
        // console.log(req.body)
        const response = await getData(req.body.code);
        // console.log("response")
        // console.log(response)
        // console.log("response.data.access_token before")
        // console.log(response.data.access_token)
        // console.log("response.response")
        // console.log(response.response)
        // console.log("response.response.data.message.slice(0,27)")
        // console.log(response.response.data.message.slice(0,26))
        if ( response.response){
          // console.log("Please authorize again, due to invalid authorization code from Miro")
          return res.status(401).json({ message: 'Please authorize again, due to invalid authorization code from Miro' })
        }
        // JSON.parse(e.request.responseText).message
        console.log("response.data.access_token")
        console.log(response.data.access_token)
        res.json(response.data.access_token); 
          
      } catch (e) {
        //wrap your error object and send it
        console.log(e)
      }
       
})



module.exports = router