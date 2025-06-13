
document.addEventListener('DOMContentLoaded', function() {
    // Data from your dataset - sorted chronologically
    const labels = [
        'Apr-2021', 'May-2021', 'Jun-2021', 'Jul-2021', 'Aug-2021', 'Sep-2021', 'Oct-2021', 'Nov-2021', 'Dec-2021',
        'Jan-2022', 'Feb-2022', 'Mar-2022', 'Apr-2022', 'May-2022', 'Jun-2022', 'Jul-2022', 'Aug-2022', 'Sep-2022',
        'Oct-2022', 'Nov-2022', 'Dec-2022', 'Jan-2023', 'Feb-2023', 'Mar-2023', 'Apr-2023', 'May-2023', 'Jun-2023',
        'Jul-2023', 'Aug-2023', 'Sep-2023', 'Oct-2023', 'Nov-2023', 'Dec-2023', 'Jan-2024', 'Feb-2024', 'Mar-2024',
        'Apr-2024', 'May-2024', 'Jun-2024', 'Jul-2024', 'Aug-2024', 'Sep-2024', 'Oct-2024', 'Nov-2024', 'Dec-2024',
        'Feb-2025', 'Mar-2025'
    ];

    const systemAvailability = [
        99.23, 99.33, 99.065, 98.976, 99.24, 99.051, 99.274, 99.222, 99.322,
        99.081, 98.968, 99.104, 99.064, 99.371, 99.434, 99.271, 98.835, 99.048,
        99.331, 99.228, 99.315, 99.215, 99.313, 99.147, 99.551, 99.244, 99.63,
        99.645, 99.642, 99.612, 99.474, 99.253, 99.535, 99.45, 99.535, 99.417,
        99.242, 99.366, 99.25, 99.269, 99.121, 99.063, 99.283, 99.298, 99.06,
        98.492, 98.725
    ];

    const targetAvailability = [
        98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5,
        98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5,
        98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5,
        98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5,
        98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5, 98.5,
        98.5, 98.0  // Note: Mar-2025 has a target of 98%
    ];
    
    // Create the chart
    const ctx = document.getElementById('availabilityChart').getContext('2d');
    
    // Calculate the difference between actual and target
    const difference = systemAvailability.map((value, index) => {
        return value - targetAvailability[index];
    });
    
    // Use a consistent blue color for all system availability bars
    let barColors = Array(labels.length).fill('rgba(74, 107, 255, 0.7)');
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'System Availability',
                    data: systemAvailability,
                    backgroundColor: barColors,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderWidth: 1,
                    borderRadius: 5,
                    order: 2
                },
                {
                    label: 'Target Availability',
                    data: targetAvailability,
                    type: 'line',
                    fill: false,
                    borderColor: 'rgba(255, 193, 7, 1)',
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgba(255, 193, 7, 1)',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 6,
                    order: 1,
                    tension: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#2c3e50',
                        font: {
                            size: 14
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 15,
                    titleFont: {
                        size: 16,
                        color: 'white',
                        weight: 'normal'
                    },
                    bodyFont: {
                        size: 14,
                        color: 'rgba(255, 255, 255, 0.9)'
                    },
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 1,
                    boxPadding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(3) + '%';
                            }
                            return label;
                        },
                        afterLabel: function(context) {
                            if (context.datasetIndex === 0) {
                                const index = context.dataIndex;
                                const diff = difference[index];
                                const color = diff >= 0 ? '#00c853' : '#ff5252';
                                
                                return [
                                    `Performance: ${diff >= 0 ? '+' : ''}${diff.toFixed(3)}%`,
                    
                                ];
                            }
                            return null;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 98,
                    max: 100.0,
                    ticks: {
                        color: '#666',
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    title: {
                        display: true,
                        text: 'Availability Percentage',
                        color: '#555',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ticks: {
                        color: '#666',
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                            size: 11
                        },
                        autoSkip: false
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.03)'
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
    
    // Unified search functionality
    const searchModeToggle = document.getElementById('searchModeToggle');
    const monthSearchGroup = document.getElementById('monthSearchGroup');
    const rangeSearchGroup = document.getElementById('rangeSearchGroup');
    const endDateGroup = document.getElementById('endDateGroup');
    const searchInput = document.getElementById('searchInput');
    const startDateInput = document.getElementById('startDateInput');
    const endDateInput = document.getElementById('endDateInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    // Set default mode to single month search
    let searchMode = 'month';
    
    // Toggle search mode
    searchModeToggle.addEventListener('click', function(e) {
        if (e.target.classList.contains('mode-btn')) {
            // Update active button
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Update search mode
            searchMode = e.target.dataset.mode;
            
            // Toggle input visibility
            if (searchMode === 'month') {
                monthSearchGroup.style.display = 'flex';
                rangeSearchGroup.style.display = 'none';
                endDateGroup.style.display = 'none';
            } else {
                monthSearchGroup.style.display = 'none';
                rangeSearchGroup.style.display = 'flex';
                endDateGroup.style.display = 'flex';
            }
        }
    });
    
    // Function to find index of a month
    function findMonthIndex(monthStr) {
        return labels.findIndex(label => 
            label.toLowerCase() === monthStr.toLowerCase()
        );
    }
    
    // Unified search function
    function handleSearch() {
        if (searchMode === 'month') {
            const searchTerm = searchInput.value.trim();
            if (!searchTerm) {
                showError("Please enter a month to search");
                return;
            }
            searchMonth(searchTerm);
        } else {
            const startTerm = startDateInput.value.trim();
            const endTerm = endDateInput.value.trim();
            
            if (!startTerm || !endTerm) {
                showError("Please enter both start and end dates");
                return;
            }
            
            searchDateRange(startTerm, endTerm);
        }
    }
    
    function showError(message) {
        searchResults.innerHTML = `
            <div class="result-card">
                <div class="result-header">
                    <span><i class="fas fa-exclamation-triangle"></i> Search Error</span>
                </div>
                <p>${message}</p>
            </div>
        `;
        searchResults.classList.add('active');
    }
    
    function searchMonth(monthStr) {
        // Find the index of the searched month
        const index = findMonthIndex(monthStr);
        
        if (index === -1) {
            // Month not found
            showError(`No data found for "${monthStr}". Try using the format "Mar-2025".`);
            return;
        }
        
        // Highlight the month in the chart
        barColors = labels.map((_, i) => 
            i === index ? 'rgba(255, 87, 34, 0.9)' : 'rgba(74, 107, 255, 0.7)'
        );
        
        chart.data.datasets[0].backgroundColor = barColors;
        chart.update();
        
        // Show search results
        const month = labels[index];
        const system = systemAvailability[index];
        const target = targetAvailability[index];
        const diff = (system - target).toFixed(3);
        const status = diff >= 0 ? 'Above Target' : 'Below Target';
        const statusColor = diff >= 0 ? '#00c853' : '#ff5252';
        
        searchResults.innerHTML = `
            <div class="result-card">
                <div class="result-header">
                    <span><i class="fas fa-calendar-alt"></i> ${month}</span>
                    <span style="color: ${statusColor}">${status}</span>
                </div>
                <div class="result-values">
                    <div class="result-item">
                        <div>System Availability</div>
                        <div class="result-value">${system}%</div>
                    </div>
                    <div class="result-item">
                        <div>Target Availability</div>
                        <div class="result-value">${target}%</div>
                    </div>
                    <div class="result-item">
                        <div>Performance Difference</div>
                        <div class="result-value" style="color: ${statusColor}">${diff >= 0 ? '+' : ''}${diff}%</div>
                    </div>
                    <div class="result-item">
                        <div>Status</div>
                        <div class="result-value" style="color: ${statusColor}">${status}</div>
                    </div>
                </div>
            </div>
        `;
        searchResults.classList.add('active');
        
        // Scroll to results
        searchResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    function searchDateRange(startTerm, endTerm) {
        // Find indices
        const startIndex = findMonthIndex(startTerm);
        const endIndex = findMonthIndex(endTerm);
        
        if (startIndex === -1 || endIndex === -1) {
            const missing = startIndex === -1 ? startTerm : endTerm;
            showError(`No data found for "${missing}". Try using the format "Aug-2024".`);
            return;
        }
        
        if (startIndex > endIndex) {
            showError("The start date must come before the end date.");
            return;
        }
        
        // Highlight the date range in the chart
        barColors = labels.map((_, i) => 
            (i >= startIndex && i <= endIndex) ? 'rgba(76, 175, 80, 0.7)' : 'rgba(74, 107, 255, 0.7)'
        );
        
        chart.data.datasets[0].backgroundColor = barColors;
        chart.update();
        
        // Calculate range statistics
        const rangeMonths = labels.slice(startIndex, endIndex + 1);
        const rangeSystem = systemAvailability.slice(startIndex, endIndex + 1);
        const rangeTarget = targetAvailability.slice(startIndex, endIndex + 1);
        
        const avgSystem = (rangeSystem.reduce((a, b) => a + b, 0) / rangeSystem.length).toFixed(3);
        const avgTarget = (rangeTarget.reduce((a, b) => a + b, 0) / rangeTarget.length).toFixed(3);
        const avgDiff = (avgSystem - avgTarget).toFixed(3);
        const monthsCount = rangeMonths.length;
        
        // Show search results
        searchResults.innerHTML = `
            <div class="result-card">
                <div class="result-header">
                    <span><i class="fas fa-calendar-alt"></i> Date Range: ${startTerm} to ${endTerm}</span>
                    <span>${monthsCount} months</span>
                </div>
                <div class="result-values">
                    <div class="result-item">
                        <div>Avg. System Availability</div>
                        <div class="result-value">${avgSystem}%</div>
                    </div>
                    <div class="result-item">
                        <div>Avg. Target Availability</div>
                        <div class="result-value">${avgTarget}%</div>
                    </div>
                    <div class="result-item">
                        <div>Avg. Performance Difference</div>
                        <div class="result-value" style="color: ${avgDiff >= 0 ? '#00c853' : '#ff5252'}">
                            ${avgDiff >= 0 ? '+' : ''}${avgDiff}%
                        </div>
                    </div>
                </div>
                <div class="range-stats">
                    <div class="stat-item">
                        <div class="stat-value">${Math.min(...rangeSystem).toFixed(3)}%</div>
                        <div class="stat-label">Lowest</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${Math.max(...rangeSystem).toFixed(3)}%</div>
                        <div class="stat-label">Highest</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${rangeSystem.filter(val => val >= 99.5).length}</div>
                        <div class="stat-label">Months ≥99.5%</div>
                    </div>
                </div>
            </div>
        `;
        searchResults.classList.add('active');
        
        // Scroll to results
        searchResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Event listeners
    searchButton.addEventListener('click', handleSearch);
    
    // Allow Enter key to trigger search in any input
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
    
    startDateInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
    
    endDateInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
});
