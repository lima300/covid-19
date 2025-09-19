# 🚀 Deployment Guide

## GitHub Pages Deployment

This project is configured with automated deployment to GitHub Pages using GitHub Actions.

### 🔧 Setup Instructions

#### 1. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Set **Source** to "GitHub Actions"
4. Save the configuration

#### 2. Configure Repository Settings

1. Ensure the repository name matches the base path in `vite.config.ts`
2. Current configuration expects repository name: `covid-19`
3. If your repository has a different name, update the base path:
   ```typescript
   base: mode === 'production' ? '/your-repo-name/' : '/',
   ```

### 🔐 Security Features

#### Environment Variables

- ✅ **No sensitive data exposed** - All environment variables are public configuration
- ✅ **VITE\_ prefix required** - Only VITE\_ prefixed variables are included in build
- ✅ **Public APIs only** - Uses public COVID-19 API with no authentication required

#### Build Security

- ✅ **Source maps disabled** in production
- ✅ **Code minification** enabled
- ✅ **Dependency auditing** in CI pipeline
- ✅ **TypeScript type checking** before deployment

#### Content Security

- ✅ **No secrets in repository**
- ✅ **Comprehensive .gitignore**
- ✅ **Environment template** provided
- ✅ **Security audit** in workflow

### 🚦 Deployment Workflow

The deployment is triggered automatically on:

- ✅ **Push to main branch**
- ✅ **Manual trigger** from Actions tab

#### Workflow Steps:

1. **Build Matrix** - Tests on Node.js 18.x and 20.x
2. **Type Checking** - Validates TypeScript code
3. **Linting** - Code quality checks (optional)
4. **Security Audit** - Dependency vulnerability scan
5. **Bundle Analysis** - Size and performance checks
6. **Build Application** - Creates production build
7. **Deploy** - Publishes to GitHub Pages

### 📊 Performance Optimizations

#### Code Splitting

```javascript
manualChunks: {
  vendor: ['vue', 'vue-router', 'vuex'],
  charts: ['chart.js', 'vue-chartjs'],
  utils: ['axios']
}
```

#### Build Output

- **Vendor Bundle** - Framework code (cached separately)
- **Charts Bundle** - Visualization libraries
- **Utils Bundle** - HTTP and utilities
- **App Bundle** - Application code

### 🔍 Monitoring & Analytics

#### Build Monitoring

- Bundle size analysis
- Dependency vulnerability scanning
- Type safety validation
- Performance metrics

#### Production Monitoring

- API response times
- Error rate tracking
- User interaction analytics (if enabled)

### 🛠️ Local Development vs Production

| Feature           | Development | Production    |
| ----------------- | ----------- | ------------- |
| **Base Path**     | `/`         | `/covid-19/`  |
| **Source Maps**   | ✅ Enabled  | ❌ Disabled   |
| **Console Logs**  | ✅ Visible  | ❌ Removed    |
| **Hot Reload**    | ✅ Enabled  | ❌ N/A        |
| **Minification**  | ❌ Disabled | ✅ Enabled    |
| **Type Checking** | ✅ Runtime  | ✅ Build Time |

### 🎯 Deployment URL

After successful deployment, your application will be available at:

```
https://lima300.github.io/covid-19/
```

### 🔧 Manual Deployment

If you need to deploy manually:

```bash
# Build the application
npm run build

# Test the build locally
npm run preview

# Deploy to GitHub Pages (if using gh-pages package)
npm run deploy
```

### 🚨 Troubleshooting

#### Common Issues:

1. **404 on GitHub Pages**

   - Check repository name matches base path
   - Verify GitHub Pages is enabled
   - Ensure workflow completed successfully

2. **Build Failures**

   - Check TypeScript errors
   - Verify all dependencies are installed
   - Review workflow logs in Actions tab

3. **API Issues**

   - COVID-19 API is public and requires no authentication
   - Fallback to mock data is automatic
   - Check network connectivity

4. **Routing Issues on GitHub Pages**
   - SPA routing requires special handling
   - Add 404.html that redirects to index.html if needed

### 📋 Security Checklist

- [ ] No API keys or secrets in code
- [ ] Environment variables properly prefixed
- [ ] Dependencies regularly audited
- [ ] Source maps disabled in production
- [ ] HTTPS only (enforced by GitHub Pages)
- [ ] Content Security Policy headers (if custom domain)

### 🔄 Continuous Integration

The CI/CD pipeline ensures:

- ✅ Code quality through linting
- ✅ Type safety through TypeScript
- ✅ Security through dependency auditing
- ✅ Performance through bundle analysis
- ✅ Reliability through automated testing

### 📞 Support

If you encounter deployment issues:

1. Check the **Actions** tab for workflow logs
2. Review the **Issues** section for known problems
3. Consult the **GitHub Pages documentation**
4. Verify your repository settings match the configuration
