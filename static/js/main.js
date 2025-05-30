// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const parent = link.parentElement;
        // Only close the nav if it's NOT a dropdown
        if (!parent.classList.contains('dropdown')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

    
    // Accordion functionality for dictionary
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle current item
            accordionContent.classList.toggle('show');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
            
            // Close other open items
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherContent = otherHeader.nextElementSibling;
                    const otherIcon = otherHeader.querySelector('i');
                    otherContent.classList.remove('show');
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            });
        });
    });
    
    // Mobile dropdown menu
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const menu = dropdown.querySelector('.dropdown-menu');
            menu.classList.toggle('show');
        });
    });
    
    // Dictionary search functionality
    const searchInput = document.getElementById('dictionary-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const wordCards = document.querySelectorAll('.word-card');
            
            wordCards.forEach(card => {
                const zuluWord = card.querySelector('.zulu-word').textContent.toLowerCase();
                const englishWord = card.querySelector('.english-meaning').textContent.toLowerCase();
                
                if (zuluWord.includes(searchTerm) || englishWord.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Flash message auto-close
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
});