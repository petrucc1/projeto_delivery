<?php
return [
    'supports_credentials' => true,
    'allowed_origins' => [
        'http://localhost:3000',
        'http://localhost:8000',
        'http://localhost:3001',
    ],
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
];