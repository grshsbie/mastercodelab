// src/app.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEndpointsDocumentation(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>API Documentation</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          .endpoint-title {
            cursor: pointer;
            transition: all 0.2s;
          }
          .endpoint-title:hover {
            color: #007acc;
          }
          .details {
            display: none;
          }
        </style>
        <script>
          function toggleDetails(id) {
            const details = document.getElementById(id);
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
          }
        </script>
      </head>
      <body class="bg-gray-100 text-gray-800">
        <div class="container mx-auto p-6">
          <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">API Documentation</h1>

          <!-- User Registration -->
          <div class="bg-white p-4 rounded-lg shadow-lg mb-4">
            <h2 class="text-xl font-semibold text-gray-800 endpoint-title" onclick="toggleDetails('register')">
              <span class="text-green-600">POST</span> /user/register
            </h2>
            <div id="register" class="details mt-4 p-4 border-t border-gray-200">
              <p class="text-sm text-red-500 font-semibold mb-2">No Authentication Required</p>
              <p class="font-bold mt-4">Request Body:</p>
              <div class="bg-gray-100 p-4 rounded">
                <pre class="text-sm text-gray-700">{
  "username": "string",
  "password": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string"
}</pre>
              </div>
              <p class="font-bold mt-4">Response:</p>
              <div class="bg-gray-100 p-4 rounded">
                <pre class="text-sm text-gray-700">{
  "id": "string",
  "username": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string"
}</pre>
              </div>
            </div>
          </div>

          <!-- User Login -->
          <div class="bg-white p-4 rounded-lg shadow-lg mb-4">
            <h2 class="text-xl font-semibold text-gray-800 endpoint-title" onclick="toggleDetails('login')">
              <span class="text-green-600">POST</span> /auth/login
            </h2>
            <div id="login" class="details mt-4 p-4 border-t border-gray-200">
              <p class="text-sm text-red-500 font-semibold mb-2">No Authentication Required</p>
              <p class="font-bold mt-4">Request Body:</p>
              <div class="bg-gray-100 p-4 rounded">
                <pre class="text-sm text-gray-700">{
  "username": "string",
  "password": "string"
}</pre>
              </div>
              <p class="font-bold mt-4">Response:</p>
              <div class="bg-gray-100 p-4 rounded">
                <pre class="text-sm text-gray-700">{
  "access_token": "string"
}</pre>
              </div>
            </div>
          </div>

          <!-- Profile Update -->
          <div class="bg-white p-4 rounded-lg shadow-lg mb-4">
            <h2 class="text-xl font-semibold text-gray-800 endpoint-title" onclick="toggleDetails('profileUpdate')">
              <span class="text-green-600">PATCH</span> /profile/{userId}
            </h2>
            <div id="profileUpdate" class="details mt-4 p-4 border-t border-gray-200">
              <p class="text-sm text-red-500 font-semibold mb-2">Authentication Required</p>
              <p class="font-bold mt-4">Request Body:</p>
              <div class="bg-gray-100 p-4 rounded">
                <pre class="text-sm text-gray-700">{
  "firstName": "string",
  "lastName": "string",
  "profilePicture": "string",
  "githubUrl": "string",
  "linkedInUrl": "string",
  "orcid": "string"
}</pre>
              </div>
              <p class="font-bold mt-4">Response:</p>
              <div class="bg-gray-100 p-4 rounded">
                <pre class="text-sm text-gray-700">{
  "id": "string",
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "profilePicture": "string",
  "githubUrl": "string",
  "linkedInUrl": "string",
  "orcid": "string"
}</pre>
              </div>
            </div>
          </div>

          <!-- Challenge Creation -->
          <div class="bg-white p-4 rounded-lg shadow-lg mb-4">
            <h2 class="text-xl font-semibold text-gray-800 endpoint-title" onclick="toggleDetails('challengeCreate')">
              <span class="text-green-600">POST</span> /challenge/create
            </h2>
            <div id="challengeCreate" class="details mt-4 p-4 border-t border-gray-200">
              <p class="text-sm text-red-500 font-semibold mb-2">Authentication Required</p>
              <p class="font-bold mt-4">Request Body:</p>
              <div class="bg-gray-100 p-4 rounded">
                <pre class="text-sm text-gray-700">{
  "description": "string",
  "code": "string",
  "participants": ["userId1", "userId2"]
}</pre>
              </div>
              <p class="font-bold mt-4">Response:</p>
              <div class="bg-gray-100 p-4 rounded">
                <pre class="text-sm text-gray-700">{
  "id": "string",
  "description": "string",
  "code": "string",
  "participants": ["userId1", "userId2"],
  "prompts": []
}</pre>
              </div>
            </div>
          </div>

          <!-- Add Prompt to Challenge -->
          <div class="bg-white p-4 rounded-lg shadow-lg mb-4">
            <h2 class="text-xl font-semibold text-gray-800 endpoint-title" onclick="toggleDetails('challengeAddPrompt')">
              <span class="text-green-600">PATCH</span> /challenge/{challengeId}/add-prompt
            </h2>
            <div id="challengeAddPrompt" class="details mt-4 p-4 border-t border-gray-200">
              <p class="text-sm text-red-500 font-semibold mb-2">Authentication Required</p>
              <p class="font-bold mt-4">Request Body:</p>
              <div class="bg-gray-100 p-4 rounded">
                <pre class="text-sm text-gray-700">{
  "prompt": "string",
  "score": number
}</pre>
              </div>
              <p class="font-bold mt-4">Response:</p>
              <div class="bg-gray-100 p-4 rounded">
                <pre class="text-sm text-gray-700">{
  "id": "string",
  "description": "string",
  "code": "string",
  "prompts": [{"prompt": "string", "score": number}]
}</pre>
              </div>
            </div>
          </div>

          <!-- Assumptions and Rules -->
          <div class="bg-blue-100 p-6 rounded-lg shadow-lg mt-10">
            <h2 class="text-2xl font-semibold text-blue-800">Assumptions and Rules</h2>
            <ul class="list-disc pl-6 mt-4 text-gray-700">
              <li>All endpoints requiring authentication must include a valid JWT in the Authorization header.</li>
              <li>Endpoints assume a valid JSON format for request bodies.</li>
              <li>User roles and permissions are managed separately; ensure adequate permissions before accessing protected resources.</li>
              <li>Data validation errors return status code 400 with specific error details.</li>
              <li>All timestamps are in UTC format.</li>
            </ul>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
