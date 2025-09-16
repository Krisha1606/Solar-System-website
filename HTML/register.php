<?php
// register.php - Handle user registration and store data
session_start();

// Configuration
$data_file = 'registrations.txt';
$max_file_size = 10 * 1024 * 1024; // 10MB limit

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to log registration attempt
function log_registration($data, $status) {
    $log_file = 'registration_log.txt';
    $timestamp = date('Y-m-d H:i:s');
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
    $log_entry = "[$timestamp] IP: $ip_address | Status: $status | Email: " . ($data['email'] ?? 'N/A') . "\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}

// Initialize response
$response = array(
    'success' => false,
    'message' => '',
    'errors' => array()
);

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Invalid request method';
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Collect and sanitize form data
$form_data = array(
    'fullname' => sanitize_input($_POST['fullname'] ?? ''),
    'email' => sanitize_input($_POST['email'] ?? ''),
    'age' => sanitize_input($_POST['age'] ?? ''),
    'interest' => sanitize_input($_POST['interest'] ?? ''),
    'experience' => sanitize_input($_POST['experience'] ?? ''),
    'comments' => sanitize_input($_POST['comments'] ?? ''),
    'newsletter' => isset($_POST['newsletter']) ? 'Yes' : 'No',
    'registration_date' => date('Y-m-d H:i:s'),
    'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
);

// Validation
$errors = array();

// Validate required fields
if (empty($form_data['fullname'])) {
    $errors[] = 'Full name is required';
} elseif (strlen($form_data['fullname']) < 2) {
    $errors[] = 'Full name must be at least 2 characters long';
}

if (empty($form_data['email'])) {
    $errors[] = 'Email address is required';
} elseif (!validate_email($form_data['email'])) {
    $errors[] = 'Please enter a valid email address';
}

// Validate age if provided
if (!empty($form_data['age'])) {
    $age = intval($form_data['age']);
    if ($age < 5 || $age > 120) {
        $errors[] = 'Age must be between 5 and 120';
    }
    $form_data['age'] = $age;
}

// Check if email already exists
if (file_exists($data_file)) {
    $existing_data = file_get_contents($data_file);
    if (strpos($existing_data, $form_data['email']) !== false) {
        $errors[] = 'This email address is already registered';
    }
}

// If there are validation errors, return them
if (!empty($errors)) {
    $response['errors'] = $errors;
    $response['message'] = 'Please correct the following errors:';
    log_registration($form_data, 'FAILED_VALIDATION');
    
    // For AJAX requests, return JSON
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
    
    // For regular form submission, redirect back with errors
    $_SESSION['signup_errors'] = $errors;
    $_SESSION['form_data'] = $form_data;
    header('Location: signup.html?error=1');
    exit;
}

// Check file size limit
if (file_exists($data_file) && filesize($data_file) > $max_file_size) {
    $response['message'] = 'Registration system is temporarily full. Please try again later.';
    log_registration($form_data, 'FILE_SIZE_LIMIT');
    
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
    
    $_SESSION['signup_errors'] = array($response['message']);
    header('Location: signup.html?error=1');
    exit;
}

// Prepare data for storage
$registration_entry = array(
    'ID' => uniqid('REG_', true),
    'Full Name' => $form_data['fullname'],
    'Email' => $form_data['email'],
    'Age' => $form_data['age'] ?: 'Not specified',
    'Interest' => $form_data['interest'] ?: 'Not specified',
    'Experience Level' => $form_data['experience'] ?: 'Not specified',
    'Comments' => $form_data['comments'] ?: 'None',
    'Newsletter Subscription' => $form_data['newsletter'],
    'Registration Date' => $form_data['registration_date'],
    'IP Address' => $form_data['ip_address']
);

// Format data for file storage
$formatted_entry = "\n" . str_repeat('=', 80) . "\n";
$formatted_entry .= "REGISTRATION #" . $registration_entry['ID'] . "\n";
$formatted_entry .= str_repeat('-', 80) . "\n";

foreach ($registration_entry as $key => $value) {
    if ($key !== 'ID') {
        $formatted_entry .= sprintf("%-20s: %s\n", $key, $value);
    }
}

$formatted_entry .= str_repeat('=', 80) . "\n";

// Attempt to save the registration
if (file_put_contents($data_file, $formatted_entry, FILE_APPEND | LOCK_EX) !== false) {
    $response['success'] = true;
    $response['message'] = 'Registration successful! Welcome to the Solar System Explorer community.';
    $response['registration_id'] = $registration_entry['ID'];
    
    log_registration($form_data, 'SUCCESS');
    
    // Store success data in session for confirmation page
    $_SESSION['registration_success'] = array(
        'name' => $form_data['fullname'],
        'email' => $form_data['email'],
        'id' => $registration_entry['ID'],
        'date' => $form_data['registration_date']
    );
    
    // For AJAX requests
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
    
    // For regular form submission, redirect to confirmation page
    header('Location: registration_success.php');
    exit;
    
} else {
    $response['message'] = 'Registration failed due to a system error. Please try again later.';
    log_registration($form_data, 'FILE_WRITE_ERROR');
    
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
    
    $_SESSION['signup_errors'] = array($response['message']);
    header('Location: signup.html?error=1');
    exit;
}
?>