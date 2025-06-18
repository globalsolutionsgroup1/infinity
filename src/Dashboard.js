import React, { useState, useEffect } from 'react';

const Dashboard = ({ onLogout, onNavigateToProjectDetails }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectsList] = useState([
    {
      name: "Klerksdorp EXT 12 Project",
      location: "Klerksdorp",
      assignedTo: "John April",
      createdDate: "12/05/2025",
      updatedDate: "12/05/2025"
    },
    {
      name: "Potchefstroom Housing Development",
      location: "Potchefstroom",
      assignedTo: "Sarah Johnson",
      createdDate: "10/05/2025",
      updatedDate: "11/05/2025"
    },
    {
      name: "Welkom Industrial Complex",
      location: "Welkom",
      assignedTo: "Mike Davis",
      createdDate: "08/05/2025",
      updatedDate: "12/05/2025"
    },
    {
      name: "Bloemfontein Commercial Center",
      location: "Bloemfontein",
      assignedTo: "Lisa Wilson",
      createdDate: "05/05/2025",
      updatedDate: "10/05/2025"
    }
  ]);

  const filteredProjects = searchTerm.trim() === '' 
    ? projectsList 
    : projectsList.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const closeSidebar = () => {
    setSidebarCollapsed(true);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/Login';
    }
  };

  const addNewProject = () => {
    // For artifact environment, we'll show an alert with instructions
    // In a real app, this would use React Router
    alert('Navigation to Add New Project page.\n\nTo test the Add New Project component:\n1. Open the "Add New Project - React" artifact\n2. Or use React Router in your application');
    
    // Alternative: Try direct navigation (may not work in artifact environment)
    // window.location.href = '/AddNewProject';
  };

  const addNewUser = () => {
    // For artifact environment, we'll show an alert with instructions
    alert('Navigation to Add New User page.\n\nTo test the Add New User component:\n1. Open the "Add New User - React" artifact\n2. Or use React Router in your application');
  };

  const editUser = () => {
    // For artifact environment, we'll show an alert with instructions
    alert('Navigation to Edit User page.\n\nTo test the Edit User component:\n1. Open the "Edit User Management - React" artifact\n2. Or use React Router in your application');
  };

  const viewDetails = (project) => {
    // For artifact environment, we'll show an alert with instructions
    alert(`View Details for: ${project.name}\n\nTo test the Project Details component:\n1. Open the "Project Details Dashboard - React" artifact\n2. Or use React Router in your application`);
  };

  const viewSupervisor = (project) => {
    alert(`View supervisor for: ${project.name}`);
  };

  const generateReport = (project) => {
    alert(`Generate report for: ${project.name}`);
  };

  // Inject styles
  useEffect(() => {
    const styles = `
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
  transform: translateX(0);
}

.sidebar.collapsed {
  transform: translateX(-100%);
}

.sidebar-header {
  padding: 20px 15px;
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
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
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
  transform: ${showUserDropdown ? 'rotate(180deg)' : 'rotate(0deg)'};
}

.dropdown-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: ${showUserDropdown ? '200px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.2);
  padding: ${showUserDropdown ? '5px 0' : '0'};
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
  cursor: pointer;
}

.dropdown-link:hover {
  background: rgba(255, 255, 255, 0.15);
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
  pointer-events: none;
}

/* Main Content Wrapper */
.main-wrapper {
  flex: 1;
  margin-left: 260px;
  transition: all 0.3s ease;
  height: 100vh;
  overflow-x: hidden;
  min-width: 0;
}

.main-wrapper.collapsed {
  margin-left: 0;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  min-width: 0;
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
  background: transparent;
  overflow: hidden;
  position: relative;
  z-index: 2;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Animations */
@keyframes slideDown {
  0% { transform: translateY(-30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes fadeInUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
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
  padding: 15px 30px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(255, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
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
}

.nexgen-systems {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 3px;
  margin-right: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.systems-text {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Milestone Section */
.milestone-section {
  display: flex;
  padding: 15px 20px;
  gap: 10px;
  flex-wrap: wrap;
  background: #ffffff;
  overflow-x: hidden;
  flex-shrink: 0;
}

.milestone-card {
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;
  flex: 1;
  box-shadow: 0 6px 25px rgba(255, 0, 0, 0.25);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.milestone-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  animation: cardShine 5s ease-in-out infinite;
}

@keyframes cardShine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.milestone-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 35px rgba(255, 0, 0, 0.35);
}

.milestone-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.8px;
  margin-bottom: 10px;
  opacity: 0.95;
  position: relative;
  z-index: 2;
}

.milestone-count {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Segoe UI', monospace;
  position: relative;
  z-index: 2;
}

/* Projects Section */
.projects-section {
  padding: 20px;
  background: #ffffff;
  margin: 0;
  overflow: hidden;
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
  flex-shrink: 0;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.search-section {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
}

.search-input-container {
  position: relative;
}

.search-input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 13px;
  width: 180px;
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

.search-input::placeholder {
  color: #999;
}

.search-btn, .add-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.search-btn {
  background: #0066cc;
  color: white;
  box-shadow: 0 3px 12px rgba(0, 102, 204, 0.3);
}

.add-btn {
  background: #00cc66;
  color: white;
  box-shadow: 0 3px 12px rgba(0, 204, 102, 0.3);
}

.search-btn:hover {
  background: #0052a3;
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 102, 204, 0.4);
}

.add-btn:hover {
  background: #00a352;
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 204, 102, 0.4);
}

/* Projects Table */
.projects-table-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 100%;
  flex: 1;
  min-height: 0;
}

.projects-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  table-layout: fixed;
  height: 100%;
  min-width: 1200px;
}

.projects-table td {
  padding: 10px 6px;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  vertical-align: middle;
  transition: all 0.3s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-row {
  transition: all 0.3s ease;
}

.project-row:hover {
  background: rgba(255, 0, 0, 0.02);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.project-row:last-child td {
  border-bottom: none;
}

.project-name {
  font-weight: 600;
  color: #333;
  width: 20%;
}

.project-location {
  color: #666;
  font-size: 13px;
  width: 10%;
}

.project-assignee {
  color: #666;
  font-size: 13px;
  width: 10%;
}

.project-date {
  color: #666;
  font-size: 13px;
  width: 8%;
}

.project-actions {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  width: 52%;
  justify-content: flex-start;
  align-items: center;
}

.action-btn {
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex: 1;
  text-align: center;
  min-width: 90px;
  max-width: 110px;
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', sans-serif;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.action-btn:hover::before {
  left: 100%;
}

.view-details {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.view-details:hover {
  background: linear-gradient(135deg, #357ABD 0%, #2E6BA8 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(74, 144, 226, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
}

.view-supervisor {
  background: linear-gradient(135deg, #FF8C42 0%, #FF7326 100%);
  color: white;
  box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.view-supervisor:hover {
  background: linear-gradient(135deg, #FF7326 0%, #E6640A 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 140, 66, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
}

.generate-report {
  background: linear-gradient(135deg, #50C878 0%, #3CB371 100%);
  color: white;
  box-shadow: 0 6px 20px rgba(80, 200, 120, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.generate-report:hover {
  background: linear-gradient(135deg, #3CB371 0%, #2E8B57 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(80, 200, 120, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
}

.action-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.action-btn:active {
  transform: translateY(-1px) scale(1.02);
  transition: all 0.1s ease;
}

/* Mobile Cards - Hidden on Desktop */
.mobile-projects {
  display: none;
}

/* Mobile responsiveness */
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
}

@media (max-width: 768px) {
  .nexgen-systems {
    font-size: 24px;
  }

  .systems-text {
    font-size: 16px;
  }

  .milestone-section {
    flex-direction: column;
    gap: 15px;
    padding: 20px;
  }

  .milestone-count {
    font-size: 28px;
  }

  .projects-section {
    padding: 20px 15px;
  }

  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .section-title {
    font-size: 20px;
    text-align: center;
  }

  .search-section {
    flex-direction: column;
    gap: 10px;
  }

  .search-input {
    width: 100%;
  }

  .search-btn, .add-btn {
    width: 100%;
  }

  /* Hide desktop table on mobile */
  .projects-table-container {
    display: none;
  }

  /* Show mobile cards */
  .mobile-projects {
    display: block;
  }

  .mobile-project-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    margin-bottom: 15px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }

  .mobile-project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  .mobile-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
  }

  .mobile-project-name {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    margin: 0;
    flex: 1;
    line-height: 1.2;
  }

  .mobile-status {
    background: #ff0000;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .mobile-project-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;
  }

  .mobile-detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }

  .mobile-label {
    font-weight: 600;
    color: #666;
    min-width: 80px;
  }

  .mobile-value {
    color: #333;
    font-weight: 500;
    text-align: right;
  }

  .mobile-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .mobile-action-btn {
    flex: 1;
    min-width: 110px;
    padding: 14px 12px;
    border: none;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    transition: all 0.3s ease;
    text-align: center;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .mobile-action-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  .mobile-action-btn:hover::before {
    left: 100%;
  }

  .mobile-action-btn.details {
    background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .mobile-action-btn.supervisor {
    background: linear-gradient(135deg, #FF8C42 0%, #FF7326 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .mobile-action-btn.report {
    background: linear-gradient(135deg, #50C878 0%, #3CB371 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(80, 200, 120, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .mobile-action-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  .mobile-action-btn:active {
    transform: translateY(-1px) scale(1.02);
    transition: all 0.1s ease;
  }
}

/* Large desktop adjustments */
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
`;

    if (typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.textContent = styles;
      if (!document.head.querySelector('style[data-nexgen-dashboard-styles]')) {
        styleElement.setAttribute('data-nexgen-dashboard-styles', 'true');
        document.head.appendChild(styleElement);
      }
    }
  }, [sidebarCollapsed, showUserDropdown]);

  return (
    <div className="app-container">
      {/* Left Sidebar Navigation */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
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
            <li className="nav-item active">
              <div className="nav-link">
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Dashboard</span>
              </div>
            </li>

            <li className={`nav-item dropdown`} onClick={toggleUserDropdown}>
              <div className={`nav-link dropdown-toggle ${showUserDropdown ? 'expanded' : ''}`}>
                <span className="nav-icon">👥</span>
                <span className="nav-text">Manage Users</span>
                <span className="dropdown-arrow">▼</span>
              </div>
              <ul className={`dropdown-menu ${showUserDropdown ? 'show' : ''}`}>
                <li className="dropdown-item">
                  <div className="dropdown-link" onClick={addNewUser}>
                    <span className="dropdown-icon">➕</span>
                    <span className="dropdown-text">Add New User</span>
                  </div>
                </li>
                <li className="dropdown-item">
                  <div className="dropdown-link" onClick={editUser}>
                    <span className="dropdown-icon">✏️</span>
                    <span className="dropdown-text">Edit User</span>
                  </div>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <div className="nav-link">
                <span className="nav-icon">📊</span>
                <span className="nav-text">Reports</span>
              </div>
            </li>

            <li className="nav-item">
              <div className="nav-link">
                <span className="nav-icon">💰</span>
                <span className="nav-text">Invoicing</span>
              </div>
            </li>

            <li className="nav-item">
              <div className="nav-link">
                <span className="nav-icon">📋</span>
                <span className="nav-text">Claims</span>
              </div>
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

      {/* Sidebar Overlay for Mobile - Removed to prevent dimming */}
      <div className="sidebar-overlay" onClick={closeSidebar}></div>

      {/* Main Content Area */}
      <div className={`main-wrapper ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="dashboard-container">
          <div className="main-content">
            {/* Header Section with NexGen Systems */}
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
            </div>

            {/* Milestone Cards Section */}
            <div className="milestone-section animate-fade-in-up">
              <div className="milestone-card foundation animate-scale-in" style={{animationDelay: '0.2s'}}>
                <div className="milestone-title">FOUNDATION</div>
                <div className="milestone-count">1000</div>
              </div>
              <div className="milestone-card wallplate animate-scale-in" style={{animationDelay: '0.4s'}}>
                <div className="milestone-title">WALLPLATE</div>
                <div className="milestone-count">1000</div>
              </div>
              <div className="milestone-card roofing animate-scale-in" style={{animationDelay: '0.6s'}}>
                <div className="milestone-title">ROOFING</div>
                <div className="milestone-count">1000</div>
              </div>
              <div className="milestone-card apron animate-scale-in" style={{animationDelay: '0.8s'}}>
                <div className="milestone-title">APRON</div>
                <div className="milestone-count">1000</div>
              </div>
              <div className="milestone-card total animate-scale-in" style={{animationDelay: '1.0s'}}>
                <div className="milestone-title">TOTAL COMPLETED</div>
                <div className="milestone-count">4000</div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="projects-section animate-fade-in-up">
              <div className="section-header">
                <h2 className="section-title">PROJECTS</h2>
                <div className="search-section">
                  <div className="search-input-container">
                    <input 
                      type="text"
                      className="search-input"
                      placeholder="Search Project"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="search-btn">SEARCH</button>
                  <button className="add-btn" onClick={addNewProject}>ADD NEW</button>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="projects-table-container">
                <table className="projects-table">
                  <tbody>
                    {filteredProjects.map((project, index) => (
                      <tr key={index} className="project-row">
                        <td className="project-name">{project.name}</td>
                        <td className="project-location">{project.location}</td>
                        <td className="project-assignee">{project.assignedTo}</td>
                        <td className="project-date">{project.createdDate}</td>
                        <td className="project-date">{project.updatedDate}</td>
                        <td className="project-actions">
                          <button className="action-btn view-details" onClick={() => viewDetails(project)}>
                            VIEW DETAILS
                          </button>
                          <button className="action-btn view-supervisor" onClick={() => viewSupervisor(project)}>
                            VIEW SUPERVISOR
                          </button>
                          <button className="action-btn generate-report" onClick={() => generateReport(project)}>
                            GENERATE REPORT
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="mobile-projects">
                {filteredProjects.map((project, index) => (
                  <div key={index} className="mobile-project-card">
                    <div className="mobile-card-header">
                      <h3 className="mobile-project-name">{project.name}</h3>
                      <span className="mobile-status">NEW</span>
                    </div>

                    <div className="mobile-project-details">
                      <div className="mobile-detail-item">
                        <span className="mobile-label">Location:</span>
                        <span className="mobile-value">{project.location}</span>
                      </div>
                      <div className="mobile-detail-item">
                        <span className="mobile-label">Assigned To:</span>
                        <span className="mobile-value">{project.assignedTo}</span>
                      </div>
                      <div className="mobile-detail-item">
                        <span className="mobile-label">Created:</span>
                        <span className="mobile-value">{project.createdDate}</span>
                      </div>
                      <div className="mobile-detail-item">
                        <span className="mobile-label">Updated:</span>
                        <span className="mobile-value">{project.updatedDate}</span>
      </div>
                    </div>

                    <div className="mobile-actions">
                      <button className="mobile-action-btn details" onClick={() => viewDetails(project)}>
                        <span>VIEW DETAILS</span>
                      </button>
                      <button className="mobile-action-btn supervisor" onClick={() => viewSupervisor(project)}>
                        <span>VIEW SUPERVISOR</span>
                      </button>
                      <button className="mobile-action-btn report" onClick={() => generateReport(project)}>
                        <span>GENERATE REPORT</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;