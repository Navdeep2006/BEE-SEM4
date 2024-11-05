window.onload = function() {
    gsap.to("span",{
        color:"#12c36d",
        duration:0.5,
        delay:1,
    });
    gsap.from("#intro-h1", {
        y:100, 
        duration: 2,      
        ease: "power3.out",    
        opacity: 0        
    });
    gsap.from(".intro-btn",{
        y:100,
        duration:3,
        ease:"power3.out",
    })
    gsap.from(".l", {
        x: -200,
        opacity: 0,
        duration: 2,
        ease: "power3.out", 
        scrollTrigger: {
            trigger: "#index-ctn1",
            start: "top 80%", 
            toggleActions: "play none none none", 
        }
    });
    gsap.from(".r", {
        x: 200,
        opacity: 0, 
        duration: 1.5, 
        ease: "power3.out", 
        scrollTrigger: {
            trigger: "#index-ctn1",
            start: "top 80%", 
            toggleActions: "play none none none", 
        }
    });


    gsap.from("#index-ctn-about-left",{
        x: -200, 
        opacity: 0, 
        duration: 1.5, 
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#index-about", 
            start: "top 80%",
            toggleActions: "play none none none", 
        }
    })
    gsap.from(".index-ctn-about-right-item",{
        x: 200,
        opacity: 0, 
        duration: 1.5,
        ease: "power3.out", 
        stagger:0.5,
        scrollTrigger: {
            trigger: "#index-about", 
            start: "top 80%", 
            toggleActions: "play none none none", 
        }
    })

};

gsap.from(".contact-info .contact-item", {
    scrollTrigger: {
        trigger: ".contact-container",
        start: "top 80%",  
        end: "bottom 60%"  ,
        scrub: true,

    },
    x: -200,             
    opacity: 0,          
    duration: 1.5,        
    ease: "power3.out",  
    stagger: 0.2,             
});


gsap.from(".contact-form input, .contact-form textarea, .contact-form button", {
    scrollTrigger: {
        trigger: ".contact-container",
        start: "top 80%",  
        end: "bottom 60%",
        scrub: true, 
    },
    x: 200,               
    opacity: 0,
    duration: 1.5,        
    ease: "power3.out",   
    stagger: 0.2          
});


gsap.from("#index-appointment-ctn-img", {
    x: -300,
    opacity: 0,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#index-appointment",
        start: "top center",
        end: "bottom center", 
        scrub: true, 
    }
});


gsap.from("#index-appointment-ctn-head", {
    x: 300,
    opacity: 0,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#index-appointment",
        start: "top center",
        end: "bottom center",
        scrub: true,
    },
});



// customer reviews


let currentIndex = 0;

function nextSlide() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    currentIndex = (currentIndex + 1) % slides.length;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function prevSlide() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}







// ----------------login form---------------






