import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './Dashboard.js';
import ProjectDetailsNew from './ProjectDetailsNew.js';

// Simple inline LoginPage to avoid import issues
const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (isFormValid) {
      setIsLoading(true);
      setShowError(false);

      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials
      if (email.trim().toLowerCase() === 'admin' && password === 'admin') {
        setIsLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          alert('Login successful! Welcome to the dashboard.');
        }
      } else {
        setIsLoading(false);
        setShowError(true);
        setErrorMessage('Invalid username or password. Please try again.');
      }
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      margin: 0,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {/* Floating shapes */}
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: `${60 + i * 10}px`,
            height: `${60 + i * 10}px`,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            animation: `float${i} ${8 + i}s ease-in-out infinite`
          }} />
        ))}
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '420px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          animation: 'cardEntrance 1s ease-out'
        }}>
          {/* Logo Header */}
          <div style={{
            background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
            padding: '30px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}>
                <span style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: 'white',
                  letterSpacing: '2px',
                  lineHeight: 1
                }}>NEXGEN Systems</span>
                <span style={{
                  fontSize: '10px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontStyle: 'italic',
                  letterSpacing: '1px',
                  marginTop: '2px'
                }}>elevating excellence</span>
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div style={{
            padding: '40px 30px 20px 30px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#333',
              marginBottom: '8px',
              margin: 0
            }}>Welcome Back</h2>
            <p style={{
              color: '#666',
              fontSize: '14px',
              margin: 0,
              opacity: 0.8
            }}>Please sign in to your account</p>
          </div>

          {/* Form Section */}
          <div style={{
            padding: '20px 30px 30px 30px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {/* Username Input */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: emailFocused ? '#ff0000' : '#999',
                  zIndex: 2,
                  transition: 'color 0.3s ease'
                }}>
                  👤
                </div>
                <input
                  type="email"
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 50px',
                    border: `2px solid ${emailFocused ? '#ff0000' : '#e1e5e9'}`,
                    borderRadius: '12px',
                    fontSize: '16px',
                    background: emailFocused ? 'white' : '#fafbfc',
                    color: '#333',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    boxShadow: emailFocused ? '0 0 0 3px rgba(255, 0, 0, 0.1)' : 'none',
                    transform: emailFocused ? 'translateY(-1px)' : 'translateY(0)'
                  }}
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>

              {/* Password Input */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: passwordFocused ? '#ff0000' : '#999',
                  zIndex: 2,
                  transition: 'color 0.3s ease'
                }}>
                  🔒
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  style={{
                    width: '100%',
                    padding: '16px 50px 16px 50px',
                    border: `2px solid ${passwordFocused ? '#ff0000' : '#e1e5e9'}`,
                    borderRadius: '12px',
                    fontSize: '16px',
                    background: passwordFocused ? 'white' : '#fafbfc',
                    color: '#333',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    boxShadow: passwordFocused ? '0 0 0 3px rgba(255, 0, 0, 0.1)' : 'none',
                    transform: passwordFocused ? 'translateY(-1px)' : 'translateY(0)'
                  }}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <button 
                  type="button" 
                  onClick={togglePassword}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#999',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              {/* Error Message */}
              {showError && (
                <div style={{
                  background: '#ffebee',
                  color: '#c62828',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #ffcdd2'
                }}>
                  ❌ {errorMessage}
                </div>
              )}

              {/* Login Hint */}
              <div style={{
                background: '#e3f2fd',
                color: '#1565c0',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid #bbdefb',
                textAlign: 'left'
              }}>
                💡 Use <strong>admin</strong> for both username and password
              </div>

              {/* Form Options */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#666',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <a href="#" style={{
                  color: '#ff0000',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>Forgot password?</a>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={!isFormValid || isLoading}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: !isFormValid || isLoading ? '#ccc' : 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: !isFormValid || isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: !isFormValid || isLoading ? 'none' : '0 4px 15px rgba(255, 0, 0, 0.3)'
                }}
              >
                {isLoading ? (
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: '20px 30px 30px 30px',
            textAlign: 'center',
            borderTop: '1px solid #f0f0f0'
          }}>
            <p style={{
              margin: 0,
              color: '#666',
              fontSize: '14px'
            }}>
              Developed by <a href="https://www.globalsolutionsgroup.co.za" style={{
                color: '#ff0000',
                textDecoration: 'none',
                fontWeight: '600'
              }}>Global Solutions Group</a>
            </p>
            <p style={{
              margin: '5px 0 0 0',
              color: '#666',
              fontSize: '14px'
            }}>version 1.0</p>
          </div>
        </div>
      </div>

      {/* Add basic animations */}
      <style>{`
        @keyframes float1 { 0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; } 50% { transform: translateY(-20px) rotate(180deg); opacity: 1; } }
        @keyframes float2 { 0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; } 50% { transform: translateY(-15px) rotate(90deg); opacity: 0.9; } }
        @keyframes float3 { 0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.8; } 50% { transform: translateY(-25px) rotate(270deg); opacity: 1; } }
        @keyframes float4 { 0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.5; } 50% { transform: translateY(-10px) rotate(45deg); opacity: 0.8; } }
        @keyframes float5 { 0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.9; } 50% { transform: translateY(-30px) rotate(135deg); opacity: 1; } }
        @keyframes cardEntrance { 0% { transform: translateY(30px) scale(0.95); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
      `}</style>
    </div>
  );
};

// Simple WelcomePage component
const WelcomePage = ({ onGetStarted }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Welcome!</h1>
        <h2 style={{ fontSize: '32px', marginBottom: '40px' }}>nexGEN SYSTEMS</h2>
        <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.9 }}>elevating excellence</p>
        <button
          onClick={onGetStarted}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            background: 'white',
            color: '#ff0000',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedProject, setSelectedProject] = useState(null);

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard'); // Navigate to dashboard instead of welcome
  };

  const handleLogout = () => {
    setCurrentPage('login'); // Return to login page when logging out
    setSelectedProject(null); // Clear selected project
  };

  const navigateToLogin = () => {
    setCurrentPage('login');
  };

  const navigateToWelcome = () => {
    setCurrentPage('welcome');
  };

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const navigateToProjectDetails = (project) => {
    setSelectedProject(project);
    setCurrentPage('ProjectDetailsNew');
  };

  // Render Project Details page
  if (currentPage === 'ProjectDetailsNew') {
    return <ProjectDetailsNew project={selectedProject} onBack={navigateToDashboard} />;
  }

  // Render Dashboard page
  if (currentPage === 'dashboard') {
    return <Dashboard onLogout={handleLogout} onNavigateToWelcome={navigateToWelcome} onNavigateToProjectDetails={navigateToProjectDetails} />;
  }

  // Render Welcome page
  if (currentPage === 'welcome') {
    return <WelcomePage onGetStarted={navigateToLogin} />;
  }

  // Default: render Login page
  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);