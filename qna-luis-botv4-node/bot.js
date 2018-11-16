// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// bot.js is your main bot dialog entry point for handling activity types

// Import required Bot Builder
const { ActivityTypes } = require('botbuilder');
const { LuisRecognizer } = require('botbuilder-ai');
const { QnA } = require('./qna');

// Dispatch service type entry as defined in the .bot file
const DISPATCH_CONFIGURATION = '<YOUR-LUIS-DISPATCH-APP-NAME>';

// Supported LUIS Intents
const STUDY_BIOLOGY_INTENT = 'StudyBiology';
const STUDY_GEOLOGY_INTENT = 'StudyGeology';
const STUDY_SOCIOLOGY_INTENT = 'StudySociology';
const CHITCHAT_SHELL_INTENT = 'Chitchat-Shell';
const NONE_INTENT = 'None';


class BasicBot {
    /**
     * Constructs the LUIS client
     * @param {ConversationState}  conversation state
     * @param {UserState} user state
     * @param {BotConfiguration} botConfig contents of the .bot file
     */
    constructor(conversationState, userState, botConfig) {
        if (!conversationState) throw new Error(`Missing parameter. Conversation state parameter is missing`);
        if (!userState) throw new Error(`Missing parameter. User state parameter is missing`);
        if (!botConfig) throw new Error('Missing parameter.  botConfig is required');

        this.studyBiologyDialog = new QnA(botConfig);
        this.studyGeologyDialog = new QnA(botConfig);
        this.studySociologyDialog = new QnA(botConfig);
        this.chitchatShellDialog = new QnA(botConfig);

        this.conversationState = conversationState;
        this.userState = userState;

        // Add the DISPATCH recognizer.
        const dispatchConfig = botConfig.findServiceByNameOrId(DISPATCH_CONFIGURATION);
        if (!dispatchConfig || !dispatchConfig.appId) throw new Error('Missing DISPATCH configuration. Please follow README.MD to create required DISPATCH applications.\n\n');
        this.dispatchRecognizer = new LuisRecognizer({
            applicationId: dispatchConfig.appId,
            endpoint: dispatchConfig.getEndpoint(),
            // CAUTION: Its better to assign and use a subscription key instead of authoring key here.
            endpointKey: dispatchConfig.authoringKey
        });
    }

    /**
     * Driver code:
     * 1. Calls dispatch LUIS model to determine intent
     * 2. Calls appropriate sub component to drive the conversation forward.
     *
     * @param {TurnContext} context turn context from the adapter
     */
    async onTurn(context) {
        // Handle Message activity type, which is the main activity type for shown within a conversational interface
        // Message activities may contain text, speech, interactive cards, and binary or unknown attachments.
        // see https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
        if (context.activity.type === ActivityTypes.Message) {
            // determine which dialog should fulfill this request
            // call the dispatch LUIS model to get results.
            const dispatchResults = await this.dispatchRecognizer.recognize(context);
            const dispatchTopIntent = LuisRecognizer.topIntent(dispatchResults);

            switch (dispatchTopIntent) {
            case STUDY_BIOLOGY_INTENT:
                await this.studyBiologyDialog.onTurn(context);
                break;
            case STUDY_GEOLOGY_INTENT:
                await this.studyGeologyDialog.onTurn(context);
                break;
            case STUDY_SOCIOLOGY_INTENT:
                await this.studySociologyDialog.onTurn(context);
                break;
            case CHITCHAT_SHELL_INTENT:
                await this.chitchatShellDialog.onTurn(context);
                break;
            case NONE_INTENT:
                // Unknown request
                await context.sendActivity(`I don't understand that.`);
            }

            // save state changes
            await this.conversationState.saveChanges(context);
            await this.userState.saveChanges(context);
        } else if (context.activity.type === ActivityTypes.ConversationUpdate) {
            // Handle ConversationUpdate activity type, which is used to indicates new members add to
            // the conversation.
            // see https://aka.ms/about-bot-activity-message to learn more about the message and other activity types

            // Do we have any new members added to the conversation?
            if (context.activity.membersAdded.length !== 0) {
                // Iterate over all new members added to the conversation
                for (var idx in context.activity.membersAdded) {
                    // Greet anyone that was not the target (recipient) of this message
                    // the 'bot' is the recipient for events from the channel,
                    // context.activity.membersAdded == context.activity.recipient.Id indicates the
                    // bot was added to the conversation.
                    if (context.activity.membersAdded[idx].id !== context.activity.recipient.id) {
                        // Welcome user.
                        // When activity type is "conversationUpdate" and the member joining the conversation is the bot
                        // we will send our Welcome Adaptive Card.  This will only be sent once, when the Bot joins conversation
                        // To learn more about Adaptive Cards, see https://aka.ms/msbot-adaptivecards for more details.
                        await context.sendActivity(`Hello, I am the Study Bot!`);
                    }
                }
            }
        }
    }
}

module.exports.BasicBot = BasicBot;