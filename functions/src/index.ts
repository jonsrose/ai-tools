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
  // const { data } = request;

  // logger.info("Data: ", data);

  // // Perform type checking before using data
  // if (typeof data === 'object' && data !== null && 'name' in data) {
  //   const { name } = data as { name: string };
  //   return { message: `Hello, ${name}!` };
  // }

  // throw new Error('Invalid data');

  return { message: "Hello, World!" };
});