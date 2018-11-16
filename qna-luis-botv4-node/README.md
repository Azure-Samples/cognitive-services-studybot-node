# Qna-Luis-Botv4

This sample bot has been created using the [Microsoft Bot Framework](https://dev.botframework.com), in particular, the [Dispatch](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-tutorial-dispatch?view=azure-bot-service-4.0&tabs=csharp) feature which will "dispatch" user queries in a chat client to the right Microsoft Cognitive Service. Dispatch is used to direct the user to [LUIS](https://luis.ai), which then directs the user to the right QnA Maker knowledge bases (FAQs) stored in [qnamaker.ai](https://www.qnamaker.ai/). 

The new QnA Maker feature [Chitchat](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/how-to/chit-chat-knowledge-base) is used as one of the knowledge bases and is integrated into LUIS using the CLI Dispatch tool. Chitchat gives the chat client a more natural, conversational feel when a user chats off-topic, asking questions such as "How are you?", "You're boring", or "Can we be friends?". There are three different personalities you can set Chitchat to when creating it in [qnamaker.ai](https://www.qnamaker.ai/): The Professional, The Friend, or The Comic. This sample uses The Comic setting, since the Study Bot targets high school students.

This sample is meant as a guide (not as a direct download), but instructions below show you how to create your own sample with your own Cognitive Service resources to create a Study Bot chat client.

## Prerequisites - Azure Bot and Emulator

1. [Create a Basic Bot (NodeJS) web app bot](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-quickstart?view=azure-bot-service-4.0), using the SDK4 in the [Azure Portal](https://ms.portal.azure.com). If you don't have an Azure account, [create a free Azure account](https://azure.microsoft.com/en-us/free/).
1. Download your bot code locally, once it has been created. To do this go to the Build section of the Bot management menu.

    <img src="/Assets/download-bot-code.png">

1. In the file called `.env` (create it if necessary, in your root folder), add your botFilePath and botFileSecret to it, if it is not there already. The `.env` file replaces the `appsettings.json` file of bot v3. To find your botFilePath and botFileSecret, go to your bot resource in Azure and look under the Application Settings menu. 

    <img src="/Assets/bot-secret-location.png">

   The update should look something like this, replacing <TEXT> with your unique values: 
 ```
      botFilePath="<YOUR-BOT-FILE-PATH>"
      botFileSecret="<YOUR-BOT-FILE-SECRET>"
  ```
  
1. [Download the Bot Emulator](https://github.com/Microsoft/BotFramework-Emulator/releases) in preparation to test chat queries, locally.
1. You'll need to [download Ngrok](https://ngrok.com/download) for the emulator. Ngrok has a free version and you don't need to create an account, just download it. If Ngrok is not configured, you'll see a link in your emulator where you can click to configure it.

    <img src="/Assets/configure-ngrok.png">
  
## Prerequisites - Creating the Cognitive Services: QnA Maker and LUIS
### QnA Maker

1. For the QnA Maker part, you'll need to [Create, train, and publish](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/create-publish-knowledge-base) three knowledge bases (KBs) in [qnamaker.ai](https://www.qnamaker.ai). Refer to the text files in this sample in the `FAQs` folder named QA Biology, QA Sociology, and QA Geology for FAQs you can upload into qnamaker.ai when creating a new knowledge base. Name your knowledge bases "StudyBiology", "StudySociology", and "StudyGeology". 
1. If you want to include Chitchat, [create a new knowledge base](https://www.qnamaker.ai/Create) but leave it empty (don't upload any files or URLs) and in Step 4, enable the Chitchat personality of your choice by selecting a radio button and choosing "Create your KB" at the bottom of the page. Once you create it, you will see it has been populated with lots of standard Chitchat questions and answers. Be sure to train and publish it in "My knowledge bases".
1. You will want to add alternative keywords to your knowledge base questions in qnamaker.ai. These are found in the `FAQs/Alt questions` folder. To add them to your knowledge bases, go to "My knowledge bases" in [qnamaker.ai](https://www.qnamaker.ai) and in each knowledge base click the "+" sign near each question (after your knowledge bases have been created). Type in the alternative question. This is only needed for the Biology, Geology, and Sociology KBs.

    <img src="/Assets/alt-question-kb.png">
    
1. Be sure to train and publish your knowledge base again after any changes are made.

### LUIS

After you have created your web app bot (above), you will see a LUIS app has been auto-created for you in [luis.ai](https://www.luis.ai). We won't actually use this app, we'll replace it with our Dispatch app later in this tutorial. The Dispatch app will be created through Dispatch commands.

## Prerequisites - Creating Dispatch
### Install BotBuilder Tools
1. Ensure you have [Node.js](https://nodejs.org/) version 8.5 or higher
1. From a command prompt/terminal navigate to your bot project folder and type the command:
    ```bash
    npm i -g msbot chatdown ludown qnamaker luis-apis botdispatch luisgen
    ```

### Create Dispatch service    
[Dispatch](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/Dispatch) is a command line tool that will create the Dispatch keys and IDs (.dispatch file), a list of all your LUIS utterances that match your QnA Maker knowledge base questions (.json file), create a new Dispatch app in your LUIS account, and connect all your Cognitive Services to the Dispatch system.

1. To connect your LUIS app and QnA Maker knowledge bases to Dispatch, enter the commands below (one line at a time) into your terminal. You can name your Dispatch service anything you'd like, Study-Bot-Dispatch would work well. Your LUIS authoring key is found in the "Settings" menu when you right click on your account name in the upper right of your luis.ai account. Example for region: westus.
1. Your QnA Maker KB IDs can be found by going to "My knowledge bases" in qnamaker.ai and clicking the "View code" on the far right side of your knowledge base. Your KB ID is the string of numbers in the first line. The QnAKey is your QnA Maker key from your resource in Azure, found in the "Keys" section of the menu in your resource. You have two keys, use either one. This is the resource (your Azure QnA service) you used when creating your knowledge bases in qnamaker.ai. 
    ```bash
    dispatch init -n {DispatchName} --luisAuthoringKey xxxxxxxxxxxxxxxxxxxx --luisAuthoringRegion {LUISauthoringRegion} --culture en-us
    dispatch add -t qna -i {kbId1} -k {QnaKey from Azure}
    dispatch add -t qna -i {kbId2} -k {QnaKey from Azure}
    dispatch add -t qna -i {kbId3} -k {QnaKey from Azure}
    dispatch add -t qna -i {chitChatKbId} -k {QnaKey from Azure}
    dispatch create
    ```
1. With all your services added, you can view them in the <YOUR-BOT-NAME>.dispatch file that was just created to see the services. Also notice the <YOUR-BOT-NAME>.json file now contains a very long list of every utterance you have from your LUIS Dispatch app from all its intents.
1. This Dispatch sequence also creates a special LUIS app for the Dispatch service in luis.ai. Note: you'll use the authoring and endpoint keys from this app in your `.bot` file later.
1. Go to your account in luis.ai and find the Dipatch app just created. You can see there is a `None` intent (default) and then your knowledge base intents. However, these are not named well, as they are a string of random characters. Make sure to rename them (click pencil icon near title) to match the naming in your .bot file for these QnA knowledge bases. For instance, the geology KB is named StudyGeology, in luis.ai, qnamaker.ai, and in the .bot file (name field of each object). They all need to match.
1. After renaming your LUIS intents, train and publish them. It might take a minute or two to see the changes reflected in your responses in the chat client (if already testing).

## Prerequisites - Syncing the code

Now that your Dispatch structure is set in your bot and in luis.ai, you only need to copy/paste missing code when comparing your bot with this sample.
1. Compare the `bot.js`, `index.js`, `qna.js`, and the `qna-luis-botv4-node.bot` files with your own. Take special note of adding/changing the bot configurations and intents. Your files should mirror this samples' files. Because we are using four knowledge bases (KBs), some of the logic has changed to incorporate those.
1. Your `.bot` file came with certain standard objects, keep them (objects of type abs, blob, 2 endpoints, luis, and app insights if you chose to include that in Azure). The only exception is we don't need the type luis object, it will be replaced with our dispatch app. So go ahead and delete the type luis object.
1. Add the dispatch and four QnA Maker objects as shown in this sample. Replace the <TEXT> parts with your own unique values. The ID numbers are mostly arbitrary, but they must match up. For instance, you should have the same IDs for your QnA Maker KBs as the IDs in your `.dispatch` file. Also, the `serviceIds` in the type dispatch object should include all your KBs and your App Insight's ID (if included). The type dispatch object need not include any of the standard object IDs (since its job is not to dispatch those).
1. For simplicity's sake, make sure your padlock value is deleted in your `.bot` file. It is still in the code in Azure, so you can reuse it if you'd like your `.bot` file to be encrypted.
1. Make sure your beginning and ending values of your `.bot` file are the same as in this sample. They should look like this, with nothing coming after your services array:
```json
  {
  "name": "<YOUR-BOT-NAME>",
  "padlock": "",
  "version": "2.0",
  "services": [
  ...
    ]
  }
  
## Run and test your bot
### Connect to bot using Bot Framework Emulator
1. Run your bot project by typing `npm start` in your CLI. 
1. Launch the Bot Framework Emulator. Then  File -> Open Bot Configuration and navigate to your bot project folder to select your `<YOUR-BOT-NAME>.bot` file and it opens in the emulator.
- When you see something like `[19:15:57]POST 200 conversations.replyToActivity`, your bot is ready to take input.
- Type any question of your knowledge bases (from any one) and the answer should be returned. 
- Note: your project must be running in order to use the emulator.

## Further Reading
- [Bot Framework Documentation](https://docs.botframework.com)
- [Bot basics](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
- [Activity processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-activity-processing?view=azure-bot-service-4.0)
- [LUIS](https://luis.ai)
- [Prompt Types](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-prompts?view=azure-bot-service-4.0&tabs=javascript)
- [Azure Bot Service Introduction](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
- [Channels and Bot Connector Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-concepts?view=azure-bot-service-4.0)
- [QnA Maker](https://qnamaker.ai)

## Additional Resources

### Dependencies

- **[Restify](http://restify.com)** Used to host the web service for the bot, and for making REST calls
- **[dotenv](https://github.com/motdotla/dotenv)** Used to manage environmental variables

### Project Structure

`index.js` references the bot and starts a Restify server. `bot.js` loads the dialog type you selected when running the generator and adds it as the default dialog. 

### Configuring the bot

Update `.env` with the appropriate keys botFilePath and botFileSecret. 
  - For Azure Bot Service bots, you can find the botFileSecret under application settings. 
  - If you use [MSBot CLI](https://github.com/microsoft/botbuilder-tools) to encrypt your bot file, the botFileSecret will be written out to the console window. 
  - If you used [Bot Framework Emulator **V4**](https://github.com/microsoft/botframework-emulator) to encrypt your bot file, the secret key will be available in bot settings. 

### Running the bot

```
node ./index.js
```
### Developing the bot

```
nodemon ./index.js
```
