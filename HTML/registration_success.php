<?php
// registration_success.php - Confirmation page for successful registration
session_start();

// Check if user has valid registration data
if (!isset($_SESSION['registration_success'])) {
    header('Location: signup.html');
    exit;
}

$registration_data = $_SESSION['registration_success'];

// Clear the session data after retrieving it
unset($_SESSION['registration_success']);
?>

<!DOCTYPE HTML>
<html>

<head>
    <title>Registration Successful - Solar System Explorer</title>
    <link rel="stylesheet" href="home.css">
    <style>
        .success-container {
            max-width: 700px;
            margin: 50px auto;
            background: rgba(76, 175, 80, 0.1);
            border-radius: 15px;
            padding: 40px;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(76, 175, 80, 0.3);
            text-align: center;
        }

        .success-icon {
            font-size: 80px;
            color: #4CAF50;
            margin-bottom: 20px;
        }

        .success-title {
            color: #4CAF50;
            font-size: 32px;
            margin-bottom: 20px;
            font-weight: bold;
        }

        .success-message {
            color: #fff;
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 30px;
        }

        .registration-details {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 25px;
            margin: 30px 0;
            text-align: left;
        }

        .registration-details h3 {
            color: #4CAF50;
            margin-bottom: 15px;
            text-align: center;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
        }

        .detail-row:last-child {
            border-bottom: none;
        }

        .detail-label {
            font-weight: bold;
            color: #4CAF50;
        }

        .action-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 30px;
        }

        .btn {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: inline-block;
        }

        .btn-primary {
            background: linear-gradient(45deg, #4CAF50, #45a049);
            color: white;
        }

        .btn-secondary {
            background: linear-gradient(45deg, #2196F3, #1976D2);
            color: white;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .next-steps {
            background: rgba(33, 150, 243, 0.1);
            border-radius: 10px;
            padding: 25px;
            margin: 30px 0;
            border: 1px solid rgba(33, 150, 243, 0.3);
        }

        .next-steps h3 {
            color: #2196F3;
            margin-bottom: 15px;
            text-align: center;
        }

        .next-steps ul {
            color: #fff;
            text-align: left;
            line-height: 1.8;
        }

        .next-steps li {
            margin-bottom: 10px;
        }

        @media (max-width: 600px) {
            .action-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .btn {
                width: 200px;
                text-align: center;
            }
        }
    </style>
</head>

<body style="background: #000;">

    <header style="background: #000;">
        <h1 style="text-align:center;">Solar System Explorer</h1>
        <p style="text-align:center; font-size:18px;">Welcome to Our Space Community!</p>
    </header>

    <div class="nav">
        <ul>
            <li><a href="home.html">Home</a></li>
            <li><a href="Planets.html">Planets</a></li>
            <li><a href="orbit.html">Orbit Explorer</a></li>
            <li><a href="aboutsolarsystem.html">About the Solar System</a></li>
        </ul>
    </div>

    <div class="success-container">
        <div class="success-icon">🚀</div>
        <h1 class="success-title">Registration Successful!</h1>
        
        <div class="success-message">
            <p>Congratulations, <strong><?php echo htmlspecialchars($registration_data['name']); ?></strong>!</p>
            <p>You have successfully joined the Solar System Explorer community. Your registration has been confirmed and your information has been securely stored.</p>
        </div>

        <div class="registration-details">
            <h3>Registration Details</h3>
            <div class="detail-row">
                <span class="detail-label">Registration ID:</span>
                <span><?php echo htmlspecialchars($registration_data['id']); ?></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span><?php echo htmlspecialchars($registration_data['name']); ?></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span><?php echo htmlspecialchars($registration_data['email']); ?></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Registration Date:</span>
                <span><?php echo date('F j, Y \a\t g:i A', strtotime($registration_data['date'])); ?></span>
            </div>
        </div>

        <div class="next-steps">
            <h3>What's Next?</h3>
            <ul>
                <li>🌟 Explore our comprehensive planet guides and learn fascinating facts</li>
                <li>🌍 Use the interactive orbit explorer to visualize planetary movements</li>
                <li>📚 Read about the solar system's formation and characteristics</li>
                <li>🔍 Discover fun facts and amazing space phenomena</li>
                <li>📧 Check your email for our welcome message (if you subscribed to our newsletter)</li>
            </ul>
        </div>

        <div class="action-buttons">
            <a href="home.html" class="btn btn-primary">Explore Home</a>
            <a href="Planets.html" class="btn btn-secondary">View Planets</a>
            <a href="orbit.html" class="btn btn-secondary">Orbit Explorer</a>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <p style="color: rgba(255, 255, 255, 0.7); font-size: 14px;">
                <strong>Important:</strong> Please save your Registration ID for future reference. 
                If you have any questions or need support, please contact us with your Registration ID.
            </p>
        </div>
    </div>

    <footer style="text-align: center; margin-top: 50px; padding: 20px;">
        <p style="color: #fff;">© 2025 Solar System Explorer | Welcome to the Community | Created by Krisha</p>
    </footer>

    <script>
        // Add some celebratory animation
        document.addEventListener('DOMContentLoaded', function() {
            const successIcon = document.querySelector('.success-icon');
            
            // Animate the rocket icon
            successIcon.style.animation = 'bounce 2s infinite';
            
            // Add CSS animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-30px);
                    }
                    60% {
                        transform: translateY(-15px);
                    }
                }
            `;
            document.head.appendChild(style);
        });
    </script>

</body>

</html>