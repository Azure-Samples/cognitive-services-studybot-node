// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { QnAMaker } = require('botbuilder-ai');

// Name of the QnA Maker service in the .bot file.
const   STUDY_BIOLOGY_CONFIG = 'StudyBiology';
const   STUDY_GEOLOGY_CONFIG = 'StudyGeology';
const   STUDY_SOCIOLOGY_CONFIG = 'StudySociology';
const   CHITCHAT_SHELL_CONFIG = 'Chitchat-Shell';

let studyBioInit = false;
let studyGeoInit = false;
let studySocInit = false;
let studyChiInit = false;

// CONSTS used in QnA Maker query. See [here](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-qna?view=azure-bot-service-4.0&tabs=cs) for additional info
const QNA_TOP_N = 3; // returns the top answer(s), defaults at 1
const QNA_CONFIDENCE_THRESHOLD = 0.6; // questions must match answers by a certain percentage

class QnA {
     /**
     *
     * @param {Object} botConfig bot configuration from .bot file
     */
    constructor(botConfig) {
        if (!botConfig) throw new Error('Need bot configuration.');

        let kbConfig;

        // add recognizers, these only need initialization once per chat session
        if (studyBioInit === false) {
            kbConfig = botConfig.findServiceByNameOrId(STUDY_BIOLOGY_CONFIG);
            studyBioInit = 'true';
        } else if (studyGeoInit === false) {
            kbConfig = botConfig.findServiceByNameOrId(STUDY_GEOLOGY_CONFIG);
            studyGeoInit = 'true';
        } else if (studySocInit === false) {
            kbConfig = botConfig.findServiceByNameOrId(STUDY_SOCIOLOGY_CONFIG);
            studySocInit = 'true';
        } else if (studyChiInit === false) {
            kbConfig = botConfig.findServiceByNameOrId(CHITCHAT_SHELL_CONFIG);
            studyChiInit = 'true';
        }

        if (!kbConfig || !kbConfig.kbId) throw new Error(`QnA Maker application information not found in .bot file. Please ensure you have all required QnA Maker applications created and available in the .bot file. See readme.md for additional information\n`);
        this.qnaRecognizer = new QnAMaker({
            knowledgeBaseId: kbConfig.kbId,
            endpointKey: kbConfig.endpointKey,
            host: kbConfig.hostname
        });
    }

    /**
     *
     * @param {TurnContext} turnContext context object
     */
    async onTurn(turnContext) {
        // Call QnA Maker and get results.
        const qnaResult = await this.qnaRecognizer.generateAnswer(turnContext.activity.text, QNA_TOP_N, QNA_CONFIDENCE_THRESHOLD);
        if (!qnaResult || qnaResult.length === 0 || !qnaResult[0].answer) {
            await turnContext.sendActivity(`I don't understand... try again.`);
            return;
        }
        // respond with top qna result(s)
        for (const answer of qnaResult) {
            await turnContext.sendActivity(answer.answer);
        }
    }
};

module.exports.QnA = QnA;