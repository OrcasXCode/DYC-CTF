exports.memberPending = (email, teamName, teamLeaderName) => {
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
        <div class="message">Team Registration Pending Verification</div>
        <div class="body">
            <p>Dear Team Member</p>
            <p>Your team ${teamName} is registered for the event.</p>
            <p>You have been registered for the event by your team leader ${teamLeaderName}</p>
            <p>Please note that your team registration is currently pending , verification will be done by team.</p>
            <p>We will verify your payment, and if it is valid, you will receive an email containing your unique team ID and event ticket within 24 to 48 hours 
            on your registered email ${email}</p>
            <p>Thank You for becoming a part of Department Of Youth Capital.</p>
        </div>
        <div class="support">If you have any questions or need further assistance, please feel free to reach out to us at <a href="mailto:dycstudenthelp@gmail.com">dycstudenthelp@gmail.com</a>. We are here to help!</div>
    </div>
</body>
    
    </html>`;
};
