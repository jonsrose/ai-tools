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
import { onCall, CallableRequest, HttpsOptions } from 'firebase-functions/v2/https';
import * as crypto from 'crypto';
import axios from 'axios';
import * as FormData from 'form-data';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

// Ensure the encryption key is 32 bytes long
const ENCRYPTION_KEY = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'defaultEncryptionKey', 'salt', 32);

// Common HTTPS options for all functions
const commonHttpsOptions: HttpsOptions = {
  cors: true
};

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const greeting = onCall(commonHttpsOptions, async (request: CallableRequest<unknown>) => {
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
    const hasApiKey = !!userData?.openai_api_key_encrypted;

    return { 
      message: `Hello, ${email}!`,
      hasApiKey: hasApiKey
    };
  } catch (error) {
    logger.error('Error fetching user data:', error);
    throw new Error('Error fetching user data');
  }
});

// Updated function to encrypt the API key
export const encryptApiKey = (apiKey: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(apiKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

// Updated function to decrypt the API key
function decryptApiKey(encryptedKey: string): string {
  const [ivHex, encryptedText] = encryptedKey.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Updated function to store encrypted API key
export const storeApiKey = onCall(commonHttpsOptions, async (request: CallableRequest<{ apiKey: string }>) => {
  if (!request.auth) {
    throw new Error('Unauthenticated');
  }

  const { apiKey } = request.data;
  if (!apiKey) {
    throw new Error('API key is required');
  }

  const encryptedApiKey = encryptApiKey(apiKey);

  try {
    await admin.firestore().collection('users').doc(request.auth.uid).set({
      openai_api_key_encrypted: encryptedApiKey
    }, { merge: true });

    return { message: 'API key stored successfully' };
  } catch (error) {
    logger.error('Error storing API key:', error);
    throw new Error('Error storing API key');
  }
});

export const speechToText = onCall(commonHttpsOptions, async (request: CallableRequest<{ fileName: string, fileContent: string }>) => {
  if (!request.auth) {
    throw new Error('Unauthenticated');
  }

  const { fileName, fileContent } = request.data;

  // Validate file format (you may want to add more thorough validation)
  const supportedFormats = ['.mp3', '.mp4', '.mpeg', '.mpga', '.m4a', '.wav', '.webm'];
  if (!supportedFormats.some(format => fileName.toLowerCase().endsWith(format))) {
    throw new Error('Unsupported file format');
  }

  try {
    // Get the user's encrypted API key from Firestore
    const userDoc = await admin.firestore().collection('users').doc(request.auth.uid).get();
    
    if (!userDoc.exists) {
      throw new Error('User document not found');
    }

    const userData = userDoc.data();
    const encryptedApiKey = userData?.openai_api_key_encrypted;

    if (!encryptedApiKey) {
      throw new Error('OpenAI API key not found');
    }

    // Decrypt the API key
    const apiKey = decryptApiKey(encryptedApiKey);

    // Prepare the file for the OpenAI API
    const buffer = Buffer.from(fileContent, 'base64');
    const formData = new FormData();
    formData.append('file', buffer, { filename: fileName });
    formData.append('model', 'whisper-1');

    // Make the request to the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return response.data.text;
  } catch (error) {
    logger.error('Error in speech to text:', error);
    throw new Error('Error processing speech to text');
  }
});
