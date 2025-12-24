-- MySQL Database Schema for Calculator App
-- Run this on your Hostinger MySQL database

CREATE DATABASE IF NOT EXISTS calculator_db;
USE calculator_db;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User roles table
CREATE TABLE user_roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_role (user_id, role)
);

-- Featured calculators table
CREATE TABLE featured_calculators (
  id INT AUTO_INCREMENT PRIMARY KEY,
  calculator_id VARCHAR(255) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Page visits table (analytics)
CREATE TABLE page_visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_path VARCHAR(500) NOT NULL,
  referrer TEXT,
  visitor_id VARCHAR(255),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_page_path (page_path),
  INDEX idx_created_at (created_at)
);

-- Site settings table
CREATE TABLE site_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(255) UNIQUE NOT NULL,
  `value` TEXT,
  updated_by INT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create first admin user (change email and password!)
-- Password: admin123 (bcrypt hash)
INSERT INTO users (email, password) VALUES 
('admin@example.com', '$2a$10$rQnM1xJ1xJ1xJ1xJ1xJ1xOuR1xJ1xJ1xJ1xJ1xJ1xJ1xJ1xJ1xJ1x');

INSERT INTO user_roles (user_id, role) VALUES (1, 'admin');
