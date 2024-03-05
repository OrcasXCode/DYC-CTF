exports.confrimMailParticipant = (email, teamName, teamId, teamLeaderName) => {
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
           
            <div class="message">Password Update Confirmation</div>
            <div class="body">
                <p>Hey There Coder..!</p>
                <p>You have been successfully registered for the event by your team leader ${teamLeaderName}</p>
                <p>You and your team ${teamName} has a unique Team ID which is ${teamId} , please do not share your team id with anyone else apart from your team memebrs</p>
                <p>You will soon receive your event ticket in your registered email ID ${email}.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:dycstudenthelp@gmail.com">dycstudenthelp@gmail.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};
