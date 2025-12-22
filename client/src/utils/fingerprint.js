// fingerprint.js - Collect device signals
class BrowserFingerprint {
    static async collect() {
      const signals = {
        userAgent: navigator.userAgent,
        screen: {
          width: window.screen.width,
          height: window.screen.height,
          colorDepth: window.screen.colorDepth,
          pixelDepth: window.screen.pixelDepth,
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: navigator.deviceMemory,
        maxTouchPoints: navigator.maxTouchPoints,
        // Detect headless/automation
        webdriver: navigator.webdriver,
        plugins: Array.from(navigator.plugins).map(p => p.name),
        // Canvas fingerprinting
        canvas: await this.canvasFingerprint(),
        // WebGL fingerprint
        webgl: this.webglFingerprint(),
        // Performance timing
        performanceMetrics: performance.timing,
      };
      
      return this.encrypt(signals);
    }
  
    static canvasFingerprint() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '12px Arial';
      ctx.fillText('BotDetect', 10, 10);
      return canvas.toDataURL();
    }
  
    static webglFingerprint() {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      if (!gl) return null;
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      return {
        vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
        renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
      };
    }
  
    static encrypt(data) {
      // Sử dụng TweetNaCl hoặc libsodium
      const jsonStr = JSON.stringify(data);
      return btoa(jsonStr); // Base64 encode
    }
  }
  