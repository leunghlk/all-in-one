// Enhanced IP-Based Access Control for Personal Dashboards
// Combines Cloudflare Access with client-side IP detection

class EnhancedDashboardProtection {
    constructor() {
        this.trustedIPs = new Set([
            '2a02:26f7:b9d0:45c0:0:4000:0:3',  // MacBook Air (IPv6)
            '100.101.138.120',                  // iPhone (IPv4)
            // Add more IPs as needed (home network, VPN, etc.)
        ]);

        this.sessionKey = 'dashboard_access_session';
        this.fallbackPassword = 'kathy2024';
        this.init();
    }

    init() {
        this.setupEventListeners();

        // Check if we're on the protected dashboard
        if (window.location.pathname.includes('/all-in-one/')) {
            this.protectDashboard();
        }
    }

    setupEventListeners() {
        // Prevent accidental navigation away from protected content
        window.addEventListener('beforeunload', (e) => {
            if (this.isAuthenticated()) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }

    async protectDashboard() {
        console.log('🔒 Dashboard protection initialized');

        // Check for existing valid session
        if (this.isValidSession()) {
            console.log('✅ Valid session found, showing dashboard');
            this.showDashboard();
            return;
        }

        // Check IP if no session
        try {
            const clientIP = await this.getClientIP();
            console.log('📍 Client IP:', clientIP);

            if (this.trustedIPs.has(clientIP)) {
                console.log('🟢 Trusted IP detected, creating session');
                this.createSession();
                this.showDashboard();
                return;
            } else {
                console.log('🔴 Untrusted IP, requiring authentication');
            }
        } catch (error) {
            console.error('❌ IP detection failed:', error);
        }

        // Show login overlay
        this.showLoginOverlay();
    }

    async getClientIP() {
        // Try multiple methods to get IP address
        const methods = [
            // Method 1: Custom API endpoint if you have one
            () => this.fetchWithTimeout('/api/ip-check', { method: 'GET' }, 5000),

            // Method 2: ipify.org
            () => this.fetchWithTimeout('https://api.ipify.org?format=json', {}, 5000),

            // Method 3: ifconfig.me
            () => this.fetchWithTimeout('https://ifconfig.me/ip', {}, 5000),

            // Method 4: icanhazip.com
            () => this.fetchWithTimeout('https://icanhazip.com', {}, 5000)
        ];

        for (const method of methods) {
            try {
                const response = await method();
                let ip;

                if (typeof response === 'string') {
                    ip = response.trim();
                } else if (response.json) {
                    const data = await response.json();
                    ip = data.ip || data.trim();
                } else {
                    ip = await response.text();
                }

                // Validate IP format
                if (this.isValidIP(ip)) {
                    return ip;
                }
            } catch (error) {
                console.log('IP method failed:', error.message);
                continue;
            }
        }

        throw new Error('All IP detection methods failed');
    }

    fetchWithTimeout(url, options = {}, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            fetch(url, {
                ...options,
                signal: controller.signal,
                // Don't send credentials to external services
                credentials: options.method === 'GET' ? 'omit' : 'same-origin'
            })
            .then(response => {
                clearTimeout(timeoutId);
                resolve(response);
            })
            .catch(error => {
                clearTimeout(timeoutId);
                reject(error);
            });
        });
    }

    isValidIP(ip) {
        // Simple IP validation
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        return ipRegex.test(ip);
    }

    isValidSession() {
        const sessionData = localStorage.getItem(this.sessionKey);
        if (!sessionData) return false;

        try {
            const session = JSON.parse(sessionData);
            const now = Date.now();
            const sessionAge = now - session.timestamp;
            const maxAge = 24 * 60 * 60 * 1000; // 24 hours

            // Check if session expired
            if (sessionAge > maxAge) {
                localStorage.removeItem(this.sessionKey);
                return false;
            }

            // Verify IP hasn't changed (optional security)
            if (session.ip && session.ip !== 'trusted') {
                this.getClientIP().then(clientIP => {
                    if (clientIP !== session.ip) {
                        console.log('IP changed, invalidating session');
                        localStorage.removeItem(this.sessionKey);
                    }
                });
            }

            return true;
        } catch {
            return false;
        }
    }

    createSession() {
        const session = {
            timestamp: Date.now(),
            ip: 'trusted', // In production, store real IP for verification
            device: this.detectDevice(),
            userAgent: navigator.userAgent,
            fromIP: 'trusted' // Would store actual IP in production
        };

        localStorage.setItem(this.sessionKey, JSON.stringify(session));

        // Set cookie for additional persistence
        document.cookie = `dashboard_session=${session.timestamp}; path=/; max-age=86400; secure`;
    }

    detectDevice() {
        const userAgent = navigator.userAgent;
        if (/iPhone/i.test(userAgent)) return 'iPhone';
        if (/Macintosh|Mac OS X/i.test(userAgent)) return 'MacBook';
        if (/iPad/i.test(userAgent)) return 'iPad';
        if /Windows/.test(userAgent)) return 'Windows PC';
        if /Android/.test(userAgent)) return 'Android Device';
        return 'Unknown Device';
    }

    showDashboard() {
        // Hide login overlay if it exists
        const loginOverlay = document.getElementById('login-overlay');
        if (loginOverlay) {
            loginOverlay.style.display = 'none';
        }

        // Add session indicator
        this.addSessionIndicator();

        // Initialize dashboard functionality
        this.initializeDashboard();
    }

    showLoginOverlay() {
        const overlay = this.createLoginOverlay();
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
    }

    createLoginOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'login-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;

        overlay.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                text-align: center;
                max-width: 500px;
                width: 90%;
                animation: slideIn 0.3s ease-out;
            ">
                <div style="font-size: 48px; margin-bottom: 20px;">🔒</div>
                <h2 style="color: #1a365d; margin-bottom: 15px;">Secure Access Required</h2>
                <p style="color: #666; margin-bottom: 30px; line-height: 1.6;">
                    This dashboard contains personal content and requires authentication.
                    ${this.isFromTrustedNetwork() ? 'Enter your password to continue.' : 'Please enter the access password.'}
                </p>

                <div style="margin-bottom: 20px;">
                    <input
                        type="password"
                        id="password-input"
                        placeholder="Enter password"
                        style="
                            width: 100%;
                            padding: 15px;
                            border: 2px solid #e2e8f0;
                            border-radius: 10px;
                            font-size: 16px;
                            transition: all 0.3s ease;
                        "
                        onkeypress="if(event.key==='Enter') dashboard.handleLogin()"
                    >
                </div>

                <button
                    onclick="dashboard.handleLogin()"
                    style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 15px 40px;
                        border-radius: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    "
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 25px rgba(102, 126, 234, 0.3)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
                >
                    Access Dashboard
                </button>

                <div id="error-message" style="
                    color: #e53e3e;
                    margin-top: 15px;
                    font-weight: 500;
                    display: none;
                    animation: shake 0.5s ease-in-out;
                "></div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    <div style="
                        background: #f7fafc;
                        padding: 15px;
                        border-radius: 10px;
                        text-align: left;
                        margin-bottom: 15px;
                    ">
                        <strong>🔐 Security Features:</strong><br>
                        • IP-based access control<br>
                        • Session timeout after 24 hours<br>
                        • Device recognition<br>
                        • Secure authentication
                    </div>
                    <p style="color: #718096; font-size: 14px;">
                        <strong>💡 Tip:</strong> Trusted devices can access without password when on approved networks.
                    </p>
                </div>
            </div>

            <style>
                @keyframes slideIn {
                    from {
                        transform: translateY(-50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            </style>
        `;

        // Auto-focus password input
        setTimeout(() => {
            overlay.querySelector('#password-input').focus();
        }, 100);

        return overlay;
    }

    isFromTrustedNetwork() {
        // Check if client IP is in trusted list
        // This is a simplified check - would need real IP detection
        return false; // Default to requiring password until IP detection works
    }

    handleLogin() {
        const passwordInput = document.getElementById('password-input');
        const errorMessage = document.getElementById('error-message');
        const password = passwordInput.value.trim();

        if (!password) {
            this.showError('Please enter a password');
            return;
        }

        // Check password
        if (password === this.fallbackPassword) {
            // Successful login
            this.createSession();
            this.showDashboard();
        } else {
            this.showError('Incorrect password. Please try again.');
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    showError(message) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';

        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    addSessionIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'session-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #48bb78;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 8px;
        `;

        const device = this.detectDevice();
        indicator.innerHTML = `
            <span>🔒</span>
            <span>Session Active (${device})</span>
            <button onclick="dashboard.logout()" style="
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 10px;
            ">Logout</button>
        `;

        document.body.appendChild(indicator);
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem(this.sessionKey);
            document.cookie = 'dashboard_session=; path=/; max-age=0';
            document.getElementById('session-indicator')?.remove();
            location.reload();
        }
    }

    initializeDashboard() {
        // Add any dashboard-specific initialization
        console.log('🚀 Dashboard initialized');

        // Initialize tooltips, charts, etc.
        this.initTooltips();
    }

    initTooltips() {
        // Initialize any UI components
        const tooltips = document.querySelectorAll('[data-tooltip]');
        tooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                // Show tooltip
            });
        });
    }

    isAuthenticated() {
        return this.isValidSession();
    }
}

// Initialize protection when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new EnhancedDashboardProtection();
});

// Also initialize immediately if DOM already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.dashboard = new EnhancedDashboardProtection();
    });
} else {
    window.dashboard = new EnhancedDashboardProtection();
}