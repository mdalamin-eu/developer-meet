exports.registerUserEmail = (token, email) => {
    return {
          Source:process.env.EMAIL_FROM,
          Destination: { /* required */
            ToAddresses: [email],
          },
          Message: { /* required */
            Body: { /* required */
              Html: {
               Charset: "UTF-8",
               Data: `<html>
               <body>
               <h1>Verify your email address</h1>
               <p>Please use the following link to complete your registration:</p>
               <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
               </body>
               </html>`
              },
             },
             Subject: {
              Charset: 'UTF-8',
              Data: 'Please complete your registration'
             }
            },
        
        }
    } 