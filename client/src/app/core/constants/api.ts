import { isDevMode } from '@angular/core';

export const API_URL = isDevMode()
  ? 'http://localhost:5000/api'
  : 'https://sprintflow-ai-api.onrender.com/api'; // Replace with your actual production backend URL