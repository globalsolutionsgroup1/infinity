import React, { useState, useEffect } from 'react';

const EditUser = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
    department: '',
    assignedProjectId: '',
    priorityLevel: 'Standard',
    startDate: null,
    newPassword: '',
    isActive: true
  });
  const [sendPasswordResetEmail, setSendPasswordResetEmail] = useState(false);
  const [forcePasswordReset, setForcePasswordReset] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);

  const filteredUsers = searchTerm.trim() === ''
    ? allUsers
    : allUsers.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.department.toLowerCase().includes(searchTerm.toLowerCase())
      );

  useEffect(() => {
    loadUsers();
    loadAvailableProjects();
  }, []);

  const loadUsers = () => {
    setAllUsers([
      {
        id: '1',
        name: 'John April',
        role: 'Supervisor',
        department: 'Construction',
        email: 'john.april@nexgen.co.za',
        phoneNumber: '+27 12 345 6789',
        isActive: true,
        lastLogin: '12/06/2025',
        createdDate: '15/03/2024',
        projectsAssigned: 3,
        loginCount: 127
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        role: 'Engineer',
        department: 'Engineering',
        email: 'sarah.johnson@nexgen.co.za',
        phoneNumber: '+27 11 987 6543',
        isActive: true,
        lastLogin: '11/06/2025',
        createdDate: '08/02/2024',
        projectsAssigned: 2,
        loginCount: 89
      },
      {
        id: '3',
        name: 'Mike Davis',
        role: 'Worker',
        department: 'Construction',
        email: 'mike.davis@nexgen.co.za',
        phoneNumber: '+27 21 555 4321',
        isActive: true,
        lastLogin: '10/06/2025',
        createdDate: '22/01/2024',
        projectsAssigned: 1,
        loginCount: 156
      },
      {
        id: '4',
        name: 'Lisa Wilson',
        role: 'Admin',
        department: 'Management',
        email: 'lisa.wilson@nexgen.co.za',
        phoneNumber: '+27 31 444 1234',
        isActive: false,
        lastLogin: '28/05/2025',
        createdDate: '05/12/2023',
        projectsAssigned: 0,
        loginCount: 203
      },
      {
        id: '5',
        name: 'David Brown',
        role: 'Supervisor',
        department: 'Safety',
        email: 'david.brown@nexgen.co.za',
        phoneNumber: '+27 41 777 8888',
        isActive: true,
        lastLogin: '12/06/2025',
        createdDate: '10/11/2023',
        projectsAssigned: 4,
        loginCount: 267
      }
    ]);
  };

  const loadAvailableProjects = () => {
    setAvailableProjects([
      { id: '1', name: 'Klerksdorp EXT 12 Project', location: 'Klerksdorp' },
      { id: '2', name: 'Potchefstroom Housing Development', location: 'Potchefstroom' },
      { id: '3', name: 'Welkom Industrial Complex', location: 'Welkom' },
      { id: '4', name: 'Bloemfontein Commercial Center', location: 'Bloemfontein' },
      { id: '5', name: 'Kimberley Residential Estate', location: 'Kimberley' }
    ]);
  };

  const getInitials = (name) => {
    const names = name.split(' ').filter(n => n);
    if (names.length >= 2)
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    return names.length > 0 ? names[0][0].toUpperCase() : '?';
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    const nameParts = user.name.split(' ');
    setEditUser({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      department: user.department,
      isActive: user.isActive,
      assignedProjectId: '',
      priorityLevel: 'Standard',
      startDate: null,
      newPassword: ''
    });
  };

  const handleRoleChange = (role) => {
    setEditUser(prev => ({
      ...prev,
      role,
      assignedProjectId: role !== 'Supervisor' ? '' : prev.assignedProjectId,
      priorityLevel: role !== 'Supervisor' ? 'Standard' : prev.priorityLevel
    }));
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const closeSidebar = () => setSidebarCollapsed(true);
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);

  const handleLogout = () => {
    window.location.href = '/Login';
  };

  const goBack = () => {
    window.location.href = '/Dashboard';
  };

  const updateUser = () => {
    // Validation logic
    if (!editUser.firstName.trim() || !editUser.lastName.trim() || 
        !editUser.email.trim() || !editUser.role.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (editUser.role === 'Supervisor' && !editUser.assignedProjectId.trim()) {
      alert('Please assign a project for the supervisor');
      return;
    }

    // Update user logic here
    alert('User updated successfully!');
    window.location.href = '/Dashboard';
  };

  const cancel = () => {
    setSelectedUser(null);
    setEditUser({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: '',
      department: '',
      assignedProjectId: '',
      priorityLevel: 'Standard',
      startDate: null,
      newPassword: '',
      isActive: true
    });
  };

  return (
    <div className="app-container">
      {/* Left Sidebar Navigation */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text">NEXGEN</span>
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/Dashboard" className="nav-link">
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Dashboard</span>
              </a>
            </li>

            <li className={`nav-item dropdown active`} onClick={toggleUserDropdown}>
              <div className={`nav-link dropdown-toggle ${showUserDropdown ? 'expanded' : ''}`}>
                <span className="nav-icon">👥</span>
                <span className="nav-text">Manage Users</span>
                <span className="dropdown-arrow">▼</span>
              </div>
              <ul className={`dropdown-menu ${showUserDropdown ? 'show' : ''}`}>
                <li className="dropdown-item">
                  <a href="/AddNewUser" className="dropdown-link">
                    <span className="dropdown-icon">➕</span>
                    <span className="dropdown-text">Add New User</span>
                  </a>
                </li>
                <li className="dropdown-item">
                  <a href="/EditUser" className="dropdown-link active">
                    <span className="dropdown-icon">✏️</span>
                    <span className="dropdown-text">Edit User</span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="/Reports" className="nav-link">
                <span className="nav-icon">📊</span>
                <span className="nav-text">Reports</span>
              </a>
            </li>

            <li className="nav-item">
              <a href="/Invoicing" className="nav-link">
                <span className="nav-icon">💰</span>
                <span className="nav-text">Invoicing</span>
              </a>
            </li>

            <li className="nav-item">
              <a href="/Claims" className="nav-link">
                <span className="nav-icon">📋</span>
                <span className="nav-text">Claims</span>
              </a>
            </li>
          </ul>

          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <span className="nav-icon">🚪</span>
              <span className="nav-text">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <div className={`sidebar-overlay ${sidebarCollapsed ? '' : 'show'}`} onClick={closeSidebar}></div>

      {/* Main Content Area */}
      <div className={`main-wrapper ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="edit-user-container">
          <div className="main-content">
            {/* Header Section */}
            <div className="header-section animate-slide-down">
              <div className="header-content">
                <button className="desktop-menu-btn" onClick={toggleSidebar}>
                  <span className="hamburger"></span>
                  <span className="hamburger"></span>
                  <span className="hamburger"></span>
                </button>
                <button className="mobile-menu-btn" onClick={toggleSidebar}>
                  <span className="hamburger"></span>
                  <span className="hamburger"></span>
                  <span className="hamburger"></span>
                </button>
                <div className="nexgen-header">
                  <span className="nexgen-systems">NEXGEN</span>
                  <span className="systems-text">SYSTEMS</span>
                </div>
              </div>
              <div className="page-subtitle">
                <button className="dashboard-btn" onClick={goBack}>
                  <span className="dashboard-icon">🏠</span>
                  <span className="dashboard-text">BACK TO DASHBOARD</span>
                </button>
                EDIT USER
              </div>
            </div>

            {/* User Selection Section */}
            <div className="user-selection-section animate-fade-in-up">
              <div className="selection-container">
                <div className="selection-header">
                  <h3 className="selection-title">SELECT USER TO EDIT</h3>
                </div>
                <div className="user-search">
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="users-grid">
                  {filteredUsers.map((user) => (
                    <div 
                      key={user.id}
                      className={`user-card ${selectedUser?.id === user.id ? 'selected' : ''}`}
                      onClick={() => selectUser(user)}
                    >
                      <div className="user-avatar">
                        <span className="avatar-text">{getInitials(user.name)}</span>
                      </div>
                      <div className="user-info">
                        <h4 className="user-name">{user.name}</h4>
                        <p className="user-role">{user.role}</p>
                        <p className="user-department">{user.department}</p>
                      </div>
                      <div className="user-status">
                        <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                          {user.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Section (Only shown when user is selected) */}
            {selectedUser && (
              <div className="form-section animate-fade-in-up">
                <div className="form-container">
                  <div className="form-header">
                    <div className="header-left">
                      <button className="back-btn" onClick={goBack}>
                        <span className="back-icon">←</span>
                        <span className="back-text">BACK</span>
                      </button>
                      <h2 className="form-title">EDIT USER - {selectedUser.name}</h2>
                    </div>
                    <div className="form-actions">
                      <button className="btn-secondary" onClick={cancel}>CANCEL</button>
                      <button className="btn-primary" onClick={updateUser}>UPDATE USER</button>
                    </div>
                  </div>

                  <div className="form-content">
                    {/* Personal Information Section */}
                    <div className="form-section-card animate-scale-in" style={{animationDelay: '0.2s'}}>
                      <div className="section-header">
                        <h3 className="section-title">PERSONAL INFORMATION</h3>
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">FIRST NAME *</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={editUser.firstName}
                            onChange={(e) => setEditUser({...editUser, firstName: e.target.value})}
                            placeholder="Enter first name" 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">LAST NAME *</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={editUser.lastName}
                            onChange={(e) => setEditUser({...editUser, lastName: e.target.value})}
                            placeholder="Enter last name" 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">EMAIL ADDRESS *</label>
                          <input 
                            type="email" 
                            className="form-input" 
                            value={editUser.email}
                            onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                            placeholder="Enter email address" 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">PHONE NUMBER</label>
                          <input 
                            type="tel" 
                            className="form-input" 
                            value={editUser.phoneNumber}
                            onChange={(e) => setEditUser({...editUser, phoneNumber: e.target.value})}
                            placeholder="Enter phone number" 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Role and Access Section */}
                    <div className="form-section-card animate-scale-in" style={{animationDelay: '0.4s'}}>
                      <div className="section-header">
                        <h3 className="section-title">ROLE & ACCESS</h3>
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">USER ROLE *</label>
                          <select 
                            className="form-select" 
                            value={editUser.role}
                            onChange={(e) => handleRoleChange(e.target.value)}
                          >
                            <option value="">Select a role</option>
                            <option value="Admin">Administrator</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Worker">Worker</option>
                            <option value="Viewer">Viewer</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">DEPARTMENT</label>
                          <select 
                            className="form-select" 
                            value={editUser.department}
                            onChange={(e) => setEditUser({...editUser, department: e.target.value})}
                          >
                            <option value="">Select department</option>
                            <option value="Construction">Construction</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Quality Control">Quality Control</option>
                            <option value="Safety">Safety</option>
                            <option value="Management">Management</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Project Assignment Section (Only shown for Supervisors) */}
                    {editUser.role === 'Supervisor' && (
                      <div className="form-section-card supervisor-section animate-scale-in" style={{animationDelay: '0.6s'}}>
                        <div className="section-header">
                          <h3 className="section-title">PROJECT ASSIGNMENT</h3>
                          <div className="section-badge">SUPERVISOR</div>
                        </div>
                        <div className="form-grid">
                          <div className="form-group full-width">
                            <label className="form-label">ASSIGN TO PROJECT</label>
                            <select 
                              className="form-select" 
                              value={editUser.assignedProjectId}
                              onChange={(e) => setEditUser({...editUser, assignedProjectId: e.target.value})}
                            >
                              <option value="">Select a project to supervise</option>
                              {availableProjects.map(project => (
                                <option key={project.id} value={project.id}>
                                  {project.name} - {project.location}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label className="form-label">START DATE</label>
                            <input 
                              type="date" 
                              className="form-input" 
                              value={editUser.startDate || ''}
                              onChange={(e) => setEditUser({...editUser, startDate: e.target.value})}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">PRIORITY LEVEL</label>
                            <select 
                              className="form-select" 
                              value={editUser.priorityLevel}
                              onChange={(e) => setEditUser({...editUser, priorityLevel: e.target.value})}
                            >
                              <option value="Standard">Standard</option>
                              <option value="High">High Priority</option>
                              <option value="Critical">Critical</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Account Settings Section */}
                    <div className="form-section-card animate-scale-in" style={{animationDelay: '0.8s'}}>
                      <div className="section-header">
                        <h3 className="section-title">ACCOUNT SETTINGS</h3>
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">RESET PASSWORD</label>
                          <input 
                            type="password" 
                            className="form-input" 
                            value={editUser.newPassword}
                            onChange={(e) => setEditUser({...editUser, newPassword: e.target.value})}
                            placeholder="Enter new password (leave blank to keep current)" 
                          />
                        </div>
                        <div className="form-group">
                          <div className="checkbox-group">
                            <input 
                              type="checkbox" 
                              id="sendEmail" 
                              checked={sendPasswordResetEmail}
                              onChange={(e) => setSendPasswordResetEmail(e.target.checked)}
                            />
                            <label htmlFor="sendEmail" className="checkbox-label">Send password reset email</label>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="checkbox-group">
                            <input 
                              type="checkbox" 
                              id="forceReset" 
                              checked={forcePasswordReset}
                              onChange={(e) => setForcePasswordReset(e.target.checked)}
                            />
                            <label htmlFor="forceReset" className="checkbox-label">Force password reset on next login</label>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="checkbox-group">
                            <input 
                              type="checkbox" 
                              id="isActive" 
                              checked={editUser.isActive}
                              onChange={(e) => setEditUser({...editUser, isActive: e.target.checked})}
                            />
                            <label htmlFor="isActive" className="checkbox-label">Account is active</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* User Activity Section */}
                    <div className="form-section-card activity-section animate-scale-in" style={{animationDelay: '1.0s'}}>
                      <div className="section-header">
                        <h3 className="section-title">USER ACTIVITY</h3>
                        <div className="section-badge activity">INFO</div>
                      </div>
                      <div className="activity-grid">
                        <div className="activity-item">
                          <span className="activity-label">Last Login:</span>
                          <span className="activity-value">{selectedUser.lastLogin}</span>
                        </div>
                        <div className="activity-item">
                          <span className="activity-label">Account Created:</span>
                          <span className="activity-value">{selectedUser.createdDate}</span>
                        </div>
                        <div className="activity-item">
                          <span className="activity-label">Projects Assigned:</span>
                          <span className="activity-value">{selectedUser.projectsAssigned}</span>
                        </div>
                        <div className="activity-item">
                          <span className="activity-label">Login Count:</span>
                          <span className="activity-value">{selectedUser.loginCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .app-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-x: hidden;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, #ff0000 0%, #cc0000 100%);
          color: white;
          transition: all 0.3s ease;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 1000;
          box-shadow: 2px 0 10px rgba(255, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          padding: 25px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.15);
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo-text {
          font-size: 26px;
          font-weight: 900;
          letter-spacing: 2px;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .sidebar-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          gap: 3px;
          padding: 8px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .hamburger {
          width: 20px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 25px 0;
        }

        .nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
        }

        .nav-item {
          margin-bottom: 5px;
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 18px 25px;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border-left: 4px solid transparent;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border-left-color: white;
        }

        .nav-item.active .nav-link {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-left-color: white;
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .nav-icon {
          font-size: 20px;
          margin-right: 15px;
          width: 24px;
          text-align: center;
        }

        .nav-text {
          font-size: 15px;
          font-weight: 600;
          flex: 1;
        }

        /* Dropdown Styles */
        .dropdown {
          position: relative;
        }

        .dropdown-toggle {
          justify-content: space-between;
        }

        .dropdown-arrow {
          font-size: 12px;
          transition: all 0.3s ease;
          margin-left: auto;
        }

        .dropdown-toggle.expanded .dropdown-arrow {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          list-style: none;
          margin: 0;
          padding: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          background: rgba(0, 0, 0, 0.2);
        }

        .dropdown-menu.show {
          max-height: 200px;
          padding: 5px 0;
        }

        .dropdown-item {
          margin: 0;
        }

        .dropdown-link {
          display: flex;
          align-items: center;
          padding: 15px 25px 15px 55px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
          font-size: 14px;
        }

        .dropdown-link:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border-left-color: white;
        }

        .dropdown-link.active {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-left-color: white;
        }

        .dropdown-icon {
          font-size: 16px;
          margin-right: 12px;
          width: 18px;
          text-align: center;
        }

        .dropdown-text {
          font-weight: 500;
        }

        /* Sidebar Footer */
        .sidebar-footer {
          padding: 25px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 18px 25px;
          background: linear-gradient(135deg, #dc3545 0%, #b02a37 100%);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 3px 12px rgba(220, 53, 69, 0.3);
        }

        .logout-btn:hover {
          background: linear-gradient(135deg, #b02a37 0%, #9c1e2a 100%);
          transform: translateY(-2px);
          box-shadow: 0 5px 18px rgba(220, 53, 69, 0.4);
        }

        /* Sidebar Overlay for Mobile */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .sidebar-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        /* Main Content Wrapper */
        .main-wrapper {
          flex: 1;
          margin-left: 260px;
          transition: all 0.3s ease;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .main-wrapper.collapsed {
          margin-left: 0;
        }

        .edit-user-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
          margin: 0;
          padding: 0;
          background: #ffffff;
          position: relative;
          overflow-x: hidden;
        }

        /* Desktop Menu Button */
        .desktop-menu-btn {
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          flex-direction: column;
          gap: 3px;
          padding: 10px;
          border-radius: 6px;
          transition: all 0.3s ease;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }

        .desktop-menu-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-50%) scale(1.05);
        }

        .desktop-menu-btn .hamburger {
          width: 18px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
          border-radius: 1px;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          gap: 3px;
          padding: 8px;
          margin-right: 15px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-btn .hamburger {
          width: 20px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
        }

        .main-content {
          flex: 1;
          position: relative;
          z-index: 2;
          overflow-y: auto;
          overflow-x: hidden;
        }

        /* Animations */
        @keyframes slideDown {
          0% {
            transform: translateY(-30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slideDown 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
          animation-fill-mode: both;
        }

        /* Header Section */
        .header-section {
          background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
          padding: 25px 30px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(255, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        .header-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: headerShine 4s ease-in-out infinite;
        }

        @keyframes headerShine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .nexgen-header {
          color: white;
          position: relative;
          z-index: 2;
          margin-bottom: 10px;
        }

        .nexgen-systems {
          font-size: 36px;
          font-weight: 900;
          letter-spacing: 3px;
          margin-right: 20px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .systems-text {
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 2px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .page-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .dashboard-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          backdrop-filter: blur(10px);
        }

        .dashboard-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .dashboard-icon {
          font-size: 14px;
        }

        .dashboard-text {
          font-size: 11px;
          font-weight: 600;
        }

        /* User Selection Section */
        .user-selection-section {
          padding: 30px;
          background: #ffffff;
        }

        .selection-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .selection-header {
          margin-bottom: 20px;
          text-align: center;
        }

        .selection-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .user-search {
          margin-bottom: 30px;
          text-align: center;
        }

        .search-input {
          padding: 15px 20px;
          border: 1px solid #ddd;
          background: #f5f5f5;
          border-radius: 8px;
          font-size: 16px;
          width: 100%;
          max-width: 400px;
          color: #666;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #ff0000;
          background: white;
          box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.1);
          outline: none;
          color: #333;
        }

        .users-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .user-card {
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .user-card:hover {
          border-color: #ff0000;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 0, 0, 0.15);
        }

        .user-card.selected {
          border-color: #ff0000;
          background: rgba(255, 0, 0, 0.05);
          box-shadow: 0 8px 25px rgba(255, 0, 0, 0.2);
        }

        .user-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .avatar-text {
          color: white;
          font-size: 18px;
          font-weight: 700;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-size: 16px;
          font-weight: 700;
          color: #333;
          margin: 0 0 5px 0;
        }

        .user-role {
          font-size: 14px;
          color: #666;
          margin: 0 0 3px 0;
          font-weight: 600;
        }

        .user-department {
          font-size: 13px;
          color: #999;
          margin: 0;
        }

        .user-status {
          flex-shrink: 0;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge.active {
          background: #28a745;
          color: white;
        }

        .status-badge.inactive {
          background: #dc3545;
          color: white;
        }

        /* Form Section */
        .form-section {
          padding: 30px;
          background: #ffffff;
          min-height: calc(100vh - 200px);
        }

        .form-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 25px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #e9ecef;
          gap: 20px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 3px 12px rgba(108, 117, 125, 0.3);
        }

        .back-btn:hover {
          background: linear-gradient(135deg, #5a6268 0%, #495057 100%);
          transform: translateY(-2px);
          box-shadow: 0 5px 18px rgba(108, 117, 125, 0.4);
        }

        .back-icon {
          font-size: 16px;
          font-weight: bold;
        }

        .back-text {
          font-size: 12px;
          font-weight: 600;
        }

        .form-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .form-actions {
          display: flex;
          gap: 12px;
        }

        .btn-primary, .btn-secondary {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
          box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #cc0000 0%, #990000 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 0, 0, 0.4);
        }

        .btn-secondary:hover {
          background: #545b62;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
        }

        .form-content {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-section-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 25px;
          border: 1px solid #e9ecef;
          position: relative;
          overflow: hidden;
        }

        .form-section-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
        }

        .supervisor-section::before {
          background: linear-gradient(135deg, #ff6600 0%, #cc4400 100%);
        }

        .activity-section::before {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #dee2e6;
        }

        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #333;
          margin: 0;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .section-badge {
          background: linear-gradient(135deg, #ff6600 0%, #cc4400 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-badge.activity {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: 12px;
          font-weight: 600;
          color: #495057;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input, .form-select {
          padding: 12px 15px;
          border: 1px solid #ced4da;
          border-radius: 6px;
          font-size: 14px;
          color: #495057;
          background: white;
          transition: all 0.3s ease;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #ff0000;
          box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.1);
          background: #fff;
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 12px center;
          background-repeat: no-repeat;
          background-size: 16px;
          padding-right: 40px;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 5px;
        }

        .checkbox-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #ff0000;
        }

        .checkbox-label {
          font-size: 13px;
          color: #495057;
          cursor: pointer;
          user-select: none;
        }

        /* Activity Grid */
        .activity-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .activity-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          background: white;
          border-radius: 6px;
          border: 1px solid #dee2e6;
        }

        .activity-label {
          font-size: 12px;
          font-weight: 600;
          color: #6c757d;
          text-transform: uppercase;
        }

        .activity-value {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        /* Mobile Responsiveness */
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar:not(.collapsed) {
            transform: translateX(0);
          }

          .main-wrapper {
            margin-left: 0;
          }

          .desktop-menu-btn {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .sidebar-toggle {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .nexgen-systems {
            font-size: 24px;
          }

          .systems-text {
            font-size: 16px;
          }

          .user-selection-section {
            padding: 20px 15px;
          }

          .users-grid {
            grid-template-columns: 1fr;
          }

          .form-section {
            padding: 20px 15px;
          }

          .form-header {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }

          .header-left {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
          }

          .form-content {
            padding: 20px 15px;
          }

          .form-section-card {
            padding: 20px 15px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .activity-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .header-section {
            padding: 20px 15px;
          }

          .nexgen-systems {
            font-size: 20px;
          }

          .systems-text {
            font-size: 14px;
          }

          .form-title {
            font-size: 18px;
          }

          .form-section-card {
            padding: 15px;
          }

          .section-title {
            font-size: 14px;
          }

          .user-card {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
        }

        /* Sidebar collapsed state for desktop */
        @media (min-width: 1025px) {
          .sidebar.collapsed {
            transform: translateX(-100%);
          }

          .main-wrapper.collapsed {
            margin-left: 0;
          }

          .desktop-menu-btn {
            display: flex;
          }

          .mobile-menu-btn {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default EditUser;