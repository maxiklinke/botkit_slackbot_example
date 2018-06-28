require('dotenv').load();

var Botkit = require('botkit');
var express = require('express');
// Create an Express app
const app = express();



/*
var middleware = require('botkit-middleware-watson')({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  workspace_id: process.env.WORKSPACE_ID,
  url: process.env.CONVERSATION_URL || 'https://gateway.watsonplatform.net/conversation/api',
  version_date: '2017-05-26'
});
*/



// Configure your bot.
const slackController = Botkit.slackbot({
	clientId: process.env.SLACK_CLIENTID,
    clientSecret: process.env.SLACK_CLIENTSECRET,
    scopes: ['bot'],
			// optional: wait for a confirmation events for each outgoing message before continuing to the next message in a conversation
			require_delivery: true
		});
const slackBot = slackController.spawn({
  token: process.env.SLACK_TOKEN,
});




slackController.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  slackController.log('Slack message received');

  /*
  middleware.interpret(bot, message, function() {
    if (message.watsonError) {
      console.log(message.watsonError);
      bot.reply(message, "I'm sorry, but for technical reasons I can't respond to your message");
    } else {
      bot.reply(message, message.watsonData.output.text.join('\n'));
    }
  });*/

  bot.reply(message, "Nice to hear from you.");
});



// create rtm connection -> instant messaging
		slackBot.startRTM((err, bot, payload) => {
			if (err) {
				throw new Error('Could not connect to Slack '+err);
			}
			slackController.log('Slack connection established.');
		});



//START THE SERVER
const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
  //init()
});
