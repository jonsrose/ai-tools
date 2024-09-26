/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from 'firebase-admin';
import { onCall, CallableRequest } from 'firebase-functions/v2/https';
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const greeting = onCall(async (request: CallableRequest<unknown>) => {
  if (!request.auth) {
    throw new Error('Unauthenticated');
  }

  const email = request.auth.token.email;
  
  try {
    // Get the user document from Firestore
    const userDoc = await admin.firestore().collection('users').doc(request.auth.uid).get();
    
    if (!userDoc.exists) {
      throw new Error('User document not found');
    }

    const userData = userDoc.data();
    const openaiApiKey = userData?.openai_api_key;

    if (!openaiApiKey) {
      return { message: `Hello, ${email}! No OpenAI API key found.` };
    }

    return { 
      message: `Hello, ${email}!`,
      openaiApiKey: openaiApiKey 
    };
  } catch (error) {
    logger.error('Error fetching user data:', error);
    throw new Error('Error fetching user data');
  }
});