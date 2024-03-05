exports.confrimMailLeader = (email, teamName, teamId) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
       <div class="container">
        <div class="message">Team Registration Confirmation</div>
        <div class="body">
            <p>Hey there,</p>
            <p>You have successfully registered yourself and your team <strong>${teamName}</strong>.</p>
            <p>Your team ID is: <strong>${teamId}</strong>. Please do not share it with anyone outside your team.</p>
            <p>You will soon receive your event ticket in your registered email ID ${email}</p>
        </div>
        <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
            at
            <a href="mailto:dycstudenthelp@gmail.com">dycstudenthelp@gmail.com</a>. We are here to help!
        </div>
    </div>
    </body>
    
    </html>`;
};
