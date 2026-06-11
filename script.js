document.addEventListener('DOMContentLoaded', () => {
    // Top bar date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        dateElement.textContent = `${dd}/${mm}/${yyyy}`;
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Modal Logic
    const modal = document.getElementById("upsell-modal");
    const closeBtn = document.querySelector(".close-btn");
    let modalShown = false;

    const showModal = () => {
        if (!modalShown) {
            modal.style.display = "flex";
            modalShown = true;
        }
    };

    const closeModal = () => {
        modal.style.display = "none";
    };

    // Close on X click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on outside click
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Show modal on exit intent (mouse leaves viewport)
    document.addEventListener("mouseleave", (e) => {
        if (e.clientY < 0) {
            showModal();
        }
    });

    // Show modal after 30 seconds as fallback
    setTimeout(showModal, 30000);

    // Countdown Timer Logic
    let totalSeconds = (1 * 3600) + (35 * 60) + 22; // 1h 35m 22s
    
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");

    function updateTimer() {
        if (totalSeconds <= 0) {
            // Optional: reset timer or keep at zero
            totalSeconds = 0;
            return;
        }
        
        totalSeconds--;
        
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        
        hoursSpan.textContent = h.toString().padStart(2, '0');
        minutesSpan.textContent = m.toString().padStart(2, '0');
        secondsSpan.textContent = s.toString().padStart(2, '0');
    }
    
    if (hoursSpan && minutesSpan && secondsSpan) {
        // Inicializar com os valores antes do primeiro intervalo
        hoursSpan.textContent = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        minutesSpan.textContent = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        secondsSpan.textContent = (totalSeconds % 60).toString().padStart(2, '0');
        setInterval(updateTimer, 1000);
    }

    // Purchase Notifications Logic
    const notifications = [
        { name: "Maria S.", item: "Plano Premium", location: "São Paulo, SP" },
        { name: "João P.", item: "Plano Premium", location: "Rio de Janeiro, RJ" },
        { name: "Ana C.", item: "Plano Básico", location: "Belo Horizonte, MG" },
        { name: "Carlos F.", item: "Plano Premium", location: "Curitiba, PR" },
        { name: "Juliana M.", item: "Plano Premium", location: "Salvador, BA" }
    ];

    function createNotification() {
        const container = document.getElementById('notification-container');
        if(!container) return;
        
        const notif = notifications[Math.floor(Math.random() * notifications.length)];
        const time = Math.floor(Math.random() * 15) + 1; // 1 a 15 minutos
        
        const el = document.createElement('div');
        el.className = 'purchase-notification';
        el.innerHTML = `
            <div class="notification-icon">✓</div>
            <div class="notification-content">
                <p><strong>${notif.name}</strong></p>
                <p class="item">Comprou: ${notif.item}</p>
                <p class="time">${notif.location} - há ${time} minutos</p>
            </div>
        `;
        
        container.appendChild(el);
        
        // Animate in
        setTimeout(() => {
            el.classList.add('show');
        }, 100);
        
        // Animate out
        setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => {
                el.remove();
            }, 500);
        }, 5000); // Exibe por 5 segundos
    }

    // Inicia notificações após 3 segundos, e repete a cada 10 a 20 segundos
    setTimeout(() => {
        createNotification();
        setInterval(() => {
            createNotification();
        }, Math.floor(Math.random() * 10000) + 10000);
    }, 3000);
});
