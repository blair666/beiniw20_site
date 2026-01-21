// Interactive Skills Demo JavaScript

// Global variables
let monitoringInterval;
let responseTimeChart;
let architectureServices = [];

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.demo-tab');
    const contents = document.querySelectorAll('.demo-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('active', 'bg-blue-600', 'text-white');
                t.classList.add('bg-gray-200', 'text-gray-700');
            });
            this.classList.add('active', 'bg-blue-600', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Show/hide content
            contents.forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(targetTab + '-demos').classList.remove('hidden');
        });
    });
    
    // API endpoint change handler
    const apiEndpoint = document.getElementById('api-endpoint');
    if (apiEndpoint) {
        apiEndpoint.addEventListener('change', function() {
            const requestBody = document.getElementById('request-body');
            if (this.value === 'user-create' || this.value === 'user-update') {
                requestBody.classList.remove('hidden');
            } else {
                requestBody.classList.add('hidden');
            }
        });
    }
});

// Python & AI Functions
function analyzeData() {
    const csvInput = document.getElementById('csv-input').value;
    const results = document.getElementById('data-results');
    const stats = document.getElementById('data-stats');
    
    try {
        // Parse CSV data
        const lines = csvInput.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const data = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const row = {};
            headers.forEach((header, index) => {
                row[header] = isNaN(values[index]) ? values[index] : parseFloat(values[index]);
            });
            return row;
        });
        
        // Calculate statistics
        const numericColumns = headers.filter(header => 
            data.every(row => !isNaN(row[header]))
        );
        
        let statsHtml = `<strong>Dataset Summary:</strong><br>`;
        statsHtml += `• Total Records: ${data.length}<br>`;
        statsHtml += `• Columns: ${headers.join(', ')}<br><br>`;
        
        numericColumns.forEach(column => {
            const values = data.map(row => row[column]);
            const mean = values.reduce((a, b) => a + b, 0) / values.length;
            const min = Math.min(...values);
            const max = Math.max(...values);
            const std = Math.sqrt(values.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / values.length);
            
            statsHtml += `<strong>${column}:</strong> Mean: ${mean.toFixed(2)}, Min: ${min}, Max: ${max}, Std: ${std.toFixed(2)}<br>`;
        });
        
        stats.innerHTML = statsHtml;
        
        // Create chart if we have numeric data
        if (numericColumns.length >= 2) {
            createDataChart(data, numericColumns[0], numericColumns[1]);
        }
        
        results.classList.remove('hidden');
        
    } catch (error) {
        alert('Error parsing data. Please check your CSV format.');
    }
}

function createDataChart(data, xColumn, yColumn) {
    const ctx = document.getElementById('data-chart').getContext('2d');
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: `${yColumn} vs ${xColumn}`,
                data: data.map(row => ({x: row[xColumn], y: row[yColumn]})),
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: xColumn
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: yColumn
                    }
                }
            }
        }
    });
}

function predictSalary() {
    const experience = parseFloat(document.getElementById('experience-input').value);
    const education = parseFloat(document.getElementById('education-input').value);
    const results = document.getElementById('ml-results');
    const prediction = document.getElementById('salary-prediction');
    
    // Simple ML model simulation (linear regression with feature engineering)
    const baseSalary = 40000;
    const experienceWeight = 3500;
    const educationWeight = 8000;
    const interactionWeight = 500;
    
    const predictedSalary = baseSalary + 
        (experience * experienceWeight) + 
        (education * educationWeight) + 
        (experience * education * interactionWeight) +
        (Math.random() * 5000 - 2500); // Add some noise
    
    prediction.textContent = `$${Math.round(predictedSalary).toLocaleString()}`;
    results.classList.remove('hidden');
    
    // Simulate model confidence
    setTimeout(() => {
        const confidence = (85 + Math.random() * 10).toFixed(1);
        prediction.innerHTML += `<br><small class="text-sm text-gray-600">Confidence: ${confidence}%</small>`;
    }, 1000);
}

// Java & Backend Functions
function simulateAPI() {
    const endpoint = document.getElementById('api-endpoint').value;
    const jsonInput = document.getElementById('json-input').value;
    const response = document.getElementById('api-response');
    const responseContent = document.getElementById('response-content');
    
    let mockResponse = {};
    let statusCode = 200;
    
    try {
        switch (endpoint) {
            case 'users':
                mockResponse = {
                    status: 200,
                    data: [
                        {id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28},
                        {id: 2, name: "Bob Smith", email: "bob@example.com", age: 32},
                        {id: 3, name: "Charlie Brown", email: "charlie@example.com", age: 25}
                    ],
                    pagination: {
                        page: 0,
                        size: 10,
                        totalElements: 3,
                        totalPages: 1
                    }
                };
                break;
                
            case 'user-create':
                const userData = JSON.parse(jsonInput);
                // Simulate validation
                if (!userData.name || !userData.email) {
                    statusCode = 400;
                    mockResponse = {
                        status: 400,
                        error: "Bad Request",
                        message: "Name and email are required",
                        timestamp: new Date().toISOString()
                    };
                } else {
                    statusCode = 201;
                    mockResponse = {
                        status: 201,
                        data: {
                            id: Math.floor(Math.random() * 1000),
                            ...userData,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        }
                    };
                }
                break;
                
            case 'user-update':
                const updateData = JSON.parse(jsonInput);
                mockResponse = {
                    status: 200,
                    data: {
                        id: 123,
                        ...updateData,
                        updatedAt: new Date().toISOString()
                    }
                };
                break;
                
            case 'user-delete':
                mockResponse = {
                    status: 204,
                    message: "User deleted successfully"
                };
                break;
        }
        
        // Add response headers simulation
        const fullResponse = {
            status: statusCode,
            headers: {
                "Content-Type": "application/json",
                "X-Response-Time": `${Math.floor(Math.random() * 100 + 50)}ms`,
                "X-Request-ID": `req-${Math.random().toString(36).substr(2, 9)}`
            },
            body: mockResponse
        };
        
        responseContent.textContent = JSON.stringify(fullResponse, null, 2);
        response.classList.remove('hidden');
        
    } catch (error) {
        responseContent.textContent = JSON.stringify({
            status: 400,
            error: "Invalid JSON",
            message: error.message
        }, null, 2);
        response.classList.remove('hidden');
    }
}

function runAlgorithm() {
    const arrayInput = document.getElementById('array-input').value;
    const algorithm = document.getElementById('sort-algorithm').value;
    const results = document.getElementById('algorithm-results');
    
    try {
        const originalArray = arrayInput.split(',').map(n => parseInt(n.trim()));
        const arrayToSort = [...originalArray];
        
        const startTime = performance.now();
        let sortedArray;
        let timeComplexity;
        
        switch (algorithm) {
            case 'quicksort':
                sortedArray = quickSort(arrayToSort);
                timeComplexity = "O(n log n) average, O(n²) worst";
                break;
            case 'mergesort':
                sortedArray = mergeSort(arrayToSort);
                timeComplexity = "O(n log n)";
                break;
            case 'heapsort':
                sortedArray = heapSort(arrayToSort);
                timeComplexity = "O(n log n)";
                break;
        }
        
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(3);
        
        document.getElementById('original-array').textContent = originalArray.join(', ');
        document.getElementById('sorted-array').textContent = sortedArray.join(', ');
        document.getElementById('time-complexity').textContent = timeComplexity;
        document.getElementById('execution-time').textContent = executionTime;
        
        results.classList.remove('hidden');
        
    } catch (error) {
        alert('Error: Please enter valid numbers separated by commas.');
    }
}

// Sorting algorithm implementations
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// DevOps & SRE Functions
function startMonitoring() {
    if (monitoringInterval) return;
    
    // Initialize response time chart
    const ctx = document.getElementById('response-time-chart').getContext('2d');
    responseTimeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Response Time (ms)',
                data: [],
                borderColor: 'rgba(34, 197, 94, 1)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1000
                }
            },
            animation: {
                duration: 0
            }
        }
    });
    
    monitoringInterval = setInterval(() => {
        // Generate random metrics
        const cpu = Math.floor(Math.random() * 100);
        const memory = Math.floor(Math.random() * 100);
        const responseTime = Math.floor(Math.random() * 800 + 100);
        
        // Update CPU and Memory bars
        document.getElementById('cpu-bar').style.width = cpu + '%';
        document.getElementById('cpu-value').textContent = cpu + '%';
        document.getElementById('memory-bar').style.width = memory + '%';
        document.getElementById('memory-value').textContent = memory + '%';
        
        // Update response time chart
        const now = new Date().toLocaleTimeString();
        responseTimeChart.data.labels.push(now);
        responseTimeChart.data.datasets[0].data.push(responseTime);
        
        // Keep only last 10 data points
        if (responseTimeChart.data.labels.length > 10) {
            responseTimeChart.data.labels.shift();
            responseTimeChart.data.datasets[0].data.shift();
        }
        
        responseTimeChart.update();
        
        // Change colors based on thresholds
        const cpuBar = document.getElementById('cpu-bar');
        const memoryBar = document.getElementById('memory-bar');
        
        cpuBar.className = cpu > 80 ? 'bg-red-600 h-2 rounded-full transition-all duration-1000' : 
                          cpu > 60 ? 'bg-yellow-600 h-2 rounded-full transition-all duration-1000' : 
                          'bg-blue-600 h-2 rounded-full transition-all duration-1000';
        
        memoryBar.className = memory > 80 ? 'bg-red-600 h-2 rounded-full transition-all duration-1000' : 
                             memory > 60 ? 'bg-yellow-600 h-2 rounded-full transition-all duration-1000' : 
                             'bg-green-600 h-2 rounded-full transition-all duration-1000';
        
    }, 2000);
}

function stopMonitoring() {
    if (monitoringInterval) {
        clearInterval(monitoringInterval);
        monitoringInterval = null;
    }
    if (responseTimeChart) {
        responseTimeChart.destroy();
        responseTimeChart = null;
    }
}

function analyzeLogs() {
    const logInput = document.getElementById('log-input').value;
    const analysis = document.getElementById('log-analysis');
    
    if (!logInput.trim()) {
        alert('Please enter some log entries to analyze.');
        return;
    }
    
    const lines = logInput.trim().split('\n');
    let infoCount = 0, warnCount = 0, errorCount = 0;
    const patterns = {};
    
    lines.forEach(line => {
        // Count log levels
        if (line.includes('INFO')) infoCount++;
        else if (line.includes('WARN')) warnCount++;
        else if (line.includes('ERROR')) errorCount++;
        
        // Extract patterns (service names in brackets)
        const serviceMatch = line.match(/\[([^\]]+)\]/);
        if (serviceMatch) {
            const service = serviceMatch[1];
            patterns[service] = (patterns[service] || 0) + 1;
        }
    });
    
    // Update counts
    document.getElementById('info-count').textContent = infoCount;
    document.getElementById('warn-count').textContent = warnCount;
    document.getElementById('error-count').textContent = errorCount;
    
    // Show patterns
    const patternsDiv = document.getElementById('log-patterns');
    let patternsHtml = '<strong>Service Activity:</strong><br>';
    Object.entries(patterns).forEach(([service, count]) => {
        patternsHtml += `• ${service}: ${count} entries<br>`;
    });
    
    // Add some insights
    patternsHtml += '<br><strong>Insights:</strong><br>';
    if (errorCount > 0) {
        patternsHtml += `• ⚠️ Found ${errorCount} error(s) - requires attention<br>`;
    }
    if (warnCount > 0) {
        patternsHtml += `• ⚡ Found ${warnCount} warning(s) - monitor closely<br>`;
    }
    if (errorCount === 0 && warnCount === 0) {
        patternsHtml += '• ✅ No errors or warnings detected<br>';
    }
    
    patternsDiv.innerHTML = patternsHtml;
    analysis.classList.remove('hidden');
}

// Cloud & AWS Functions
function addService(serviceType) {
    const canvas = document.getElementById('architecture-canvas');
    const serviceId = `service-${Date.now()}`;
    
    const serviceConfig = {
        ec2: { name: 'EC2', icon: 'fas fa-server', color: 'bg-blue-100 border-blue-300', cost: 50 },
        rds: { name: 'RDS', icon: 'fas fa-database', color: 'bg-green-100 border-green-300', cost: 80 },
        s3: { name: 'S3', icon: 'fas fa-cloud', color: 'bg-orange-100 border-orange-300', cost: 20 },
        lambda: { name: 'Lambda', icon: 'fas fa-bolt', color: 'bg-purple-100 border-purple-300', cost: 10 },
        cloudfront: { name: 'CloudFront', icon: 'fas fa-globe', color: 'bg-red-100 border-red-300', cost: 30 }
    };
    
    const config = serviceConfig[serviceType];
    const x = Math.random() * (canvas.offsetWidth - 100);
    const y = Math.random() * (canvas.offsetHeight - 60);
    
    const serviceElement = document.createElement('div');
    serviceElement.id = serviceId;
    serviceElement.className = `absolute w-20 h-12 ${config.color} border-2 rounded-lg flex items-center justify-center cursor-move text-xs font-semibold`;
    serviceElement.style.left = x + 'px';
    serviceElement.style.top = y + 'px';
    serviceElement.innerHTML = `<i class="${config.icon} mr-1"></i>${config.name}`;
    
    // Make draggable
    makeDraggable(serviceElement);
    
    // Add double-click to remove
    serviceElement.addEventListener('dblclick', function() {
        this.remove();
        architectureServices = architectureServices.filter(s => s.id !== serviceId);
    });
    
    canvas.appendChild(serviceElement);
    
    // Store service info
    architectureServices.push({
        id: serviceId,
        type: serviceType,
        name: config.name,
        cost: config.cost
    });
    
    // Clear placeholder text
    const placeholder = canvas.querySelector('.text-center');
    if (placeholder) placeholder.remove();
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function clearArchitecture() {
    const canvas = document.getElementById('architecture-canvas');
    canvas.innerHTML = '<div class="text-center text-gray-500 mt-20">Click services on the left to add them to your architecture</div>';
    architectureServices = [];
    
    // Hide outputs
    document.getElementById('terraform-output').classList.add('hidden');
    document.getElementById('cost-estimate').classList.add('hidden');
}

function generateTerraform() {
    if (architectureServices.length === 0) {
        alert('Please add some services to your architecture first.');
        return;
    }
    
    let terraformCode = `# Generated Terraform Configuration
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

`;
    
    architectureServices.forEach((service, index) => {
        switch (service.type) {
            case 'ec2':
                terraformCode += `
resource "aws_instance" "web_server_${index}" {
  ami           = "ami-0c02fb55956c7d316"
  instance_type = "t3.micro"
  
  tags = {
    Name = "WebServer-${index}"
  }
}
`;
                break;
                
            case 'rds':
                terraformCode += `
resource "aws_db_instance" "database_${index}" {
  identifier     = "mydb-${index}"
  engine         = "mysql"
  engine_version = "8.0"
  instance_class = "db.t3.micro"
  allocated_storage = 20
  
  db_name  = "myapp"
  username = "admin"
  password = "changeme123!"
  
  skip_final_snapshot = true
  
  tags = {
    Name = "Database-${index}"
  }
}
`;
                break;
                
            case 's3':
                terraformCode += `
resource "aws_s3_bucket" "storage_${index}" {
  bucket = "my-app-storage-${index}-\${random_string.bucket_suffix.result}"
  
  tags = {
    Name = "Storage-${index}"
  }
}

resource "aws_s3_bucket_versioning" "storage_versioning_${index}" {
  bucket = aws_s3_bucket.storage_${index}.id
  versioning_configuration {
    status = "Enabled"
  }
}
`;
                break;
                
            case 'lambda':
                terraformCode += `
resource "aws_lambda_function" "processor_${index}" {
  filename         = "lambda_function.zip"
  function_name    = "data-processor-${index}"
  role            = aws_iam_role.lambda_role.arn
  handler         = "index.handler"
  runtime         = "python3.9"
  
  tags = {
    Name = "Processor-${index}"
  }
}
`;
                break;
                
            case 'cloudfront':
                terraformCode += `
resource "aws_cloudfront_distribution" "cdn_${index}" {
  origin {
    domain_name = aws_s3_bucket.storage_${index}.bucket_regional_domain_name
    origin_id   = "S3-\${aws_s3_bucket.storage_${index}.id}"
  }
  
  enabled = true
  
  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-\${aws_s3_bucket.storage_${index}.id}"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    cloudfront_default_certificate = true
  }
  
  tags = {
    Name = "CDN-${index}"
  }
}
`;
                break;
        }
    });
    
    // Add common resources
    terraformCode += `
resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda_execution_role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}
`;
    
    document.getElementById('terraform-code').textContent = terraformCode;
    document.getElementById('terraform-output').classList.remove('hidden');
}

function calculateCost() {
    if (architectureServices.length === 0) {
        alert('Please add some services to your architecture first.');
        return;
    }
    
    let totalCost = 0;
    let breakdown = '<strong>Monthly Cost Breakdown:</strong><br><br>';
    
    const serviceCounts = {};
    architectureServices.forEach(service => {
        serviceCounts[service.type] = (serviceCounts[service.type] || 0) + 1;
        totalCost += service.cost;
    });
    
    Object.entries(serviceCounts).forEach(([type, count]) => {
        const config = {
            ec2: { name: 'EC2 Instances', unitCost: 50 },
            rds: { name: 'RDS Databases', unitCost: 80 },
            s3: { name: 'S3 Buckets', unitCost: 20 },
            lambda: { name: 'Lambda Functions', unitCost: 10 },
            cloudfront: { name: 'CloudFront Distributions', unitCost: 30 }
        };
        
        const serviceConfig = config[type];
        const serviceCost = count * serviceConfig.unitCost;
        breakdown += `• ${serviceConfig.name}: ${count} × $${serviceConfig.unitCost} = $${serviceCost}<br>`;
    });
    
    breakdown += `<br><strong>Total Monthly Cost: $${totalCost}</strong><br>`;
    breakdown += `<small class="text-gray-600">*Estimates based on basic configurations. Actual costs may vary.</small>`;
    
    document.getElementById('cost-breakdown').innerHTML = breakdown;
    document.getElementById('cost-estimate').classList.remove('hidden');
}