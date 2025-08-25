# CORS and Deployment Troubleshooting Guide

## Issues Fixed

### 1. Enhanced CORS Configuration
- Added dynamic origin checking
- Explicit preflight handling
- Additional CORS headers for better compatibility
- Proper error handling for blocked origins

### 2. Deployment Environment Variables

#### Backend (.env)
Make sure your backend has these environment variables on Render:
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://codinghive-frontend.onrender.com
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secure_access_token_secret
REFRESH_TOKEN_SECRET=your_secure_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### Frontend (.env)
Make sure your frontend has this environment variable on Render:
```
VITE_BACKEND_URL=https://codinghive.onrender.com
```

### 3. Deployment Steps

#### For Backend (Render)
1. Connect your GitHub repository
2. Set the build command: `npm install`
3. Set the start command: `npm start`
4. Add all the environment variables listed above
5. Deploy

#### For Frontend (Render)
1. Connect your GitHub repository
2. Set the build command: `npm install && npm run build`
3. Set the publish directory: `dist`
4. Add the environment variable: `VITE_BACKEND_URL=https://codinghive.onrender.com`
5. Deploy

### 4. Testing CORS

You can test if CORS is working by visiting these endpoints:
- `https://codinghive.onrender.com/health` - Basic health check
- `https://codinghive.onrender.com/test-cors` - CORS test endpoint

### 5. Common Issues and Solutions

#### 404 Error on /register
- Make sure the backend is properly deployed and running
- Check that the environment variables are set correctly
- Verify the VITE_BACKEND_URL in frontend matches your backend URL

#### CORS Still Blocked
- Verify the FRONTEND_URL environment variable in backend
- Check that both apps are using HTTPS in production
- Ensure the domain names match exactly

#### Cookies Not Working
- Both frontend and backend must use HTTPS in production
- Check sameSite and secure cookie settings
- Verify withCredentials: true in axios client

### 6. Debug Information

The enhanced logging will show:
- Request method and path
- Origin header
- Preflight request detection
- CORS blocking information

Check your Render logs for these debug messages.

## Deployment Checklist

- [ ] Backend environment variables set on Render
- [ ] Frontend environment variables set on Render  
- [ ] Backend start command is `npm start`
- [ ] Frontend build command includes `npm run build`
- [ ] Both apps are using HTTPS URLs
- [ ] Database connection string is correct
- [ ] JWT secrets are set and secure
